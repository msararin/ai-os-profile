import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import Database from "better-sqlite3"

const db = new Database(":memory:")
db.exec(`
CREATE TABLE ledger (
 log_id TEXT PRIMARY KEY,event_schema_version TEXT NOT NULL,idempotency_key TEXT NOT NULL,event_digest TEXT NOT NULL,
 writer_scope TEXT NOT NULL,writer_version TEXT NOT NULL,logged_at TEXT NOT NULL,experiment_id TEXT NOT NULL,
 experiment_version TEXT NOT NULL,lane TEXT NOT NULL,step_id TEXT NOT NULL,parent_step_id TEXT,parent_log_id TEXT,
 gate_name TEXT NOT NULL,step_name TEXT NOT NULL,supersedes_log_id TEXT,question TEXT,hypothesis TEXT,operation TEXT NOT NULL,
 observation TEXT NOT NULL,interpretation TEXT NOT NULL,decision TEXT NOT NULL,next_gate TEXT,blocking_reason TEXT,
 next_required_action TEXT,status TEXT NOT NULL,failure_class TEXT,decision_code TEXT,evidence_type TEXT NOT NULL,
 metrics_json TEXT NOT NULL,artifact_pointers_json TEXT NOT NULL,source_refs_json TEXT NOT NULL,
 train_touched INTEGER NOT NULL,test_touched INTEGER NOT NULL,model_training_performed INTEGER NOT NULL,
 artifact_persisted INTEGER NOT NULL,artifact_loadback_verified INTEGER NOT NULL,notebook_path TEXT,cell_label TEXT,
 code_hash TEXT,git_commit_sha TEXT,mlflow_run_id TEXT,generation_run_id TEXT,claim_boundary TEXT NOT NULL,notes TEXT,
 UNIQUE(experiment_id,experiment_version,idempotency_key)
);
CREATE TABLE gate_projection (
 experiment_id TEXT NOT NULL,experiment_version TEXT NOT NULL,lane TEXT NOT NULL,gate_name TEXT NOT NULL,
 current_status TEXT NOT NULL,blocking_reason TEXT,next_required_action TEXT,latest_log_id TEXT NOT NULL,
 latest_logged_at TEXT NOT NULL,projection_version INTEGER NOT NULL,event_digest TEXT NOT NULL,updated_at TEXT NOT NULL,
 claim_boundary TEXT NOT NULL,PRIMARY KEY(experiment_id,experiment_version,lane,gate_name)
);`)

const semanticKeys=["event_schema_version","idempotency_key","writer_scope","writer_version","experiment_id","experiment_version","lane","step_id","parent_step_id","parent_log_id","gate_name","step_name","supersedes_log_id","question","hypothesis","operation","observation","interpretation","decision","next_gate","blocking_reason","next_required_action","status","failure_class","decision_code","evidence_type","metrics_json","artifact_pointers_json","source_refs_json","train_touched","test_touched","model_training_performed","artifact_persisted","artifact_loadback_verified","notebook_path","cell_label","code_hash","git_commit_sha","mlflow_run_id","generation_run_id","claim_boundary","notes"]
const flagKeys=["train_touched","test_touched","model_training_performed","artifact_persisted","artifact_loadback_verified"]
const canonical=(value)=>JSON.stringify(value)
const digest=(event)=>createHash("sha256").update(canonical(Object.fromEntries(semanticKeys.map(k=>[k,event[k]??null])))).digest("hex")
const fields=["log_id",...semanticKeys.slice(0,4),"event_digest","logged_at",...semanticKeys.slice(4)]
const insert=db.prepare(`INSERT INTO ledger (${fields.join(",")}) VALUES (${fields.map(k=>`@${k}`).join(",")})`)

