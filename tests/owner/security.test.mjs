import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { ownerStatus } from '../../lib/owner-policy.ts'

const require = createRequire(import.meta.url)
function moduleAt(file, mocks) {
  const source = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => name in mocks ? mocks[name] : require(name), module, module.exports)
  return module.exports
}
const now = Date.now()
const session = { valid: true, googleSub: 'test-owner', ownerExpiresAt: now + 60000, expires: new Date(now + 60000).toISOString() }
test('owner policy denies missing, invalid, expired, wrong-sub, and missing configuration; rebind revokes old owner', () => {
  assert.equal(ownerStatus(null, 'test-owner', now), 401)
  for (const patch of [{expires:'invalid'},{expires:new Date(now-1).toISOString()},{ownerExpiresAt:now-1}]) assert.equal(ownerStatus({...session,...patch}, 'test-owner', now),401)
  assert.equal(ownerStatus({...session,valid:false},'test-owner',now),403)
  assert.equal(ownerStatus(session,'other-owner',now),403)
  assert.equal(ownerStatus(session,'',now),403)
  assert.equal(ownerStatus(session,'test-owner',now),200)
})
test('Google callbacks bind only verified Google sub and ignore session update payload; no OAuth tokens retained', async () => {
  process.env.OWNER_GOOGLE_SUB='test-owner'
  let config
  moduleAt('auth.ts', {'next-auth': {default:(c)=>{config=c;return {}}}, 'next-auth/providers/google':{default:c=>c}, '@/lib/owner-policy':{ownerStatus,SESSION_SECONDS:28800}, '@/lib/owner-audit':{audit(){}}})
  for (const account of [{provider:'google'},{provider:'other'}]) for (const profile of [{sub:'test-owner',email_verified:true},{sub:'wrong',email_verified:true},{sub:'test-owner',email_verified:false},{}]) {
    assert.equal(config.callbacks.signIn({account,profile}),(account.provider==='google'&&profile.sub==='test-owner'&&profile.email_verified===true) || '/access-denied')
  }
  const token = await config.callbacks.jwt({token:{},account:{provider:'google',access_token:'MUST_NOT_PERSIST',refresh_token:'MUST_NOT_PERSIST'},profile:{sub:'test-owner',email_verified:true}})
  assert.deepEqual(Object.keys(token).sort(),['googleSub','ownerExpiresAt'])
  assert.equal((await config.callbacks.jwt({token,trigger:'update',session:{googleSub:'attacker'}})).googleSub,'test-owner')
  assert.equal(await config.callbacks.jwt({token:{...token,ownerExpiresAt:now-1}}),null)
  assert.equal(config.session.maxAge,28800)
  assert.equal(config.cookies.sessionToken.options.httpOnly,true)
  assert.equal(config.cookies.sessionToken.options.sameSite,'lax')
  assert.equal(config.providers[0].authorization.params.scope,'openid email profile')
  assert.deepEqual(config.providers[0].checks,['pkce','state','nonce'])
})
test('private API guards deny independently of proxy, before reading data/artifact or making writes', async () => {
  for (const status of [401,403]) for (const [file,method] of [['app/api/cockpit/telemetry/route.ts','GET'],['app/api/cockpit/artifacts/[id]/route.ts','GET'],['app/api/cockpit/[...path]/route.ts','POST'],['app/api/internal/telemetry/operator/route.ts','POST'],['app/api/internal/telemetry/oidc-proof/route.ts','POST']]) {
    const unexpected=()=>{throw Error('private side effect before authorization')}
    const route=moduleAt(file, {'@/lib/owner-access':{ownerApiDenial:async()=>new Response('denied',{status}),sameOrigin:unexpected},'@/lib/cockpit/operations':{operations:unexpected},'@/lib/cockpit/store':{privateArtifact:unexpected},'@/lib/owner-audit':{audit:unexpected},'@vercel/blob':{get:unexpected,put:unexpected}})
    const response=await route[method](new Request('http://localhost/private'),{params:Promise.resolve({id:'unknown'})})
    assert.equal(response.status,status)
  }
})
test('operational source schema rejects unknown raw payload fields, broken joins and inconsistent costs', () => {
  const {operationsSchema}=moduleAt('lib/cockpit/operations.ts',{'server-only':{},'@/lib/owner-access':{requireOwner(){throw Error('unexpected')}}})
  const base={schemaVersion:1,generatedAt:new Date().toISOString(),source:'test-fixture',coverage:'synthetic test only',sanitized:true,runs:[],receipts:[],workstreams:[],deployments:[]}
  assert.equal(operationsSchema.safeParse(base).success,true)
  for(const addition of [{rawPrompt:'private'},{oauthToken:'private'},{sanitized:false}]) assert.equal(operationsSchema.safeParse({...base,...addition}).success,false)
  const run={id:'test-run',timestamp:base.generatedAt,workstream:'missing',capability:'test',role:null,provider:null,model:null,durationMs:null,outcome:'unknown',validation:'unknown',fallback:null,escalation:null,costUsd:null,costBasis:'unavailable',tokens:null,receiptIds:[],route:{candidate:null,selected:null,rationaleCategory:null,fallbackRoute:null},checks:[],recovery:null}
  assert.equal(operationsSchema.safeParse({...base,runs:[run]}).success,false)
  const workstream={id:'missing',title:'test',status:'unknown',gate:null,owner:null,nextAction:null,blocker:null,evidenceState:'unknown',ownerDecision:null}
  assert.equal(operationsSchema.safeParse({...base,workstreams:[workstream],runs:[run]}).success,true)
  assert.equal(operationsSchema.safeParse({...base,workstreams:[workstream],runs:[{...run,costBasis:'actual',costUsd:null}]}).success,false)
  assert.equal(operationsSchema.safeParse({...base,workstreams:[workstream],runs:[{...run,costBasis:'unavailable',costUsd:0.1}]}).success,false)
  assert.equal(operationsSchema.safeParse({...base,workstreams:[workstream],runs:[run,run]}).success,false)

})

