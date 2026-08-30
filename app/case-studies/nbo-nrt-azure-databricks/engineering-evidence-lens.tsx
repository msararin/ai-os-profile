import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const preparation = [
  ["1", "Research", "Agent-assisted review compared public sources, schema/provenance gaps, and fitness for training, ranking, and threshold analysis."],
  ["2", "Controlled composition", "Useful source structures were retained; missing customer-offer-exposure-response relationships were generated with explicit synthetic assumptions and provenance."],
  ["3", "Visible governance", "Role separation, assumptions, evidence lanes, validation receipts, telemetry, and claim boundaries stayed visible."],
  ["4", "Prove the path first", "11 canonical CSV files and 805 source rows proved contracts, relationships, event order, ADLS, Unity Catalog, Bronze, Silver, and model-ready construction."],
  ["5", "Scale after Silver", "Only after Silver passed, volume expanded to 10,000 synthetic observations for behavior, thresholds, MLflow, registration, and read-back—not to manufacture a successful metric."],
]

const phases = [
  ["P1 · Data foundation", "Complete", "Research, composite generation, ADLS, Unity Catalog, 12 Bronze tables / 806 table rows, and Bronze Quality Gate passed.", "Batch development evidence only; no production customer data or readiness claim."],
  ["P2 · Preparation", "Complete", "Silver, profiling, model-ready construction, quality checks, and read-back completed.", "Assumption-derived synthetic experiment data—not operator behavior truth."],
  ["P3 · Candidate generation", "Complete", "Eligibility/policy contracts, candidates, decision persistence, and ranking inputs implemented.", "PoC rules are not operator production rules."],
  ["P4 · Baseline lifecycle", "Complete with quality gap", "Training, MLflow, UC registration, Candidate alias, and read-back completed; threshold 0.50 failed and 0.24 is not approved.", "Candidate is not Champion; production promotion is not authorized."],
  ["P5 · NBO/NRT delivery", "In Progress", "Ranking and selected-decision evidence exist; TMF680-aligned payload, downstream delivery, and latency evidence do not.", "LID680 is a traceability label; no NRT SLA or real integration is claimed."],
  ["P6 · Feedback/monitoring", "In Progress", "Synthetic outcome analysis and monitoring design exist; drift, production thresholds, and retraining governance do not.", "Reward, attribution, and threshold assumptions are not production-standard evidence."],
]