function validJson(value,shape){
 assert.equal(typeof value,"string"); assert(value.length<=65536,"JSON too large")
 const parsed=JSON.parse(value); assert(shape==="array"?Array.isArray(parsed):parsed&&typeof parsed==="object"&&!Array.isArray(parsed),`JSON must be ${shape}`)
 if(shape==="array") assert(parsed.every(x=>typeof x==="string"),"JSON array must contain strings")
}
function append(raw){
 const e={...raw}; const computed=digest(e); if(e.event_digest) assert.equal(e.event_digest,computed,"stale event digest"); e.event_digest=computed
 assert(e.claim_boundary?.trim(),"claim boundary required")
 validJson(e.metrics_json,"object"); validJson(e.artifact_pointers_json,"array"); validJson(e.source_refs_json,"array")
 for(const k of flagKeys) assert.equal(typeof e[k],"boolean",`${k} must be an explicit boolean`)
 if(e.writer_scope==="T8_INFRASTRUCTURE") assert.equal(e.train_touched+e.test_touched+e.model_training_performed+e.artifact_persisted+e.artifact_loadback_verified,0,"T8 scope violation")
 const replay=db.prepare("SELECT * FROM ledger WHERE experiment_id=? AND experiment_version=? AND idempotency_key=?").get(e.experiment_id,e.experiment_version,e.idempotency_key)
 if(replay){assert.equal(replay.event_digest,e.event_digest,"idempotency collision");return {row:replay,replayed:true}}
 assert(!db.prepare("SELECT 1 FROM ledger WHERE log_id=?").get(e.log_id),"conflicting log_id")
 if(e.parent_step_id){const p=db.prepare("SELECT * FROM ledger WHERE experiment_id=? AND experiment_version=? AND lane=? AND step_id=? AND (? IS NULL OR log_id=?)").get(e.experiment_id,e.experiment_version,e.lane,e.parent_step_id,e.parent_log_id,e.parent_log_id);assert(p,"unknown parent")}
 else assert.equal(e.parent_log_id,null,"parent_log_id requires parent_step_id")
 const isSup=e.decision_code==="SUPERSEDES_PRIOR_DECISION";assert.equal(Boolean(e.supersedes_log_id),isSup,"invalid supersede contract")
 if(isSup){assert.notEqual(e.supersedes_log_id,e.log_id,"self supersede");const old=db.prepare("SELECT * FROM ledger WHERE log_id=? AND experiment_id=? AND experiment_version=? AND lane=? AND gate_name=?").get(e.supersedes_log_id,e.experiment_id,e.experiment_version,e.lane,e.gate_name);assert(old,"unknown superseded event");assert(!db.prepare("SELECT 1 FROM ledger WHERE supersedes_log_id=?").get(e.supersedes_log_id),"ambiguous supersede branch");assert.notEqual(old.supersedes_log_id,e.log_id,"supersede cycle")}
 const persisted={...e,...Object.fromEntries(flagKeys.map(k=>[k,Number(e[k])]))}
 insert.run(persisted);const row=db.prepare("SELECT * FROM ledger WHERE log_id=?").get(e.log_id);assert.equal(row.event_digest,e.event_digest);return{row,replayed:false}
}
function base(overrides={}){return{log_id:"evt-1",event_schema_version:"0.2",idempotency_key:"run:B1:1",writer_scope:"T8_CONTRACT_TEST",writer_version:"0.1",logged_at:"2026-08-29T03:00:00Z",experiment_id:"NBO-EXP3",experiment_version:"3",lane:"policy-learning",step_id:"B1",parent_step_id:null,parent_log_id:null,gate_name:"B1_SUPPORT",step_name:"Support diagnostic",supersedes_log_id:null,question:"Is support sufficient?",hypothesis:null,operation:"READ_ONLY_DIAGNOSTIC",observation:"Counts persisted",interpretation:"Support bounded",decision:"Continue bounded diagnostics",next_gate:"B2",blocking_reason:null,next_required_action:"Prepare B2 authorization review",status:"PASS_WITH_BOUNDARIES",failure_class:null,decision_code:"CONTINUE_BOUNDED",evidence_type:"LOCAL_CONTRACT",metrics_json:"{}",artifact_pointers_json:"[]",source_refs_json:"[]",train_touched:false,test_touched:false,model_training_performed:false,artifact_persisted:false,artifact_loadback_verified:false,notebook_path:null,cell_label:null,code_hash:null,git_commit_sha:"4849b2e",mlflow_run_id:null,generation_run_id:null,claim_boundary:"LOCAL_CONTRACT_ONLY",notes:null,...overrides}}

assert(canonical(Object.fromEntries(semanticKeys.map(k=>[k,base()[k]??null]))).includes('"train_touched":false'),"canonical flags must remain booleans")
assert.equal(digest(base()),"fac7278872fdc8caf44cb0db48138bd9ebe5a097e971878f17ec567e34a423b3","canonical fixture drift")

