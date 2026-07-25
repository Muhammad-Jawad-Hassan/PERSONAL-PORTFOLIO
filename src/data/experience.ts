export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  /** Company site. Renders the company name as an outbound link. */
  companyUrl?: string;
  start: string;
  end: string | "Present";
  location: string;
  /** One-line essence of the role. */
  tagline: string;
  /** Longer paragraph for the timeline section. Adds context beyond the tagline. */
  summary: string;
  /** Key technologies / tools used. Shown as chips. */
  stack: string[];
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "devsinc",
    role: "Senior Software Engineer · AI/ML & Backend",
    company: "Devsinc",
    companyUrl: "https://www.devsinc.com/",
    start: "04/2024",
    end: "Present",
    location: "Lahore, Pakistan",
    tagline:
      "Shipping production AI systems: multi-agent platforms, RAG, GPU pipelines.",
    summary:
      "Designing and delivering production-grade AI across the full lifecycle for clients in healthcare, fintech, and insurance. Senior engineer on agentic platforms, RAG pipelines, and asynchronous backends. Work spans multi-agent reasoning systems, distributed desktop automation, audio intelligence, document automation, and quantitative ranking engines, all deployed on AWS.",
    stack: [
      "LangGraph",
      "LangChain",
      "Claude",
      "MCP",
      "n8n",
      "Langfuse",
      "FastAPI",
      "Temporal",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Neo4j",
      "Weaviate",
      "SQLAlchemy",
      "Docker",
      "AWS S3",
      "AWS Lambda",
      "AWS Bedrock",
      "Google Cloud",
      "BigQuery",
      "MariaDB",
      "NVIDIA NeMo",
      "Keycloak",
    ],
    highlights: [
      "Designed and delivered production-grade AI systems across multiple client initiatives spanning healthcare, fintech, and insurance, including multi-agent platforms, a distributed desktop automation agent, RAG pipelines, and GPU audio intelligence.",
      "Engineered scalable asynchronous FastAPI backends with Temporal, Celery, Redis, PostgreSQL, and AWS services such as Lambda and Bedrock, enabling distributed orchestration and production AI workloads.",
      "Built autonomous multi-agent systems with LangGraph, LangChain, Claude, and LangFuse to automate financial research, client reporting, and enterprise workflows, reducing manual reporting effort by ~65%.",
      "Architected a three-tier distributed desktop AI agent platform (FastAPI proxy, Temporal orchestration, Windows VM fleet) where Claude Code subprocesses drive Epic EHR workflows through a 19-tool MCP server, with no API or DOM access available.",
      "Developed a dynamic asset allocation engine combining LLM reasoning with quantitative financial metrics, improving portfolio recommendation accuracy by ~30% over rule-based approaches.",
      "Architected GPU-accelerated, event-driven pipelines for real-time audio and document processing, cutting end-to-end workflow execution time by ~40%.",
    ],
  },
  {
    id: "nextbridge",
    role: "Data Scientist",
    company: "Nextbridge Ltd.",
    companyUrl: "https://nextbridge.com/",
    start: "09/2022",
    end: "03/2024",
    location: "Lahore, Pakistan",
    tagline:
      "End-to-end data science: ingestion, modeling, deployment, dashboards.",
    summary:
      "Owned the full data science lifecycle: exploratory analysis, feature engineering, model development, and deployment for classification, regression, and clustering problems. Built end-to-end ML pipelines and interactive dashboards, and aligned model output with business KPIs through close collaboration with cross-functional teams.",
    stack: [
      "Python",
      "SQL",
      "Scikit-Learn",
      "XGBoost",
      "TensorFlow",
      "Plotly",
      "Matplotlib",
      "Seaborn",
    ],
    highlights: [
      "Built end-to-end machine learning pipelines covering data preprocessing, feature engineering, and model training.",
      "Performed exploratory data analysis and statistical techniques to extract insights, trends, and support data-driven decisions.",
      "Developed and optimized machine learning models for classification, regression, and clustering using Scikit-Learn, XGBoost, and TensorFlow, achieving ~88% average accuracy across evaluated datasets.",
      "Created interactive dashboards and visualizations with Plotly, Matplotlib, and Seaborn to effectively communicate insights.",
      "Collaborated with a cross-functional team to deploy models, automate workflows, and align solutions with business KPIs using Python and SQL.",
    ],
  },
  {
    id: "axcelerateai",
    role: "Machine Learning Engineer",
    company: "AxcelerateAI",
    companyUrl: "https://www.axcelerate.ai/",
    start: "05/2021",
    end: "08/2022",
    location: "Lahore, Pakistan",
    tagline:
      "Computer vision in the wild: detection, tracking, edge optimization.",
    summary:
      "Built and deployed real-world computer vision systems with a focus on edge inference. Owned the full CV pipeline from dataset acquisition and annotation to model training, fine-tuning, and on-device deployment for resource-constrained hardware.",
    stack: [
      "YOLO",
      "ByteTrack",
      "OpenCV",
      "PyTorch",
      "NVIDIA Jetson Nano",
      "CVAT",
    ],
    highlights: [
      "Developed and deployed a real-time object detection and tracking system using YOLO and ByteTrack, achieving ~92% detection accuracy on live video streams.",
      "Optimized computer vision models for NVIDIA Jetson Nano edge deployment, reducing model size by ~45% while maintaining production-level inference performance.",
      "Trained, evaluated, and fine-tuned computer vision models to achieve high accuracy, robustness, and production readiness.",
      "Contributed to data acquisition and annotation strategy design, ensuring high-quality datasets for computer vision model development.",
    ],
  },
];
