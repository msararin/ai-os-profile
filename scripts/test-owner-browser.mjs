import { spawn } from 'node:child_process'
import { randomBytes, createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import assert from 'node:assert/strict'
import { encode } from 'next-auth/jwt'
import { chromium } from '@playwright/test'

// Test process owns the signing secret. No test-login route or auth bypass is deployed.
const secret=randomBytes(48).toString('hex'), owner='fixture-owner-sub', salt='__Secure-authjs.session-token'
const base='http://localhost:3291', output=path.resolve(process.env.OWNER_TEST_OUTPUT || '../sararin-cockpit-review/browser')
mkdirSync(output,{recursive:true})
const store=mkdtempSync(path.join(tmpdir(),'owner-boundary-test-')), artifactId='a'.repeat(24), bytes=Buffer.from('OWNER-PRIVATE-CANARY-9261')
writeFileSync(path.join(store,artifactId),bytes)
writeFileSync(path.join(store,'manifest.json'),JSON.stringify({version:1,sourceCommit:'0'.repeat(40),entries:[{id:artifactId,title:'Synthetic test artifact',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,kind:'source',mediaType:'text/plain'}]}))
const timestamp=new Date().toISOString()
const fixture={schemaVersion:1,generatedAt:timestamp,source:'SYNTHETIC TEST FIXTURE - not operational evidence',coverage:'Two fabricated QA runs only',sanitized:true,
workstreams:[{id:'qa-fixture',title:'Synthetic boundary verification',status:'running',gate:'Local QA only',owner:'Test fixture',nextAction:'Verify access isolation',blocker:null,evidenceState:'passed',ownerDecision:null}],
deployments:[],receipts:[{id:'receipt-1',claim:'Synthetic test receipt only',evidenceType:'test fixture',artifactId,producer:'test harness',verifier:'test assertions',timestamp,validationState:'passed',provenance:'generated fixture',custody:'temporary test directory',limitations:'No live operational or Google sign-in proof'}],
runs:[{id:'fixture-run-1',timestamp,workstream:'qa-fixture',capability:'Synthetic access test',role:'test runner',provider:'fixture-provider',model:'fixture-model',durationMs:125,outcome:'passed',validation:'passed',fallback:false,escalation:false,costUsd:0.012,costBasis:'estimated',tokens:120,receiptIds:['receipt-1'],route:{candidate:'fixture candidate',selected:'fixture selected',rationaleCategory:'test-only',fallbackRoute:null},checks:[{test:'Artifact integrity',expected:'matching checksum',observed:'matching checksum',status:'passed',verifier:'test harness',artifactId,failureCode:null,remediation:null}],recovery:null},
{id:'fixture-run-2',timestamp,workstream:'qa-fixture',capability:'Missing measurement test',role:null,provider:null,model:null,durationMs:null,outcome:'unknown',validation:'unknown',fallback:null,escalation:null,costUsd:null,costBasis:'unavailable',tokens:null,receiptIds:[],route:{candidate:null,selected:null,rationaleCategory:null,fallbackRoute:null},checks:[],recovery:null}]}
const operations=path.join(store,'operations.json');writeFileSync(operations,JSON.stringify(fixture))
const env={...process.env,NODE_ENV:'production',AUTH_SECRET:secret,AUTH_URL:base,AUTH_TRUST_HOST:'true',OWNER_GOOGLE_SUB:owner,GOOGLE_CLIENT_ID:'fixture-client',GOOGLE_CLIENT_SECRET:'fixture-client-secret',COCKPIT_PRIVATE_STORE_PATH:store,COCKPIT_OPERATIONS_PATH:operations}
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3291'],{env,stdio:['ignore','pipe','pipe']})
let logs='';server.stdout.on('data',x=>logs+=x);server.stderr.on('data',x=>logs+=x)
let browser
const results=[]
async function check(name,fn){ await fn();results.push({name,result:'PASS'});console.log('PASS',name) }
const cookie=async(sub=owner,expires=Date.now()+60000)=>`${salt}=${await encode({secret,salt,token:{googleSub:sub,ownerExpiresAt:expires},maxAge:3600})}`
const request=(route,init={})=>fetch(base+route,{redirect:'manual',...init})
try {
  let ready=false
  for(let i=0;i<100;i++){try{if((await request('/login')).status===200){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
  assert(ready,'test server started')
  const ownerCookie=await cookie(),wrongCookie=await cookie('wrong-sub'),expiredCookie=await cookie(owner,Date.now()-1000)
  const pages=['/cockpit','/cockpit/workstreams','/cockpit/telemetry','/cockpit/evidence','/cockpit/methodology','/cockpit/experiments','/cockpit/deployments','/cockpit/security','/cockpit/evidence/'+artifactId,'/cockpit/telemetry/runs/fixture-run-1','/internal/telemetry','/internal/telemetry/operator']
  await check('all private pages: anonymous redirect; wrong-sub 403; expired/invalid denied',async()=>{
    for(const route of pages){const response=await request(route);assert.equal(response.status,307,route);assert((response.headers.get('location')??'').endsWith('/login'));assert(!(await response.text()).includes('OWNER-PRIVATE-CANARY'))}
    for(const [value,status] of [[wrongCookie,403],[expiredCookie,307],[`${salt}=tampered`,307]]) assert.equal((await request('/cockpit',{headers:{cookie:value}})).status,status)
  })
  const apis=[['GET','/api/cockpit/telemetry'],['GET','/api/cockpit/artifacts/'+artifactId],['GET','/api/cockpit/search'],['POST','/api/internal/telemetry/operator'],['POST','/api/internal/telemetry/oidc-proof']]
  await check('every private API independently rejects anonymous, non-owner and expired sessions',async()=>{
    for(const [method,route] of apis)for(const [value,status] of [['',401],[wrongCookie,403],[expiredCookie,401]]){const response=await request(route,{method,headers:{cookie:value}});assert.equal(response.status,status,route);assert(response.headers.get('cache-control')?.includes('no-store'));assert(!JSON.stringify(await response.json()).includes('fixture'))}
  })
  await check('owner fixture can read telemetry and integrity-checked artifact; unknown IDs fail',async()=>{
    const response=await request('/api/cockpit/telemetry',{headers:{cookie:ownerCookie}});assert.equal(response.status,200);assert.equal((await response.json()).data.runs.length,2)
    const artifact=await request('/api/cockpit/artifacts/'+artifactId,{headers:{cookie:ownerCookie}});assert.equal(artifact.status,200);assert.equal(await artifact.text(),bytes.toString());assert(artifact.headers.get('content-disposition')?.startsWith('attachment'))
    assert.equal((await request('/api/cockpit/artifacts/'+'b'.repeat(24),{headers:{cookie:ownerCookie}})).status,404)
  })
  await check('private POST requires exact same-origin and auth before examining environment',async()=>{
    for(const [,route] of apis.filter(x=>x[0]==='POST')) assert.equal((await request(route,{method:'POST',headers:{cookie:ownerCookie,origin:'https://evil.vercel.app'}})).status,403)
  })
  await check('public routes, sitemap, old artifact URLs and TTS boundaries',async()=>{
    for(const route of ['/','/case-studies','/how-we-build','/achievements','/about','/contact','/case-studies/nbo-nrt-azure-databricks','/case-studies/txttoaudio']) {const response=await request(route);assert.equal(response.status,200,route);assert(!(await response.text()).includes('OWNER-PRIVATE-CANARY'))}
    const sitemap=await (await request('/sitemap.xml')).text();assert(!/cockpit|internal|org-roles|system-health/.test(sitemap))
    for(const route of ['/aios-phoenix-local-observability-spike-summary.html','/optimize-worker-phase-b-local-proof-telemetry-report-20260701.html','/evidence/exp3-notebook-acceptance-20260907.json']) assert.equal((await request(route)).status,404)
    assert.equal((await request('/api/tts/jobs')).status,401)
  })
  browser=await chromium.launch({headless:true,...(process.env.OWNER_TEST_BROWSER_CHANNEL ? {channel:process.env.OWNER_TEST_BROWSER_CHANNEL} : {})})
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[]
  page.on('pageerror',e=>errors.push(e.message))
  await page.goto(base+'/');await page.screenshot({path:path.join(output,'public-site.png'),fullPage:true})
  await page.goto(base+'/login');await page.screenshot({path:path.join(output,'login.png'),fullPage:true})
  async function browserCookie(value){await context.clearCookies();await context.addCookies([{name:salt,value:value.slice(salt.length+1),domain:'localhost',path:'/',httpOnly:true,secure:true,sameSite:'Lax'}])}
  await browserCookie(wrongCookie);await page.goto(base+'/cockpit');assert.equal(await page.title(),'Access denied');await page.screenshot({path:path.join(output,'unauthorized.png'),fullPage:true})
  await browserCookie(ownerCookie);await page.goto(base+'/cockpit');await page.getByRole('heading',{name:'Your operating picture'}).waitFor();await page.screenshot({path:path.join(output,'cockpit-home-fixture.png'),fullPage:true})
  await page.goto(base+'/cockpit/telemetry');await page.getByText('fixture-run-1',{exact:false}).first().waitFor();await page.screenshot({path:path.join(output,'telemetry-fixture.png'),fullPage:true})
  await page.goto(base+'/cockpit/telemetry/runs/fixture-run-1');await page.locator('summary').click();await page.screenshot({path:path.join(output,'run-evidence-fixture.png'),fullPage:true})
  await check('browser drill-down and logout destroy browser access; secure cookie properties',async()=>{
    const sessionCookie=(await context.cookies()).find(x=>x.name===salt);assert(sessionCookie?.httpOnly&&sessionCookie?.secure&&sessionCookie?.sameSite==='Lax')
    await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.waitForURL('**/login');await page.goto(base+'/cockpit');await page.waitForURL('**/login')
    assert(!(await context.cookies()).some(x=>x.name===salt));assert.deepEqual(errors,[])
  })
  await check('audit records login-independent failed access and export/logout without secrets',async()=>{assert(logs.includes('authorization_denied'));assert(logs.includes('export'));assert(logs.includes('logout'));assert(!logs.includes(secret));assert(!logs.includes(ownerCookie))})
  writeFileSync(path.join(output,'results.json'),JSON.stringify({claim:'LOCAL FIXTURE VERIFICATION ONLY; no real Google round-trip',results,screenshots:'Synthetic owner-session and telemetry fixtures'},null,2))
} finally { await browser?.close();server.kill('SIGTERM');writeFileSync(path.join(output,'server.log'),logs) }