const first=append(base());const before=first.row.event_digest
assert.equal(append(base()).replayed,true);assert.equal(db.prepare("SELECT COUNT(*) n FROM ledger").get().n,1)
assert.throws(()=>append(base({decision:"changed"})),/idempotency collision/)
assert.throws(()=>append(base({log_id:"stale",idempotency_key:"stale",decision:"changed",event_digest:before})),/stale event digest/)
append(base({log_id:"evt-2",idempotency_key:"run:B1:2",logged_at:"2026-08-29T03:01:00Z",step_id:"B1-CHECK",parent_step_id:"B1",parent_log_id:"evt-1",step_name:"Read-back"}))
append(base({log_id:"evt-3",idempotency_key:"run:B1:3",logged_at:"2026-08-29T03:02:00Z",step_id:"B1-DECISION",parent_step_id:"B1",parent_log_id:"evt-1",step_name:"Corrected decision",decision_code:"SUPERSEDES_PRIOR_DECISION",supersedes_log_id:"evt-1",decision:"Continue with corrected boundary"}))
assert.equal(db.prepare("SELECT event_digest FROM ledger WHERE log_id='evt-1'").get().event_digest,before)
assert.equal(db.prepare("SELECT COUNT(*) n FROM ledger").get().n,3)
assert.throws(()=>append(base({log_id:"evt-4",idempotency_key:"run:B1:4",decision_code:"SUPERSEDES_PRIOR_DECISION",supersedes_log_id:"evt-1"})),/ambiguous supersede branch/)
assert.throws(()=>append(base({log_id:"bad",idempotency_key:"bad",metrics_json:"nope"})),/JSON/)
assert.throws(()=>append(base({log_id:"bad2",idempotency_key:"bad2",writer_scope:"T8_INFRASTRUCTURE",test_touched:true})),/T8 scope violation/)

function project(logId,expected,version){const e=db.prepare("SELECT * FROM ledger WHERE log_id=?").get(logId);assert(e);const current=db.prepare("SELECT * FROM gate_projection WHERE experiment_id=? AND experiment_version=? AND lane=? AND gate_name=?").get(e.experiment_id,e.experiment_version,e.lane,e.gate_name);assert.equal(current?.latest_log_id??null,expected,"stale projection writer");assert.equal(version,(current?.projection_version??0)+1,"projection version gap");db.prepare(`INSERT INTO gate_projection VALUES (@experiment_id,@experiment_version,@lane,@gate_name,@status,@blocking_reason,@next_required_action,@log_id,@logged_at,@version,@event_digest,@updated_at,@claim_boundary) ON CONFLICT(experiment_id,experiment_version,lane,gate_name) DO UPDATE SET current_status=excluded.current_status,blocking_reason=excluded.blocking_reason,next_required_action=excluded.next_required_action,latest_log_id=excluded.latest_log_id,latest_logged_at=excluded.latest_logged_at,projection_version=excluded.projection_version,event_digest=excluded.event_digest,updated_at=excluded.updated_at,claim_boundary=excluded.claim_boundary`).run({...e,version,updated_at:"2026-08-29T03:03:00Z"})}
project("evt-1",null,1);assert.throws(()=>project("evt-3",null,2),/stale projection writer/);assert.throws(()=>project("evt-3","evt-1",99),/projection version gap/);project("evt-3","evt-1",2)
const gate=db.prepare("SELECT * FROM gate_projection").get();assert.equal(gate.latest_log_id,"evt-3");assert.equal(gate.next_required_action,"Prepare B2 authorization review");assert.equal(db.prepare("SELECT COUNT(*) n FROM ledger").get().n,3)

const appendSql=readFileSync("infra/databricks/nbo-nrt/event-ledger/002_append_event.sql","utf8").toUpperCase()
for(const forbidden of [" DELETE "," UPDATE ","INSERT OVERWRITE","CREATE OR REPLACE","WHEN MATCHED THEN UPDATE"]) assert(!appendSql.includes(forbidden),`ledger workflow contains ${forbidden}`)
const ddl=readFileSync("infra/databricks/nbo-nrt/event-ledger/001_create_event_ledger.sql","utf8")
for(const col of ["log_id","parent_step_id","supersedes_log_id","test_touched","model_training_performed","artifact_persisted","artifact_loadback_verified","event_digest","idempotency_key"]) assert(ddl.includes(col),`DDL missing ${col}`)

const verifier=readFileSync("infra/databricks/nbo-nrt/event-ledger/004_verify_runtime_contract.sql","utf8").toUpperCase()
assert.equal((verifier.match(/ORDINAL_POSITION - MIN\(ORDINAL_POSITION\) OVER \(\) \+ 1/g)??[]).length,2,"both runtime schemas must normalize ordinal metadata")
assert.equal((verifier.match(/WHEN 'LONG' THEN 'BIGINT'/g)??[]).length,2,"both runtime schemas must normalize Databricks LONG to BIGINT")

console.log(JSON.stringify({verdict:"PASS",boundary:"LOCAL_SQLITE_BEHAVIORAL_CONTRACT_ONLY",tests:{schema_read:true,append:true,idempotent_replay:true,collision_rejected:true,stale_digest_rejected:true,canonical_fixture:true,supersede_preserves_history:true,parent_link:true,explicit_flags:true,json_validation:true,t8_scope_guard:true,projection_cas:true,projection_version_sequence:true,ledger_sql_no_mutation:true,runtime_metadata_normalization:true},ledger_rows:3,latest_gate_log_id:gate.latest_log_id},null,2))
