import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import vm from 'node:vm'
function files(root) { return existsSync(root) ? readdirSync(root,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(root,e.name)):[path.join(root,e.name)]) : [] }
const blocked=[
  '69,881', '26,957', 'store_NfYL3Uteyb0tW1MJ',
  'b12f16ab527c419b8a394f6f3d3d9f5a',
  'INTERNAL_TELEMETRY_SANITIZED_SNAPSHOT_V1', 'Tier A to',
  'OWNER_GOOGLE_SUB',
  'GOOGLE_CLIENT_SECRET',
  'OWNER-PRIVATE-CANARY-9261', // Synthetic fixture marker, never a credential.
]
const targets=[...files('.next/static'),...files('.next/server/app').filter(f=>/\.(html|rsc)$/.test(f)),...files('public').filter(f=>/\.(html|json|txt|svg)$/.test(f))]
const leaks=[]
for(const file of targets) { const text=readFileSync(file,'utf8'); for(const marker of blocked) if(text.includes(marker)) leaks.push(`${file}: ${marker}`) }
assert.deepEqual(leaks,[], 'private markers must not appear in public HTML/RSC/assets/client bundles')
const prerender=JSON.parse(readFileSync('.next/prerender-manifest.json','utf8'))
assert.equal(Object.keys(prerender.routes).some(r=>/^\/(cockpit|internal)(\/|$)/.test(r)),false)
const sitemap=readFileSync('.next/server/app/sitemap.xml.body','utf8')
assert.equal(/cockpit|internal|org-roles|system-health/.test(sitemap),false)
for(const old of ['public/aios-phoenix-local-observability-spike-summary.html','public/optimize-worker-phase-b-local-proof-telemetry-report-20260701.html','public/evidence/exp3-notebook-acceptance-20260907.json']) assert.equal(existsSync(old),false)
console.log(`Owner leakage PASS: ${targets.length} public build/artifact files scanned; no private prerender or sitemap entries`)

const publicAllowlist = new Set(JSON.parse(readFileSync('data/public-route-allowlist.json','utf8')))
assert.deepEqual(Object.keys(prerender.routes).filter(route=>!publicAllowlist.has(route)),[], 'unreviewed static route')
for(const file of files('.next/server/app').filter(f=>f.endsWith('client-reference-manifest.js'))) {
  const context={};vm.runInNewContext(readFileSync(file,'utf8'),context)
  for(const manifest of Object.values(context.__RSC_MANIFEST??{})) for(const module of Object.keys(manifest.clientModules??{})) assert.equal(/(?:app\/(cockpit|internal)\/|lib\/cockpit\/|lib\/owner-access)/.test(module),false,`private module in client graph: ${module}`)
}
for(const variable of ['OWNER_GOOGLE_SUB','GOOGLE_CLIENT_SECRET','AUTH_SECRET','NEXTAUTH_SECRET']) {
  const value=process.env[variable]
  if(value&&value.length>=8) for(const file of targets) assert.equal(readFileSync(file,'utf8').includes(value),false,`${variable} value exposed in ${file}`)
}
console.log('Public prerender allowlist and private client-module graph checks PASS')
