import {spawn} from 'node:child_process'
import {randomBytes} from 'node:crypto'
import {mkdirSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
import {encode} from 'next-auth/jwt'
import {chromium} from '@playwright/test'
const store=process.env.OWNER_RECOVERY_STORE,output=process.env.OWNER_RECOVERY_OUTPUT
assert(store&&output,'explicit preserved store and output required')
mkdirSync(output,{recursive:true})
const secret=randomBytes(48).toString('hex'),salt='__Secure-authjs.session-token',base='http://localhost:3292'
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3292'],{env:{...process.env,AUTH_SECRET:secret,AUTH_URL:base,AUTH_TRUST_HOST:'true',OWNER_GOOGLE_SUB:'recovery-fixture',GOOGLE_CLIENT_ID:'fixture',GOOGLE_CLIENT_SECRET:'fixture',COCKPIT_PRIVATE_STORE_PATH:store,COCKPIT_PRIVATE_ARCHIVE:'',COCKPIT_OPERATIONS_PATH:''},stdio:['ignore','pipe','pipe']})
let log='',browser;server.stdout.on('data',x=>log+=x);server.stderr.on('data',x=>log+=x)
const results=[]
try {
  let ready=false;for(let n=0;n<100;n++){try{if((await fetch(base+'/login')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}assert(ready,'server start')
  const token=await encode({secret,salt,token:{googleSub:'recovery-fixture',ownerExpiresAt:Date.now()+300000},maxAge:3600})
  browser=await chromium.launch({headless:true,...(process.env.OWNER_TEST_BROWSER_CHANNEL?{channel:process.env.OWNER_TEST_BROWSER_CHANNEL}:{})})
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[]
  page.on('pageerror',e=>errors.push(e.message))
  await context.addCookies([{name:salt,value:token,domain:'localhost',path:'/',httpOnly:true,secure:true,sameSite:'Lax'}])
  for(const section of ['workstreams','deployments','experiments','evidence','methodology','security']){await page.goto(base+'/cockpit/'+section);await page.getByRole('heading',{name:'Saved reports and implementation detail'}).waitFor();assert((await page.getByText(/matching records/).textContent()).match(/^[1-9]/));results.push({name:section+' connected to saved records',pass:true})}
  await page.goto(base+'/cockpit/deployments');assert.equal(await page.getByRole('link',{name:'Open deployment receipt →'}).count(),3);await page.getByRole('link',{name:'Open deployment receipt →'}).first().click();await page.getByRole('heading',{name:'Recorded data'}).waitFor();assert((await page.locator('main').innerText()).includes('git Source'));results.push({name:'three deployment receipts and readable detail',pass:true})
  await page.goto(base+'/cockpit/evidence/6e048950abf96e08c45b249b');await page.getByRole('heading',{name:'phases',exact:true}).waitFor();assert((await page.locator('main').innerText()).includes('0.6294'));await page.screenshot({path:output+'/experiment-report.png',fullPage:false});results.push({name:'original NBO phases and numeric model evidence rendered',pass:true})
  await page.goto(base+'/cockpit/evidence/2a8c591bac84d097b2bd65d5');await page.locator('iframe[title="Preserved report"]').waitFor();assert.equal(await page.locator('iframe').getAttribute('sandbox'),'');const preview=await context.request.get(base+'/api/cockpit/preview/2a8c591bac84d097b2bd65d5');assert.equal(preview.status(),200);assert(preview.headers()['content-security-policy'].startsWith('sandbox;'));results.push({name:'historical HTML protected sandbox preview',pass:true})
  const api=await context.request.get(base+'/api/cockpit/telemetry'),payload=await api.json();assert.equal(payload.data.runs.length,8);assert.equal(payload.data.deployments.length,3)
  for(const view of ['runs','routes','providers','cost','validation','failures','history']){await page.goto(base+'/cockpit/telemetry?view='+view+'&days=30');await page.getByRole('heading',{name:'Detailed telemetry'}).waitFor();assert(!(await page.locator('main').innerText()).includes('No validated operational source is connected'))}
  results.push({name:'all telemetry views connected to recorded source; archive history retained',pass:true})
  await page.goto(base+'/cockpit');await page.getByRole('heading',{name:'Continue from your saved work'}).waitFor();await page.screenshot({path:output+'/overview.png',fullPage:true})
  if(process.env.OWNER_JOURNAL_TEST==='1') {
    for(const lane of ['one','two-a','two-b','three']) {
      await page.goto(base+'/cockpit/learning/nbo-nrt?experiment='+lane)
      const iframe=page.locator('iframe');await iframe.waitFor()
      const frame=page.frameLocator('iframe')
      await frame.getByRole('heading',{name:'One decision system, three review lenses'}).waitFor()
      assert.equal(await frame.locator('script,iframe,form,object,embed').count(),0)
      assert((await frame.locator('details').count())>40)
      const detail=frame.locator('details').first(),summary=detail.locator('summary').first()
      const wasOpen=await detail.getAttribute('open');await summary.click();assert.notEqual(await detail.getAttribute('open'),wasOpen)
      assert.equal(await frame.locator('[data-experiment-card-selector] a').count(),4)
      await frame.locator('[data-experiment-card-selector] a').nth(lane==='three'?0:3).click()
      await frame.getByRole('heading',{name:lane==='three'?'Data Preparation — From Multi-Agent Research to Model-Ready Volume':'Experiment 3 — Adaptive Contextual Bandit Policy',exact:true}).waitFor()
      results.push({name:'Learning journal '+lane+' preserves lenses, native details and experiment navigation',pass:true})
    }
    await page.goto(base+'/cockpit/learning/nbo-nrt');await page.frameLocator('iframe').getByRole('heading',{name:'One decision system, three review lenses'}).waitFor();await page.screenshot({path:output+'/learning-journal-desktop.png'})
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:output+'/learning-journal-mobile.png'})
    await context.clearCookies();await page.goto(base+'/cockpit/learning/nbo-nrt');assert(page.url().includes('/login'))
  }
  await context.clearCookies();assert.equal((await context.request.get(base+'/api/cockpit/preview/2a8c591bac84d097b2bd65d5')).status(),401)
  assert.deepEqual(errors,[]);results.push({name:'anonymous preview denied and no browser runtime errors',pass:true})
  writeFileSync(output+'/results.json',JSON.stringify({claim:'Local owner-session fixture against preserved private data; not real production login',results},null,2));console.log(JSON.stringify(results,null,2))
}finally{await browser?.close();server.kill('SIGTERM');writeFileSync(output+'/server.log',log)}