const phaseDetails: Record<string, string[][]> = {
  "P1 · Data foundation": [
    ["Data-source research", "Verified", "10 public candidates assessed and bounded source roles selected."],
    ["Target contract", "Verified", "Contract v0.1.0, 108 fields, and two isolated evidence lanes."],
    ["Synthetic composite", "Verified", "11 canonical CSV tables and 805 source rows generated and validated."],
    ["ADLS landing and read-back", "Proven", "12/12 local-to-ADLS byte hashes matched."],
    ["Unity Catalog access", "Proven", "Governed access to the landed package verified."],
    ["Bronze ingestion", "Complete", "12 governed Bronze tables created with 806 total table rows."],
    ["Bronze Quality Gate", "Complete", "Row counts, source-file counts, metadata, table checks, and cross-table closure passed."],
  ],
  "P2 · Preparation": [
    ["Target contract structure", "Verified", "Required source domains and target fields reconciled."],
    ["Evidence-lane separation", "Verified", "Methodology and synthetic decision-loop lanes remain isolated."],
    ["Provenance requirements", "Verified", "Source, derivation, run, and lineage fields retained."],
    ["Preparation logic", "Complete", "Cleaning, temporal, null, and quality rules executed."],
    ["Dataset profiling", "Complete", "Simulation dataset profile and class distribution recorded."],
    ["Silver transformation", "Complete", "Bounded Silver preparation executed and read back."],
    ["Feature preparation", "Complete", "Model-ready simulation dataset created."],
    ["Quality and freshness read-back", "Verified", "Quality gate and model-ready checks passed."],
  ],
  "P3 · Candidate generation": [
    ["Eligibility concept", "Verified", "Eligibility remains separated from model ranking."],
    ["Rule and exclusion structure", "Complete", "Bounded behavior-policy contract created and read back."],
    ["Candidate-table contract", "Complete", "Candidate fields, lineage, and trace requirements implemented."],
    ["Candidate versioning", "Verified", "Rule, run, and candidate-version fields retained."],
    ["Rule implementation", "Complete", "Synthetic policy logic executed."],
    ["Candidate generation", "Complete", "Customer-offer candidates generated for the experiment lane."],
    ["Candidate persistence", "Complete", "Candidate and simulation decision tables persisted and read back."],
    ["Candidate/ranking reconciliation", "Verified", "Decision-loop and ranking records reconciled within the bounded experiment."],
  ],
  "P4 · Baseline lifecycle": [
    ["Baseline model training", "Complete", "Synthetic propensity baseline trained on 10,000 rows."],
    ["MLflow tracking", "Complete", "Parameters, metrics, artifacts, and lineage logged."],
    ["Model registration", "Complete", "Model registered in Unity Catalog as version 1 with Candidate alias."],
    ["Registered-model read-back", "Verified", "Prediction and probability read-back matched."],
    ["Default threshold 0.50", "Failed", "No positive predictions; precision, recall, and F1 were 0."],
    ["Threshold analysis", "Complete", "Best-F1 threshold 0.24 analyzed."],
    ["Threshold 0.24", "Not approved", "High recall with low precision; operational selection requires capacity and cost criteria."],
    ["Model discrimination", "Weak-to-moderate", "ROC AUC 0.6294 and PR AUC 0.3941."],
    ["Production promotion", "Not authorized", "Synthetic experiment only; no Champion promotion."],
  ],
  "P5 · NBO/NRT delivery": [
    ["Ranking-result evidence", "Verified", "Synthetic ranking-result records and score evidence are available."],
    ["Selected-decision evidence", "Verified", "Synthetic next-best-offer decisions are persisted and traceable."],
    ["Top-N output contract", "Complete", "Score, model version, decision time, and trace fields defined."],
    ["TMF680-aligned payload", "Not started", "No simulated payload read-back yet."],
    ["Simulated NRT delivery", "Not started", "No downstream delivery execution."],
    ["Latency measurement", "Not started", "No NRT-oriented end-to-end latency evidence."],
  ],
  "P6 · Feedback/monitoring": [
    ["Exposure and response records", "Verified", "Synthetic offer-exposure and response-event evidence exists."],
    ["Outcome analysis", "Complete", "Selected-score and threshold outcome analysis completed."],
    ["Reward design", "Design complete", "Immediate and delayed outcomes remain explicit assumptions."],
    ["Monitoring dimensions", "Design complete", "Quality, freshness, latency, score, recommendation, and outcome dimensions defined."],
    ["Drift monitoring", "Not started", "No measured production or real-world drift."],
    ["Operational threshold", "Not approved", "Business-capacity and cost-based selection is required."],
    ["Retraining or policy update", "Not started", "No governed next-cycle execution."],
  ],
}

const flow = [
  ["1", "Synthetic World Specification", "AIOS Data Team owns the experiment-world contract before any new data is released.", "G0 / G1", "Define"],
  ["2", "Customer population + latent state", "Define bounded population structure and hidden state without leaking oracle truth into features.", "G2 / G4", "Design"],
  ["3", "Observable Telco behavior", "Generate observable behavior from the latent world while preserving realistic variability and provenance.", "G2 / G3", "Design"],
  ["4", "Context / event generation", "Generate timing, channel, and observable signals connecting customer state to a decision opportunity.", "G2 / G3", "Design"],
  ["5", "Offer interaction", "Create offer-fit and candidate interaction logic from observed seed structure plus labeled assumptions where sparse.", "G3 / G5", "Design"],
  ["6", "Exposure", "Represent what was shown, preserve action/candidate membership, and do not treat non-selection as rejection.", "G3 / G5", "Design"],
  ["7", "Probabilistic response", "Generate stochastic outcomes; keep response timing, uncertainty, and assumption lineage explicit.", "G5", "Design"],
  ["8", "Hidden evaluation truth", "Seal latent/oracle information from training features so leakage, holdout, and generalization checks remain meaningful.", "G4 / G6 / G7", "Gate-controlled"],
]

