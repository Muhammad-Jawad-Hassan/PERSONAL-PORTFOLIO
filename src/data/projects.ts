export type Project = {
  id: string;
  title: string;
  /** Client or product the work shipped under. Shown next to the title. */
  client?: string;
  /** Public site for the client/product. Renders the title as an outbound link. */
  url?: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  category: "Agentic AI" | "AI Backend" | "Automation" | "LLM Data & Evals";
  /** Used by the Phase 4 "Project Worlds" — defines the visual concept for each project's 3D scene. */
  worldConcept: string;
  /** Public path (e.g. "/projects/agentic.jpg"). When omitted, a generative placeholder is rendered. */
  image?: string;
};

/** Ordered by technical depth, most architecturally demanding first. */
export const projects: Project[] = [
  {
    id: "ehr-desktop-agent",
    title: "Distributed EHR Desktop Automation Agent",
    client: "Atlas Health",
    url: "https://atlas.health/",
    tagline: "Driving Epic EHR through the desktop itself, with no API and no DOM.",
    category: "Agentic AI",
    image: "/projects/ehr-desktop-agent.png",
    worldConcept:
      "Three stacked tiers: a lone request gateway at the top, a branching orchestration layer beneath it, and a fleet grid of Windows VM screens below, each screen driven by its own glowing cursor trail.",
    summary:
      "A three-tier distributed agent system that routes A2A healthcare task requests to a fleet of Windows VMs, where a Claude Code subprocess drives Epic EHR workflows through screen capture, OCR element finding, and desktop input, with no API or DOM access available.",
    highlights: [
      "Architected a three-tier distributed automation system, a FastAPI proxy, Temporal workflow orchestration, and a Windows VM worker pool, where each VM runs a Claude Code subprocess backed by a 19-tool MCP server for desktop control, enabling fully autonomous EHR task execution at scale.",
      "Built the 19-tool FastMCP server over stdio, giving Claude screenshot capture, Windows OCR element finding, mouse and keyboard control, and PowerShell execution, the only automation path available inside a Citrix-hosted Epic EHR.",
      "Implemented atomic VM claim logic using SQL FOR UPDATE SKIP LOCKED against a per-tenant MariaDB fleet registry, with Temporal activities managing the full task lifecycle (find or scale VM, dispatch, poll, release), eliminating race conditions in concurrent task routing.",
      "Designed checkpoint-based task resumption using SQLite step, label, and context snapshots, letting Claude Code recover mid-workflow from VM restarts, and added human-in-the-loop controls (steering messages, report_stuck() help requests, SSE event streaming) for live operator oversight.",
      "Secured the inbound A2A request path with Keycloak and PyJWT JWKS validation, and provisioned the Windows fleet through the Google Cloud Compute SDK with Helm and Kubernetes deployments.",
    ],
    stack: [
      "FastAPI",
      "Temporal",
      "Claude Code",
      "FastMCP",
      "A2A",
      "pyautogui",
      "winocr",
      "PowerShell",
      "MariaDB",
      "SQLite",
      "Keycloak",
      "Google Cloud",
      "Kubernetes",
    ],
  },
  {
    id: "smart-doc",
    title: "AI Health-Data Aggregation & Assistant Platform",
    client: "Smart Doc",
    url: "https://www.smartdocapp.com/",
    tagline: "Fragmented patient records unified into one queryable clinical graph.",
    category: "Agentic AI",
    image: "/projects/smart-doc.png",
    worldConcept:
      "Scattered medical documents, wearable readings, and lab reports drifting inward and snapping into a single luminous knowledge graph of a patient record.",
    summary:
      "The Python and FastAPI AI layer behind a health-technology platform that unifies EHRs, wearables, labs, and manual logs into one structured, queryable record, with a conversational assistant that can both answer questions and write records back.",
    highlights: [
      "Built the Python and FastAPI AI services for a health platform that unifies FHIR EHR feeds, wearables, labs, and manual logs into one structured, queryable record across PostgreSQL, Neo4j, and MemGraph.",
      "Designed a hierarchical routing tree where every step forces the LLM to choose from an enum of valid next actions, so it cannot invent a route, then dispatches to one of 25+ Pydantic-validated domain tools that read and write real patient data.",
      "Engineered a provider-agnostic LLM layer over AWS Bedrock, OpenAI, and Gemini with a canonical message format plus conversion adapters, and model families mapping routing, tool, chat, and reasoning roles to different models, using a cheap model for high-volume routing and upgrading only where accuracy mattered.",
      "Built the clinical tooling that resolves free text to standard vocabularies by traversing a Neo4j knowledge graph, diagnoses to ICD-10, medications to RxNorm, and observations to LOINC, with an ML classifier fallback when graph traversal found no match.",
      "Split the document pipeline into three independently retryable stages (detect ontologies, extract concept mentions, resolve canonical codes), writing entities to Neo4j with provenance, and added retrieval-augmented generation over uploaded patient documents using Weaviate.",
      "Enforced tenancy at the tool layer by always taking the patient UUID from the authenticated session rather than from model output, so a manipulated LLM still cannot write to another patient's record.",
    ],
    stack: [
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "AWS Bedrock",
      "OpenAI",
      "Gemini",
      "PostgreSQL",
      "Neo4j",
      "MemGraph",
      "Weaviate",
      "DynamoDB",
      "AWS Cognito",
      "Terraform",
      "FHIR",
      "Tavily",
      "Mem0",
    ],
  },
  {
    id: "agentic-investment-platform",
    title: "Agentic Multi-Asset Research & Investment Platform",
    client: "Linvest21",
    url: "https://www.linvest21.com/",
    tagline: "A supervisor LLM running a team of specialist research agents.",
    category: "Agentic AI",
    image: "/projects/agentic-investment.png",
    worldConcept:
      "A floating financial dashboard with live charts orbiting a central LLM core; agents visualized as satellite nodes performing parallel tasks.",
    summary:
      "An AI investment-analyst backend where a supervisor agent routes research to specialists across equities, fixed income, ETFs, and mutual funds, builds model portfolios, and streams analyst-grade reports back to a chat client in real time.",
    highlights: [
      "Architected a LangGraph multi-agent system on the supervisor pattern: a router LLM assigns work to specialist agents that communicate only through shared state, then an output compiler writes the final client-facing report and a follow-up agent proposes next questions.",
      "Implemented dynamic routing with Pydantic structured output and parallel fan-out through LangGraph Send objects, wrapping each node in a retry policy so a transient model failure degrades instead of killing the run.",
      "Built the six-stage portfolio construction pipeline: pick one of ten strategic allocation models, apply a tactical tilt from consumer-sentiment data, normalize the blended allocation to 100%, weight return against expense ratio and tracking error, rank candidate funds per bucket, and render an explainable report, with a fallback at every stage so it always returns something useful.",
      "Developed the async FastAPI service with Keycloak OAuth2 auth, multi-tenant client environments, and token-by-token SSE streaming, over an async SQLAlchemy security master of ~380 funds in a ~390-node asset-class tree walked with recursive SQL CTEs.",
      "Wired multi-provider model selection (GPT-4o for routing, Claude Sonnet for heavy portfolio reasoning) with LangSmith tracing, and shipped it containerized to AWS ECS through GitHub Actions across dev, test, prod, and per-tenant deployments.",
    ],
    stack: [
      "LangGraph",
      "LangChain",
      "LangSmith",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "SQLite",
      "Keycloak",
      "Server-Sent Events",
      "GPT-4o",
      "Claude",
      "SerpAPI",
      "Docker",
      "AWS ECS",
      "GitHub Actions",
    ],
  },
  {
    id: "call-analytics-system",
    title: "Enterprise Audio Intelligence & Call Analytics",
    client: "EcoLink",
    url: "https://ecolink.inteveo.com/",
    tagline: "GPU speech pipeline turning insurance calls into coaching and tasks.",
    category: "AI Backend",
    image: "/projects/call-analytics.png",
    worldConcept:
      "A pulsing sound-wave terrain that morphs into structured cards (transcript → summary → action items) as the camera dollies through.",
    summary:
      "A GPU-accelerated AI microservice that turns recorded insurance calls into speaker-labeled transcripts, structured summaries, sentiment and agent performance scores, and prioritized follow-up task lists.",
    highlights: [
      "Engineered a GPU-accelerated FastAPI microservice that converts insurance call recordings into transcripts, CRM-ready summaries, agent scorecards, sentiment breakdowns, and prioritized task lists with due dates and supporting quotes.",
      "Built the speech pipeline on NVIDIA NeMo, pairing a FastConformer ASR model for word-level timestamps with a Sortformer diarization model for speaker attribution, running both concurrently and aligning them into a readable speaker-labeled conversation.",
      "Normalized audio to 16 kHz mono PCM16 with FFmpeg and chunked long recordings into ~30-minute segments with timestamps shifted back to true position, running ASR in float16 so multi-hour calls stayed inside GPU memory, with any remaining OOM surfaced as a clean 507 rather than an unhandled crash.",
      "Integrated AWS Bedrock with Llama 3.3 70B, converting messages into Llama 3's native prompt format and enforcing strict JSON output through field validation and Pydantic before anything reached the client.",
      "Packaged it for reproducible GPU deployment on an nvidia/cuda base image with Docker Compose GPU reservation and the NVIDIA Container Toolkit, and wrote a health endpoint that runs a real end-to-end pipeline on a sample recording instead of only reporting that the process is alive.",
    ],
    stack: [
      "FastAPI",
      "NVIDIA NeMo",
      "PyTorch",
      "CUDA",
      "AWS Bedrock",
      "Llama 3",
      "AWS S3",
      "FFmpeg",
      "Pydantic",
      "Docker Compose",
      "boto3",
    ],
  },
  {
    id: "ms-novel-code",
    title: "Novel Code Manager · LLM Training & Evaluation Data",
    client: "Turing",
    url: "https://www.turing.com/",
    tagline: "Original, verifiable Python tasks used to train and grade coding models.",
    category: "LLM Data & Evals",
    image: "/projects/ms-novel-code.png",
    worldConcept:
      "A task capsule cloned ten times in a row, each clone running and reporting a verdict, with a single flickering amber clone flagged as flaky among nine stable green passes.",
    summary:
      "A task factory and quality-control line producing original Python coding problems, each with an ideal reference solution and an exhaustive automated test suite, verified in a container sandbox so it can train and objectively grade LLMs.",
    highlights: [
      "Authored novel multi-requirement Python tasks, each a strictly formatted prompt plus reference solution plus 100 to 270 unit tests, spanning async APIs, concurrency, cryptography, Python/C++ FFI, and scientific computing, with every stated requirement mapped to an automated test.",
      "Built the verification runner that dynamically loads any task, executes its suite 10 times, and labels each test STABLE PASS, FLAKY, or CONSISTENT FAIL, because non-deterministic ground truth silently poisons both training data and benchmarks.",
      "Made runs genuinely reproducible by clearing __pycache__ and unloading modules between iterations, recreating uv virtual environments per task from pinned lockfiles, and emitting per-test stdout, stderr, tracebacks, and min/avg/max timing as JSON with CI-usable exit codes.",
      "Containerized execution from one Ubuntu 24.04 Containerfile runnable under Docker, Podman, or NVIDIA Enroot, with an engine-detecting build script so the same image verifies tasks on a laptop or on a SLURM GPU cluster.",
      "Ran an LLM-assisted authoring loop in Jupyter, a problem-crafting agent to add realistic engineering scaffolding and a prompt-engineering agent to enforce the spec, followed by a review pass that annotates non-compliant code before the ideal solution is finalized, with coverage.py gating test thoroughness.",
    ],
    stack: [
      "Python",
      "unittest",
      "coverage.py",
      "uv",
      "Docker",
      "Podman",
      "NVIDIA Enroot",
      "SLURM",
      "Jupyter",
      "FastAPI",
      "Pydantic",
    ],
  },
  {
    id: "n8n-analytics-automation",
    title: "Three-Agent SEO & Sales Automation Suite",
    client: "8 Figure Agency",
    url: "https://www.8figureagency.co/",
    tagline: "Seventeen n8n workflows replacing manual SEO reporting and sales handoffs.",
    category: "Automation",
    image: "/projects/n8n-automation.png",
    worldConcept:
      "An animated node graph where data flows BigQuery → analysis engine → LLM → ClickUp and Slack, with each node lighting up in sequence as a report assembles.",
    summary:
      "Three AI agents built on n8n for a marketing agency: an on-demand deep-dive SEO analyst, a scheduled all-client reporting agent, and a sales-handoff agent that turns a recorded call into a structured onboarding brief routed across Google Docs, the CRM, ClickUp, and Slack.",
    highlights: [
      "Built three agents across 17 n8n workflows on a modular sub-workflow pattern with a {status: success | error} contract checked by the caller, so one client's missing data skips that client with a recorded reason instead of failing the whole scheduled run.",
      "Wrote the deterministic analysis engine in code nodes: stripping Google Business Profile noise out of site data, classifying pages as winning, losing, or stable against tunable thresholds, filtering real keyword cannibalization, and scoring opportunities by impact × confidence ÷ effort against a position-to-CTR curve, leaving the LLM to narrate computed numbers rather than invent them.",
      "Pulled six BigQuery tables per client covering page and query performance across four comparison windows, technical issues, cannibalization, and health scores, then had GPT-4o return strict JSON that was published as ClickUp doc subpages with a live status lifecycle on the triggering task.",
      "Gated the sales-handoff agent behind an LLM classifier at temperature 0 that must return is_sales_call with confidence above 0.75 before any downstream work runs, then used a structured output parser with explicit Observed, Inferred, and unknown labeling rules to keep the generated onboarding brief free of invented prices, dates, and vendors.",
      "Added human-in-the-loop Slack approval with Approve and Decline buttons for ambiguous ClickUp folder matches, and traced every AI call to Langfuse over both its ingestion API and OpenTelemetry, with a dedicated error-handler workflow logging failures to a data table and emailing alerts.",
    ],
    stack: [
      "n8n",
      "GPT-4o",
      "LangChain",
      "Langfuse",
      "OpenTelemetry",
      "Google BigQuery",
      "ClickUp API",
      "Slack API",
      "Google Docs",
      "Google Apps Script",
      "GoHighLevel",
      "Fireflies.ai",
    ],
  },
];