test('hosted private archive validates pinned digest and entry integrity; auth runs before storage', async () => {
  const id='a'.repeat(24), bytes=Buffer.from('synthetic private fixture')
  const entry={id,title:'fixture.txt',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,kind:'source',mediaType:'text/plain'}
  const payload=Buffer.from(JSON.stringify({version:1,manifest:{version:1,sourceCommit:'0'.repeat(40),entries:[entry]},contents:{[id]:bytes.toString('base64')}}))
  process.env.COCKPIT_PRIVATE_ARCHIVE='owner-cockpit/'+'a'.repeat(64)+'.json'
  process.env.COCKPIT_PRIVATE_ARCHIVE_SHA256=createHash('sha256').update(payload).digest('hex')
  let reads=0
  const blob={get:async()=>{reads++;return {statusCode:200,stream:new Response(payload).body}}}
  const mocks={'server-only':{},'react':{cache:fn=>fn},'@vercel/blob':blob,'@/lib/owner-access':{requireOwner:async()=>true}}
  try {
    const store=moduleAt('lib/cockpit/store.ts',mocks)
    assert.equal((await store.privateIndex()).entries.length,1)
    assert.equal((await store.privateArtifact(id)).bytes.toString(),bytes.toString())
    process.env.COCKPIT_PRIVATE_ARCHIVE_SHA256='0'.repeat(64)
    assert.equal(await store.privateIndex(),null)
    const before=reads
    const denied=moduleAt('lib/cockpit/store.ts',{...mocks,'@/lib/owner-access':{requireOwner:async()=>{throw Error('denied')}}})
    await assert.rejects(()=>denied.privateIndex(),/denied/);assert.equal(reads,before)
  } finally {delete process.env.COCKPIT_PRIVATE_ARCHIVE;delete process.env.COCKPIT_PRIVATE_ARCHIVE_SHA256}
})