const gates = [
  ["G0", "Purpose / Claim", "Define the scientific question and claim ceiling before data release."],
  ["G1", "Provenance / Reproducibility", "Make generation inputs, versions, lineage, and replay controls auditable."],
  ["G2", "Statistical Realism", "Check whether distributions and variability are plausible for the bounded learning purpose."],
  ["G3", "Behavioral Coherence", "Check that context, candidate, exposure, and response relationships form a coherent decision world."],
  ["G4", "Leakage / Oracle Separation", "Keep hidden truth and evaluation-only information out of model-visible features."],
  ["G5", "Outcome Independence", "Prevent deterministic winners and preserve stochastic outcomes."],
  ["G6", "Hidden Challenge / Holdout", "Protect held-out evaluation assets from design-time use."],
  ["G7", "Data Release Authorization", "Release only after evidence, risks, boundaries, and handoff conditions are accepted."],
]

function Article({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <article id={`knowledge-nbo-${id.toLowerCase()}`} data-knowledge-id={`NBO-${id}`} className="scroll-mt-24 rounded-xl border border-border bg-background p-5">
    <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-300">Engineering evidence · NBO-{id}</p>
    <h4 className="mt-2 text-base font-semibold text-foreground">{title}</h4>
    <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">{children}</div>
  </article>
}

export function EngineeringEvidenceLens() {
  return <section id="engineering-evidence" className="min-w-0 scroll-mt-24 rounded-xl border border-sky-500/30 bg-sky-500/[0.03] p-5 [&_a]:break-words [&_code]:break-all" aria-labelledby="engineering-evidence-heading">
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-300">Primary home · How can we trust it?</p>
    <h3 id="engineering-evidence-heading" className="mt-2 text-lg font-semibold text-foreground">Engineering &amp; Evidence</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">Trace what was observed, how evidence was persisted and recovered, what it means, and which decision it permits—without turning execution facts into model or business claims.</p>

    <div className="mt-5 grid gap-3">
      {[["Observe", "Exact runs, rows, artifacts, gates, and controls."], ["Interpret", "What the evidence establishes—and what it does not."], ["Decide", "The authorized next action or explicit stop."], ["Recover", "Unity Catalog + MLflow remain durable; notebook memory is disposable."]].map(([h,b]) => <div key={h} className="rounded-lg border border-border bg-background p-4"><p className="font-semibold text-foreground">{h}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{b}</p></div>)}
    </div>

    <nav className="mt-5 flex flex-wrap gap-2 text-xs" aria-label="Engineering evidence questions">
      {[["#knowledge-nbo-k003","Snapshot"],["#knowledge-nbo-k004","Data path"],["#knowledge-nbo-k007","Lifecycle"],["#knowledge-nbo-k028","Recovery"],["#knowledge-nbo-k033","TEST custody"],["#knowledge-nbo-k036","Runtime proof"]].map(([href,label],i)=><a key={href} href={href} className="rounded-full border border-border bg-background px-3 py-2 font-semibold text-foreground hover:border-sky-500">{i+1}. {label}</a>)}
    </nav>

    <Alert className="mt-5 border-emerald-500/30 bg-emerald-500/5"><AlertDescription className="text-sm leading-6"><strong>Runtime-tested evidence.</strong> The Event Ledger contract was executed on Azure Databricks: successful paths, expected-failure paths, and post-failure state integrity were verified. Boundary: serialized single writer only; no concurrent multi-writer safety, TEST access, model training, or production business outcome is claimed.</AlertDescription></Alert>

    <div className="mt-6 space-y-4">
      <Article id="K003" title="What is the current evidence snapshot?">
        <div className="grid gap-3">{[["Data → Bronze","Complete · ADLS, Unity Catalog, 12 Bronze tables, Bronze Quality Gate."],["Silver / model-ready","Complete · bounded synthetic preparation and model-ready gate."],["MLflow / Registry","Verified · training, tracking, registration, Candidate alias, read-back."],["Business readiness","Not approved · no approved threshold, Champion, or production promotion."]].map(([h,b])=><div key={h} className="min-w-0 rounded-lg border border-border bg-muted/20 p-3"><p className="font-semibold text-foreground">{h}</p><p className="mt-1">{b}</p></div>)}</div>
        <p><strong className="text-foreground">Interpretation:</strong> lifecycle evidence exists, but it does not convert synthetic execution into business readiness. <strong className="text-foreground">Decision:</strong> retain this as a curated static snapshot until T9 evidence integration.</p>
      </Article>

      <Article id="K004" title="How did the data path become model-ready without hiding provenance?">
        <p><strong className="text-foreground">Observation:</strong> limited direct-fit public Telco material became a governed 10,000-row model experiment only after Silver stabilized.</p>
        <div className="space-y-2">{preparation.map(([n,h,b])=><details key={n} className="rounded-lg border border-border bg-background"><summary className="cursor-pointer p-3 font-semibold text-foreground">{n}. {h}</summary><p className="border-t border-border p-3">{b}</p></details>)}</div>
        <p><strong className="text-foreground">Boundary:</strong> synthetic preparation and provenance evidence only. The 805 source rows describe the 11-CSV source package; 806 rows is the later 12-table Bronze custody count.</p>
      </Article>

      <Article id="K006" title="Which engineering phases actually executed?">
        <div className="grid gap-3">{phases.map(([h,s,r,b])=><div key={h} className="min-w-0 rounded-lg border border-border bg-muted/20 p-3"><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold text-foreground">{h}</p><Badge variant="outline">{s}</Badge></div><p className="mt-2"><strong className="text-foreground">Evidence:</strong> {r}</p><p className="mt-2"><strong className="text-foreground">Boundary:</strong> {b}</p><details className="mt-3 rounded-md border border-border bg-background"><summary className="cursor-pointer p-3 font-semibold text-foreground">Sub-phase evidence</summary><div className="space-y-2 border-t border-border p-3">{phaseDetails[h].map(([name,status,result])=><div key={name} className="rounded-md bg-muted/20 p-2"><p className="font-semibold text-foreground">{name} · {status}</p><p className="mt-1">{result}</p></div>)}</div></details></div>)}</div>
        <p><strong className="text-foreground">Decision:</strong> execution status is not business readiness; the legacy source remains preserved below until T12.</p>
      </Article>

      <Article id="K007" title="Can the baseline artifact be identified and read back?">
        <p><strong className="text-foreground">Observation:</strong> total simulation dataset <strong>10,000 rows</strong> (TRAIN 8,002 / TEST 1,998); MLflow run <code>b12f16ab527c419b8a394f6f3d3d9f5a</code>; registered model <code>adb_nbo_nrt_mlops_dev.models.nbo_response_propensity_baseline</code>; version 1; alias <strong>Candidate</strong>; prediction and probability read-back verified.</p>
        <p><strong className="text-foreground">Interpretation:</strong> this proves lifecycle identity, not model quality. Threshold 0.50 failed; 0.24 was analyzed but not approved. <strong className="text-foreground">Decision:</strong> Candidate is not Champion and production promotion remains unauthorized.</p>
      </Article>

      <Article id="K011" title="How is Experiment 2A preparation kept gate-controlled?">
        <p><strong className="text-foreground">Observation:</strong> the Silver audit found governance metadata but sparse customer behavior/offer semantics, deterministic heuristic ranking, sampled synthetic response, and no business reward. AIOS Data Team owns the synthetic-world specification and release evidence; modeling remains downstream of G7.</p>
        <p><strong className="text-foreground">Reference principle:</strong> do not confuse scale with readiness. Validate provenance, behavioral coherence, oracle separation, and outcome independence before downstream modeling.</p>
        <div className="grid gap-2">{flow.map(([n,h,prepares,g,s])=><details key={n} className="min-w-0 rounded-lg border border-border bg-muted/20"><summary className="cursor-pointer p-3"><p className="font-semibold text-foreground">{n}. {h}</p><p className="mt-1">{g} · {s}</p></summary><div className="border-t border-border p-3"><p><strong className="text-foreground">What this prepares:</strong> {prepares}</p><p className="mt-2"><strong className="text-foreground">Inside the gate:</strong> assumptions/rules → required evidence → current status → blocker/open question → pass/fail decision.</p></div></details>)}</div>
        <p><strong className="text-foreground">Decision:</strong> authorize Behavior Simulation v2 + Offer Enrichment v2 only under the readiness gates; assumptions, rules, evidence, blockers, and custody remain explicit. 2B reuses the foundation for a different question and does not repair 2A.</p>
      </Article>

      <Article id="K013" title="Which readiness gates govern release?">
        <div className="grid gap-2">{gates.map(([g,h,o])=><details key={g} className="min-w-0 rounded-lg border border-border bg-background"><summary className="cursor-pointer p-3 font-semibold text-foreground">{g} · {h}</summary><div className="border-t border-border p-3"><p>{o}</p><p className="mt-2"><strong className="text-foreground">Evidence contract:</strong> objective → required evidence → current status → blocker/open question → pass/fail decision.</p></div></details>)}</div>
        <p><strong className="text-foreground">Boundary:</strong> gate evidence remains separate from model interpretation.</p>
      </Article>

      <Article id="K014" title="Which governance controls support—but do not replace—the gates?">
        <p><strong className="text-foreground">Observation:</strong> label provenance, assumption register, candidate grain, generator-to-feature leakage mapping, risk register, and decision telemetry remain subordinate controls under the relevant gates.</p>
        <p><strong className="text-foreground">Interpretation:</strong> controls improve auditability; they do not prove a successful outcome. <strong className="text-foreground">Boundary:</strong> no real customer propensity, commercial uplift, causal effectiveness, production readiness, contextual-bandit readiness, or RL readiness is established.</p>
      </Article>

      <Article id="K028" title="Can a clean notebook recover the active Experiment 3 execution path?">
        <p><strong className="text-foreground">Observation:</strong> <code>00_RECOVERY_BOOTSTRAP = PASS</code>; Unity Catalog recovered 8,002 TRAIN rows; MLflow loaded run <code>c764041889644a68acf02339b0faae54</code> / <code>reward_model_v1</code>; five rows scored successfully on Azure Databricks Serverless with MLflow 3.8.1.</p>
        <p><strong className="text-foreground">Recovery chain:</strong> UC TRAIN → MLflow artifact → UC Volume temp bridge → Spark ML → scoring. <code>MLFLOW_DFS_TMP</code> and <code>dfs_tmpdir</code>: <code>/Volumes/adb_nbo_nrt_mlops_dev/models/mlflow_tmp</code>.</p>
        <p><strong className="text-foreground">Interpretation:</strong> notebook variables are disposable; durable custody restored execution continuity. <strong className="text-foreground">Decision:</strong> no TEST touch, retraining, or authorization change. Related model impact: <a href="#knowledge-nbo-k030" className="font-semibold text-primary hover:underline">the diagnostic could resume from the recovered artifact</a>.</p>
      </Article>

      <Article id="K029" title="What is the durable artifact identity and continuation discipline?">
        <p><strong className="text-foreground">Observation:</strong> Reward Model V1 uses run <code>c764041889644a68acf02339b0faae54</code> / <code>reward_model_v1</code> and the recovery chain recorded above. Reward Model V2 has a separate persisted/load-back/scored PASS; the V1 run identity is not assigned to V2.</p>
        <p><strong className="text-foreground">Discipline:</strong> train → persist immediately → load back → verify → continue. Unity Catalog + MLflow are the durable source of truth, not notebook variables.</p>
        <p><strong className="text-foreground">Interpretation:</strong> durability and identity are proven, not model quality. Supporting counts used by <a href="#knowledge-nbo-k027" className="font-semibold text-primary hover:underline">the Models support diagnostic</a> must remain governed and reproducible.</p>
      </Article>

      <Article id="K033" title="Why is Experiment 3 TEST still sealed?">
        <p><strong className="text-foreground">Question:</strong> what should TEST answer after formulation is fixed? <strong className="text-foreground">Evidence:</strong> Reward Model V2 passed TRAIN formulation and personalization-capacity checks, but policy design is not locked.</p>
        <p><strong className="text-foreground">Interpretation:</strong> Experiment 3 TEST should answer generalization only. It must not select support thresholds, policy parameterization, exploration settings, or other design choices—or it becomes a development/validation set.</p>
        <p><strong className="text-foreground">Required reasoning:</strong> Question → Why → Expected learning → decision-changing evidence → Execute → Interpret → Gate before TEST. Before opening TEST, state what is tested, why TRAIN is sufficient now, what TEST uniquely answers, and contamination risk.</p>
        <p><strong className="text-foreground">Decision:</strong> finish TRAIN-only support diagnostics and lock formulation before held-out Experiment 3 TEST/OPE. Historical Experiment 2B TEST/OPE remains a separate completed lane.</p>
      </Article>

      <Article id="K035" title="How should the Cockpit present engineering evidence?">
        <p><strong className="text-foreground">Observation:</strong> the decision record requires the Cockpit to surface reasoning behind decisions, not only resulting status. Its former “NO COCKPIT DEPLOYMENT” label described the authority of that historical save—not today’s deployment state.</p>
        <p><strong className="text-foreground">Static Event Ledger home:</strong> the intended evidence relationship is Runtime execution → durable Unity Catalog / MLflow identity and lineage → append-oriented execution history → KB synthesis → Cockpit. The history must preserve prior decisions through superseding events rather than silent rewrites.</p>
        <p><strong className="text-foreground">Decision:</strong> preserve progressive disclosure and the relationship among observation, interpretation, decision, artifacts, lineage, gates, and TEST isolation. The public surface presents a sanitized evidence summary; raw execution receipts remain retained for internal reconciliation.</p>
      </Article>

      <Article id="K036" title="Was the Event Ledger contract tested on the actual Databricks runtime?">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-emerald-700 bg-emerald-100 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100">RUNTIME VERIFIED</Badge>
          <Badge variant="outline">PASS WITH BOUNDARIES</Badge>
        </div>
        <p><strong className="text-foreground">Yes—tested, not inferred.</strong> The contract was executed on the actual Azure Databricks runtime on 30 Aug 2026. Evidence retained includes successful outputs, expected-error receipts, and read-back checks after each rejected mutation.</p>
        <details className="rounded-lg border border-border bg-background">
          <summary className="cursor-pointer p-3 font-semibold text-foreground">View tested runtime evidence summary</summary>
          <div className="space-y-2 border-t border-border p-3">
            {[
              ["Schema and append-only contract", "PASS", "Ledger 45/45; projection 13/13; append-only enabled."],
              ["Parent, child, and supersede lineage", "PASS", "Three immutable events retained with valid parent and correction links."],
              ["Idempotency and collision guard", "PASS", "Replay created no row; changed digest was rejected; state remained unchanged."],
              ["Projection pointer guard", "PASS", "Version advanced 1 → 2; stale version 1 writer was rejected."],
              ["UPDATE and DELETE immutability", "PASS", "Both mutations were rejected by Delta; digest, timestamp, notes, and row count survived read-back."],
              ["Final integrity closeout", "PASS", "3 ledger rows, 1 projection row, zero prohibited execution flags."],
            ].map(([name,status,result]) => <div key={name} className="rounded-md bg-muted/20 p-3"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-foreground">{name}</p><span className="font-semibold text-emerald-700 dark:text-emerald-300">{status}</span></div><p className="mt-1">{result}</p></div>)}
          </div>
        </details>
        <p><strong className="text-foreground">Evidence custody:</strong> sanitized results are available here without Databricks access; detailed execution receipts are retained internally. <strong className="text-foreground">Boundary:</strong> serialized single writer only under <code>SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY</code>. Multi-writer safety and production readiness were not tested or claimed.</p>
      </Article>
    </div>
  </section>
}
