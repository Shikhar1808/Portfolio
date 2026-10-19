// All page content lives here, taken from the resume and the GitHub repos. Edit this file to update the site.
import type { IconName } from "./icons";

export const links = {
  email: "saxena.shikhar1808@gmail.com",
  github: "https://github.com/Shikhar1808",
  repos: "https://github.com/Shikhar1808?tab=repositories",
  linkedin: "https://linkedin.com/in/shikhar-saxena-90a484296",
  leetcode: "https://leetcode.com/u/ShikharSaxena6251",
  resume: "/shikhar-saxena-resume.pdf",
  resumePage: "/resume",
};

// Status line that scrolls in the side rail, as [bold part, light part].
export const railTicker: Row[] = [
  ["open", "to work"],
  ["final-year", "cse, thapar"],
  ["graduating", "2027"],
  ["based in", "india"],
];

export const stats = [
  { label: "Decode latency", value: "14–15 ms", note: "per token, LLM inference under load" },
  { label: "GPU speedup", value: "22×", note: "batch vector search vs CPU" },
  { label: "Concurrent users", value: "1000+", note: "at sub-100 ms on Zenith" },
  { label: "False alarms cut", value: "65–90%", note: "by ZaiGuard's filter layers" },
  { label: "LeetCode", value: "417+", note: "problems solved, 1551 rating" },
];

type Row = [key: string, value: string];

export const experience: {
  company: string;
  role: string;
  dates: string;
  icon: IconName;
  points: string[];
  rows: Row[];
  link?: { href: string; label: string };
}[] = [
  {
    company: "Voxomos Systems",
    role: "Software Intern",
    dates: "Jun – Jul 2026",
    icon: "cpu",
    points: [
      "Developed and benchmarked CPU, CUDA and HIP implementations of cosine similarity and vector search, profiled with NVIDIA Nsight Systems and Nsight Compute, and tested portability to AMD through ROCm, HIP and HIPIFY.",
      "Evaluated inference across vLLM, SGLang and TensorRT-LLM, isolated KV-cache memory limits under load, and cut time-to-first-token spikes by tuning request concurrency.",
    ],
    rows: [
      ["Decode latency", "14–15 ms/token"],
      ["Batch vector search", "22× faster than CPU"],
      ["Runtimes", "vLLM, SGLang, TensorRT-LLM"],
      ["Platforms", "CUDA, ROCm/HIP"],
    ],
    link: { href: "/study", label: "Read the internship study" },
  },
  {
    company: "TruckHai",
    role: "Backend Intern",
    dates: "Jan – Apr 2026",
    icon: "truck",
    points: [
      "Built Go (Gin, GORM) REST microservices for fleet dispatch, modelling the trip lifecycle as a finite-state machine with ACID transactions so invalid transitions are rejected and concurrent updates stay consistent.",
      "Removed race conditions and row-lock contention in PostgreSQL with composite indexes and query-plan tuning, and added RBAC middleware with audit-logged admin impersonation.",
    ],
    rows: [
      ["Stack", "Go, Gin, GORM, PostgreSQL"],
      ["Trip lifecycle", "Finite-state machine"],
      ["User roles", "5+ with RBAC"],
    ],
  },
];

export const projects: {
  slug: string;
  name: string;
  kind: string;
  icon: IconName;
  metric: string;
  metricNote: string;
  stack: string;
  points: string[];
  repo: string;
  live?: string;
}[] = [
  {
    slug: "zaiguard",
    name: "ZaiGuard",
    kind: "Surveillance system",
    icon: "scan",
    metric: "65–90%",
    metricNote: "fewer false alarms, sub-second",
    stack: "FastAPI, PostgreSQL, Qdrant, Redis, YOLO, ByteTrack, Flower",
    points: [
      "Edge node reads RTSP, HTTP or USB feeds with motion-gated sampling into YOLO26s/YOLO11s on ONNX (96.5% precision) and ByteTrack.",
      "Classifiers flag after-hours access, and dog attacks from lunge acceleration, thrashing and proximity, scored 0–100.",
      "Five-layer FastAPI alert engine (below); a transactional outbox keeps PostgreSQL and Qdrant consistent. 101 automated tests across three services.",
    ],
    repo: "github.com/Shikhar1808/Zaiguard-Connected",
  },
  {
    slug: "relay",
    name: "Relay",
    kind: "MCP gateway on Kubernetes",
    icon: "network",
    metric: "1 endpoint",
    metricNote: "for every MCP server, every call audited",
    stack: "Python, FastAPI, MCP SDK, LangGraph, Next.js, PostgreSQL, Redis, Kubernetes, Helm",
    points: [
      "One Streamable HTTP endpoint for every MCP server: server-prefixed tool names, timeouts, and a dead server left out instead of failing the rest.",
      "Three MCP servers built from scratch, and a LangGraph chat agent that acts as the signed-in user and asks before any write.",
      "Two Helm charts; only the gateway can reach the servers. Hashed keys, AES-256-GCM credentials, hash-chained audit log.",
    ],
    repo: "github.com/Shikhar1808/Relay",
  },
  {
    slug: "zenith",
    name: "Zenith",
    kind: "Competition platform",
    icon: "pulse",
    metric: "< 100 ms",
    metricNote: "responses at 1000+ concurrent users",
    stack: "Node.js, Express, MongoDB, JWT, NGINX, AWS",
    points: [
      "Real-time leaderboard calculation and stateless JWT auth to keep the database out of the way during submission spikes.",
      "Cloudflare DDoS mitigation plus NGINX reverse-proxy rate limiting and load balancing.",
    ],
    repo: "github.com/Shikhar1808/ZenithCryptic",
  },
];

// ZaiGuard's alert engine, in the order every event passes through it (from the repo README).
export const pipeline: { step: string; name: string; tech: string; note: string; icon: IconName }[] = [
  { step: "1", name: "Sensitivity gate", tech: "Time and zone rules", note: "Drops detections below a threshold adjusted for the hour and the zone.", icon: "gauge" },
  { step: "2", name: "Enrichment", tech: "Metadata", note: "Attaches camera, zone and a readable description to each event.", icon: "tag" },
  { step: "3", name: "Burst de-duplication", tech: "Redis", note: "Merges repeats of an active incident; re-alerts only on a confidence jump.", icon: "layers" },
  { step: "4a", name: "Rule suppression", tech: "PostgreSQL", note: "Silences anything that matches an operator's suppression rule.", icon: "filter" },
  { step: "4b", name: "Semantic suppression", tech: "Qdrant", note: "Silences events too similar to an alert someone already dismissed.", icon: "sparkles" },
  { step: "5", name: "Priority tiering", tech: "Outbox worker", note: "Grades what survives as critical, high or medium, then publishes it.", icon: "shield" },
];

// Relay's gateway, in the order every tool call passes through it (gateway/app/tools.py in the repo).
export const relayPipeline: typeof pipeline = [
  { step: "1", name: "Key check", tech: "SHA-256", note: "Resolves the API key to a user and their stores; unknown or revoked keys stop here.", icon: "shield" },
  { step: "2", name: "Rate limit", tech: "Redis", note: "A token bucket per user: a burst of 120 calls, then 2 more each second.", icon: "gauge" },
  { step: "3", name: "Audit gate", tech: "Audit log", note: "No call runs while the audit log can't record it.", icon: "filter" },
  { step: "4", name: "Routing", tech: "Server prefix", note: "The prefix picks the server; another store's server answers as an unknown tool.", icon: "network" },
  { step: "5", name: "Upstream call", tech: "AES-256-GCM", note: "Adds the server's decrypted credential, never shown to the caller, and gives up after 30 s.", icon: "pulse" },
  { step: "6", name: "Audit record", tech: "Hash chain", note: "Who, which server and tool, how long and the outcome, chained so an edit shows.", icon: "book" },
];

export const more: { name: string; stack: string; note: string; repo: string; icon: IconName }[] = [
  {
    name: "CivicSentinel",
    stack: "MERN, Solidity, LangChain",
    note: "HackMol 6.0: a voice note, SMS or web form turned into a validated police report (FIR) by GPT-4, with evidence hashes anchored on Ethereum and IPFS.",
    repo: "github.com/Shikhar1808/HackMol-6.0",
    icon: "shield",
  },
  {
    name: "Federated learning hub",
    stack: "Flower, PyTorch",
    note: "FedAvg and FedProx on a real SuperLink and SuperNodes across laptops, with non-IID data partitioning.",
    repo: "github.com/Shikhar1808/FL-Project",
    icon: "network",
  },
  {
    name: "Jetson multi-camera surveillance",
    stack: "Jetson Nano, PyTorch, FFmpeg, Docker",
    note: "Four camera feeds with detection, SORT tracking, snapshot alerts with cooldown, and FFmpeg grid recording.",
    repo: "github.com/Shikhar1808/magneton-demo",
    icon: "video",
  },
  {
    name: "PokeCNN",
    stack: "Next.js, FastAPI, PyTorch, ONNX",
    note: "A Pokémon-themed playground: snap together conv, activation, batch-norm and dropout blocks, and the backend builds, trains and exports the model.",
    repo: "github.com/Shikhar1808/PokeCNN",
    icon: "layers",
  },
  {
    name: "BISWISE",
    stack: "React, Kaboom.js, Tiled",
    note: "A retro pixel-art game that teaches BIS quality standards through quests, quizzes and a leaderboard.",
    repo: "github.com/Shikhar1808/BISWISE",
    icon: "gamepad",
  },
  {
    name: "Token launchpad",
    stack: "Solidity, OpenZeppelin, Hardhat",
    note: "Create ERC20 tokens, price them in ETH and trade them, with reentrancy-guarded buy, sell and withdraw, tested in Hardhat.",
    repo: "github.com/Shikhar1808/LaunchPad-Smart-Contract",
    icon: "coins",
  },
  {
    name: "GitHub Discord bot",
    stack: "Discord.js, GitHub API",
    note: "Commands that pull a GitHub profile, a repository or a user's full repo list into Discord.",
    repo: "github.com/Shikhar1808/GithubAPI-DCBot",
    icon: "bot",
  },
  {
    name: "BlogWebApp",
    stack: "Express, MongoDB, JWT, Multer",
    note: "A blog with cookie-based JWT sign-in, image uploads and server-rendered pages.",
    repo: "github.com/Shikhar1808/BlogWebApp",
    icon: "book",
  },
  {
    name: "Contacts manager",
    stack: "Express, MongoDB, JWT, bcrypt",
    note: "A REST API where each signed-in user manages only their own contacts.",
    repo: "github.com/Shikhar1808/Contacts_Manager",
    icon: "shield",
  },
  {
    name: "Slack clone",
    stack: "Socket.io, Express",
    note: "Real-time chat organised into Socket.io namespaces and rooms.",
    repo: "github.com/Shikhar1808/slack-clone",
    icon: "message",
  },
  {
    name: "SlowBro",
    stack: "Express 5, MySQL, Oracle",
    note: "REST API for a course platform: users, courses, course content and enrolments, built from an ER design.",
    repo: "github.com/Shikhar1808/SlowBro",
    icon: "tag",
  },
];

// Voxomos internship study. LLM numbers: TinyLlama-1.1B-Chat on one RTX 3050 6 GB (bf16, single GPU).
export const study = {
  llmFindings: [
    { label: "Decode floor", value: "13.7 ms", note: "per token at no load; vLLM and SGLang hit 15.1. The GPU sets the floor, not the engine." },
    { label: "Admission control", value: "1.2 s", note: "to first token with 32 requests in flight, against 25–76 s uncapped." },
    { label: "Prefix caching", value: "2.8×", note: "more vLLM requests per second when prompts share a 500-token prefix." },
    { label: "Energy per token", value: "44×", note: "TensorRT-LLM tokens per watt at batch 768 against batch 1." },
  ],
  setup: [
    ["GPU", "RTX 3050 Laptop, 6 GB (5.67 GB usable)"],
    ["Model", "TinyLlama-1.1B-Chat, bf16"],
    ["Parallelism", "One GPU, no tensor or pipeline split"],
    ["Load tools", "vllm bench serve, sglang.bench_serving, trtllm-bench"],
    ["Workloads", "ShareGPT, shared-prefix and fixed-length prompts"],
  ] as Row[],
  // Full results per engine (TTFT = time to first token, TPOT = time per output token).
  runs: [
    {
      engine: "vLLM",
      tool: "vllm bench serve",
      note: "Throughput kept climbing as the arrival rate rose to 32 req/s, while time to first token stayed under 80 ms. Its best run came from automatic prefix caching, on prompts that shared a 500-token prefix.",
      cols: ["Workload", "Arrival", "Requests", "Req/s", "Output tok/s", "Mean TTFT", "Mean TPOT"],
      rows: [
        ["ShareGPT", "All at once", "100", "7.47", "659", "2,248 ms", "85.3 ms"],
        ["ShareGPT", "1 req/s", "1,000", "1.00", "94", "71 ms", "15.1 ms"],
        ["ShareGPT", "4 req/s", "250", "3.42", "348", "49 ms", "15.5 ms"],
        ["ShareGPT", "8 req/s", "250", "5.73", "585", "55 ms", "16.9 ms"],
        ["ShareGPT", "32 req/s", "250", "11.02", "1,112", "80 ms", "23.7 ms"],
        ["Shared 500-token prefix", "All at once", "100", "20.80", "2,541", "865 ms", "31.5 ms"],
      ],
    },
    {
      engine: "SGLang",
      tool: "sglang.bench_serving",
      note: "With no cap on in-flight requests, throughput flattened near 1.4 req/s while the queue grew, and time to first token reached minutes. Capping it at 32 requests kept similar traffic at about a second.",
      cols: ["Workload", "Arrival", "Requests", "In-flight cap", "Req/s", "Output tok/s", "Mean TTFT", "Mean TPOT"],
      rows: [
        ["Mixed prompts", "All at once", "100", "None", "0.31", "161", "156.8 s", "31.1 ms"],
        ["Shared prefix, 1 group", "All at once", "100", "None", "1.57", "403", "28.3 s", "24.8 ms"],
        ["Shared prefix, 10 groups", "20 req/s", "1,000", "None", "0.80", "204", "591.1 s", "167.1 ms"],
        ["ShareGPT", "1 req/s", "1,000", "32", "0.99", "223", "1.24 s", "15.1 ms"],
        ["ShareGPT", "2 req/s", "250", "None", "1.36", "334", "25.2 s", "19.1 ms"],
        ["ShareGPT", "8 req/s", "250", "None", "1.41", "345", "65.7 s", "23.0 ms"],
        ["ShareGPT", "32 req/s", "250", "None", "1.43", "350", "75.7 s", "24.7 ms"],
      ],
    },
    {
      engine: "TensorRT-LLM",
      tool: "trtllm-bench",
      note: "Its offline bench sizes the batch to whatever fits in KV-cache memory: 768 short requests or 160 long ones. Batch size drove both throughput and tokens per watt. At batch 1 it gave the cleanest latency: 142 ms to first token and 13.7 ms per token.",
      cols: ["Workload", "Batch", "Tokens in / out", "Req/s", "Output tok/s", "GPU power", "Tok/s per watt"],
      rows: [
        ["Short sequences, auto batch", "768", "128 / 128", "23.97", "3,068", "134.7 W", "22.8"],
        ["Long sequences, auto batch", "160", "1,024 / 256", "4.39", "1,125", "74.9 W", "15.0"],
        ["Batch capped, 70% KV memory", "32", "1,024 / 256", "3.31", "849", "139.1 W", "6.1"],
        ["Latency mode", "1", "1,024 / 256", "0.28", "71", "136.3 W", "0.5"],
      ],
    },
  ],
  takeaways: [
    {
      title: "Decode speed is set by the GPU.",
      text: "At no load, all three engines landed between 13.7 and 15.1 ms per token. The engine decides how gracefully a system degrades, not how fast it can go.",
    },
    {
      title: "Reused prefixes are the cheapest throughput.",
      text: "vLLM's automatic prefix caching and SGLang's RadixAttention both posted their best numbers when prompts shared a long prefix.",
    },
    {
      title: "Batch size is bounded by KV-cache memory.",
      text: "TensorRT-LLM's throughput tracked the batch it could fit, and the same knob moved tokens per watt by 44×.",
    },
    {
      title: "Cap what's in flight.",
      text: "Uncapped, SGLang accepted more work than the GPU could serve and requests waited minutes for a first token. A cap of 32 held it near a second.",
    },
    {
      title: "On 6 GB, memory is the bottleneck.",
      text: "Every lever that mattered, from batch size to cache fraction to prefix hits, was a way of rationing the same KV-cache memory.",
    },
  ],
  vector: {
    repo: "https://github.com/Shikhar1808/cuda_hip",
    intro:
      "Cosine similarity is the core operation behind every vector database, and at about 0.25 FLOP per byte it is memory-bound. I wrote the same search five ways and measured where a GPU actually helps.",
    builds: [
      ["CPU", "Scalar, AVX2, and AVX2 + OpenMP"],
      ["CUDA, naive", "One thread per vector pair"],
      ["CUDA, optimized", "Tiled shared memory, cuBLAS and async streams"],
      ["HIP", "A native port with 64-wide wavefronts, plus a HIPIFY-generated version"],
      ["Profiling", "Nsight Systems timelines and Nsight Compute kernel counters"],
    ] as Row[],
    findings: [
      { label: "Batch search, 100k", value: "22×", note: "CUDA against an AVX2 + OpenMP CPU baseline." },
      { label: "Batch search, 1M", value: "16×", note: "the same kernels on a corpus ten times larger." },
      { label: "Single-query crossover", value: "~3,000", note: "dimensions; below it, kernel launch overhead keeps the CPU ahead." },
    ],
    batch: {
      cols: ["Vectors searched", "CPU", "CUDA", "Speedup"],
      rows: [
        ["10,000", "24.7 ms", "1.14 ms", "21.6×"],
        ["100,000", "228.5 ms", "10.4 ms", "22.0×"],
        ["1,000,000", "2,424 ms", "150.6 ms", "16.1×"],
      ],
    },
    single: {
      cols: ["Dimensions", "CPU", "CUDA, atomic", "CUDA, reduction", "Best GPU speedup"],
      rows: [
        ["128", "2.8 µs", "52.1 µs", "47.4 µs", "0.06×"],
        ["256", "4.8 µs", "30.8 µs", "39.6 µs", "0.16×"],
        ["384", "8.3 µs", "35.9 µs", "32.0 µs", "0.26×"],
        ["768", "12.6 µs", "32.7 µs", "32.6 µs", "0.39×"],
        ["1,024", "17.4 µs", "32.4 µs", "31.8 µs", "0.55×"],
        ["1,536", "25.3 µs", "37.2 µs", "34.7 µs", "0.73×"],
        ["3,072", "49.2 µs", "30.8 µs", "33.0 µs", "1.60×"],
        ["4,096", "65.9 µs", "31.6 µs", "43.9 µs", "2.09×"],
      ],
    },
  },
  topics: [
    "FlashAttention v1–v3", "FlashInfer", "PagedAttention and KV-cache sizing", "Continuous batching", "Chunked prefill",
    "Speculative decoding (EAGLE-3)", "Prompt caching", "Model routing", "LLM observability", "Serverless cold starts",
    "Cache-aware routing", "DeepSeek-V3 MoE and DualPipe", "NCCL and RCCL", "ROCm", "SYCL and oneAPI", "Roofline model",
  ],
};

// Medium posts. Add one entry per post; the Writing section and its nav link appear once this list isn't empty.
// Example: { title: "Why decode speed doesn't depend on your serving engine", date: "Nov 2026", url: "https://medium.com/@you/...", summary: "One line on what the post covers." }
export const posts: { title: string; date: string; url: string; summary: string }[] = [];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C++", "C", "Go", "Python", "JavaScript", "TypeScript", "SQL", "Solidity"] },
  {
    group: "Backend & DevOps",
    items: [
      "Go", "Gin", "GORM", "FastAPI", "Microservices", "REST APIs", "RBAC", "PostgreSQL", "MySQL", "Redis",
      "Docker", "Kubernetes", "Helm", "Linux", "GitHub Actions", "NGINX", "Prometheus", "Grafana", "Loki", "AWS",
    ],
  },
  {
    group: "AI & GPU",
    items: [
      "PyTorch", "CUDA", "AMD ROCm/HIP", "Nsight", "vLLM", "SGLang", "TensorRT-LLM", "ONNX Runtime", "YOLO",
      "ByteTrack", "OpenCV", "LangChain", "LangGraph", "MCP", "FAISS", "Qdrant", "Flower", "Jetson",
    ],
  },
  {
    group: "Web (MERN)",
    items: [
      "MongoDB", "Mongoose", "Express", "React", "Node.js", "Next.js", "Tailwind CSS", "TanStack Query",
      "React Hook Form", "Zod", "Socket.io", "JWT", "Discord.js", "Hardhat", "OpenZeppelin",
    ],
  },
];

export const record: { what: string; where: string; result: string; when: string }[] = [
  {
    what: "B.E. Computer Science and Engineering",
    where: "Thapar Institute of Engineering and Technology, Patiala",
    result: "CGPA 8.59 / 10",
    when: "2023 – 2027",
  },
  { what: "Class 12 and Class 10", where: "Army Public School, Bareilly", result: "92.4% and 93%", when: "2023" },
  { what: "SPHNIX'24 Hackathon", where: "MNIT Jaipur", result: "1st runner-up", when: "Nov 2024" },
  {
    what: "NVIDIA certifications",
    where: "Accelerated Computing (Modern CUDA C++, CUDA Python), AI on Jetson Nano, Generative AI & Deep Learning",
    result: "Certified",
    when: "2025 – 2026",
  },
  { what: "LeetCode", where: "Arrays, graphs, DP, trees, heaps", result: "417+ solved, 1551 rating", when: "Ongoing" },
];

// Project pages (/projects/<slug>). Facts come from the resume, each repo's README and code, and the ZaiGuard dashboard.
type ProjectPage = {
  team: string;
  title: string;
  sub: string;
  problem: string;
  highlights: { label: string; value: string; note: string }[];
  flowTitle: string;
  flow: { title: string; text: string }[];
  stack: { group: string; items: Row[] }[];
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
  mine: string[];
};

export const projectPages: Record<string, ProjectPage> = {
  zaiguard: {
    team: "Capstone project, team of five",
    title: "ZaiGuard",
    sub: "A surveillance system that understands what its cameras see, filters out what doesn't matter, and learns from every operator decision.",
    problem:
      "A camera that cries wolf is worse than no camera at all. Most alerts from a raw detector are repeats, known-harmless activity, or near-copies of something an operator already dismissed. ZaiGuard sits between the cameras and the operator and decides which events deserve a human.",
    highlights: [
      { label: "False alarms cut", value: "65–90%", note: "in testing, at sub-second latency." },
      { label: "Detection precision", value: "96.5%", note: "YOLO on ONNX with ByteTrack." },
      { label: "Automated tests", value: "101", note: "44 edge, 51 alert engine, 6 federated learning." },
      { label: "Threat types", value: "4", note: "after-hours access and dog attack run at the edge today." },
    ],
    flowTitle: "From camera to operator.",
    flow: [
      {
        title: "Detect at the edge",
        text: "Each feed (RTSP, HTTP, USB or a file, with automatic fallback) is sampled only when something moves, run through YOLO26s or YOLO11s on ONNX Runtime, and tracked with ByteTrack so every person and dog keeps an ID.",
      },
      {
        title: "Classify behaviour",
        text: "Classifiers turn tracks into events: a person on a camera outside its allowed hours, or a dog whose acceleration surges, thrashes, or closes in on a person, scored from 0 to 100.",
      },
      {
        title: "Filter centrally",
        text: "Candidates pass a five-layer FastAPI engine: sensitivity gate, enrichment, Redis de-duplication, PostgreSQL rule and Qdrant semantic suppression, then priority tiering. A transactional outbox keeps PostgreSQL and Qdrant in step.",
      },
      {
        title: "Review",
        text: "Operators see alerts, live camera status, analytics and system health on a Next.js dashboard, and confirm or dismiss each alert.",
      },
      {
        title: "Learn",
        text: "Every dismissal becomes a suppression signal. Edge nodes also improve a shared threat model with Flower federated learning: only model weights travel, never video.",
      },
    ],
    stack: [
      {
        group: "Edge vision",
        items: [
          ["YOLO26s, YOLO11s", "Person and dog detection, fine-tuned"],
          ["ONNX Runtime", "Inference on CUDA with a CPU fallback"],
          ["ByteTrack", "Persistent IDs across frames"],
          ["OpenCV", "Capture, motion gating and the live preview overlay"],
        ],
      },
      {
        group: "Alert engine",
        items: [
          ["FastAPI", "The five-layer middleware and its API"],
          ["Redis", "TTL windows for burst de-duplication"],
          ["PostgreSQL (TimescaleDB)", "Alerts, suppression rules and the outbox"],
          ["Qdrant", "HNSW vector search for semantic suppression"],
        ],
      },
      {
        group: "Learning",
        items: [
          ["Flower", "Cross-device federated averaging across LAN SuperNodes"],
          ["PyTorch", "Local training on each node"],
        ],
      },
      {
        group: "Dashboard and tooling",
        items: [
          ["Next.js, ECharts", "The operator dashboard and its charts"],
          ["Docker Compose", "PostgreSQL, Redis and Qdrant for local runs"],
          ["uv, pytest", "Python environments and the 101-test suite"],
        ],
      },
    ],
    gallery: [
      {
        src: "/projects/zaiguard/overview.webp",
        alt: "ZaiGuard dashboard overview with alert counts and camera status",
        caption: "Overview: what's waiting for review, open criticals and camera health.",
        width: 1588,
        height: 784,
      },
      {
        src: "/projects/zaiguard/cameras.webp",
        alt: "ZaiGuard cameras page with three camera tiles and 24-hour access bars",
        caption: "Cameras: each feed with its access schedule across the day.",
        width: 1588,
        height: 768,
      },
      {
        src: "/projects/zaiguard/analytics.webp",
        alt: "ZaiGuard analytics page with events processed, noise filtered and precision",
        caption: "Analytics: how much the cameras saw and how much the engine filtered.",
        width: 1588,
        height: 768,
      },
      {
        src: "/projects/zaiguard/system.webp",
        alt: "ZaiGuard system health page in dark mode",
        caption: "System: health of every service behind the dashboard, in dark mode.",
        width: 1600,
        height: 799,
      },
    ],
    mine: [
      "Built the five-layer FastAPI middleware (Redis TTL sliding windows, PostgreSQL B-trees, Qdrant HNSW vector suppression) that cut false-positive alarms by 65–90% in testing at sub-second latency.",
      "Used a transactional outbox worker to prevent PostgreSQL/Qdrant dual-write inconsistencies, and coordinated cross-device Flower federated learning across LAN SuperNodes.",
      "Built edge video ingestion with motion-gated frame sampling and an RTSP/HTTP/USB fallback chain, feeding an ONNX-accelerated YOLO detector (96.5% precision) with ByteTrack.",
    ],
  },
  relay: {
    team: "Solo project",
    title: "Relay",
    sub: "A team MCP gateway on Kubernetes: one endpoint where every teammate reaches every tool server with their own key, while the credentials stay on the server and every call is written down.",
    problem:
      "MCP lets an AI client call tools, but each client connects to each server itself and holds its credentials. For a team that means shared secrets on every laptop and no record of who did what. With Relay an admin registers each server once, members connect with a personal key, and the gateway routes every call, keeps the credentials and records it. The first servers run a WooCommerce store.",
    highlights: [
      { label: "MCP servers", value: "3", note: "WooCommerce, order risk and fulfilment, written from scratch." },
      { label: "Tools, one endpoint", value: "11", note: "listed from every enabled server, prefixed by server." },
      { label: "Automated tests", value: "464", note: "across five services, plus two end-to-end suites." },
      { label: "Helm charts", value: "2", note: "the platform and a store, with local and production values." },
    ],
    flowTitle: "From client to store and back.",
    flow: [
      {
        title: "Connect",
        text: "A teammate adds one URL and their own API key to Claude Code or Cursor, or asks the chat agent in the dashboard, which calls the same gateway as the signed-in user and asks before any tool that changes the store.",
      },
      {
        title: "Check the key",
        text: "The gateway looks the key up (stored as a SHA-256 hash), learns which stores its owner may use, and refuses unknown or revoked keys before anything else runs.",
      },
      {
        title: "List the tools",
        text: "Listing fans out to every enabled server at once with a 5-second timeout and prefixes each tool with its server's name, so two servers can share a tool name. A dead server is left out, not fatal.",
      },
      {
        title: "Route the call",
        text: "A call goes to the server its prefix names. The server's credential is decrypted (AES-256-GCM) and attached on the way out, so the caller never sees it, and a 30-second timeout turns a hung server into a clear error.",
      },
      {
        title: "Record it",
        text: "Every call lands in an append-only, hash-chained audit log with the user, server, tool, duration and outcome, and the dashboard can check that the chain is unbroken.",
      },
    ],
    stack: [
      {
        group: "Gateway and backend",
        items: [
          ["Python, FastAPI", "The platform API: sign-in, team, keys, servers and audit"],
          ["MCP Python SDK", "The gateway's Streamable HTTP endpoint and its upstream clients"],
          ["PostgreSQL, SQLAlchemy, Alembic", "Users, hashed keys, encrypted credentials and the audit log"],
          ["Redis", "Token-bucket rate limits, revoked sessions and server health"],
        ],
      },
      {
        group: "Chat agent",
        items: [
          ["LangGraph", "The tool loop, with its state saved in PostgreSQL"],
          ["Groq, gpt-oss-20b", "The model, through an OpenAI-compatible API"],
        ],
      },
      {
        group: "Tool servers",
        items: [
          ["WooCommerce MCP", "Seven product and order tools over the store's REST API"],
          ["Risk check", "Scores orders against five fixed rules"],
          ["Fulfilment", "Packing, shipping and delivery records in PostgreSQL"],
        ],
      },
      {
        group: "Platform",
        items: [
          ["Kubernetes, k3d", "Every service in the cluster, with probes, limits and Secrets"],
          ["Helm", "Two charts; local and production differ only in values"],
          ["NetworkPolicies", "Only the gateway can reach the tool servers"],
          ["Traefik", "Ingress for the dashboard, API, gateway and storefront"],
          ["Next.js", "The dashboard"],
        ],
      },
    ],
    mine: [
      "Built the MCP gateway: concurrent tool listing across servers with server-prefixed names, routing with per-call timeouts, and failure isolation so one dead server never breaks the others.",
      "Wrote three MCP servers (WooCommerce with seven tools, order risk, fulfilment) and a LangGraph chat agent that acts as the signed-in user and confirms before any write.",
      "Secured it end to end: hashed API keys, AES-256-GCM upstream credentials, HttpOnly cookie sessions, Redis rate limits and a tamper-evident audit log.",
      "Packaged it as two Helm charts with probes, resource limits, Secrets and NetworkPolicies, and covered it with 464 automated tests and two end-to-end suites.",
    ],
  },
  zenith: {
    team: "Team project",
    title: "Zenith",
    sub: "A team-based online cryptic hunt: twenty levels of image, audio and text clues, a live leaderboard, and a server built for everyone submitting at once.",
    problem:
      "In a hunt, every team hits the server at the same moments: the start, each new level and the final minutes. The platform had to stay fast through those spikes, keep the leaderboard honest, and shrug off anyone trying to brute-force answers.",
    highlights: [
      { label: "Concurrent users", value: "1000+", note: "during live competition." },
      { label: "Response time", value: "< 100 ms", note: "through submission spikes." },
      { label: "Levels", value: "20", note: "image, audio and text clues." },
      { label: "Rate limit", value: "50/min", note: "requests per IP, on top of NGINX limits." },
    ],
    flowTitle: "From sign-up to leaderboard.",
    flow: [
      {
        title: "Register",
        text: "Teams sign up with a leader and members. Zod validates every payload and passwords are hashed with bcrypt.",
      },
      {
        title: "Sign in",
        text: "A short-lived JWT access token and a seven-day refresh token live in cookies, so the API stays stateless and needs no session lookups.",
      },
      {
        title: "Solve",
        text: "Levels unlock in order. Each answer is checked on the server, and the time taken on every level is recorded against the team.",
      },
      {
        title: "Rank",
        text: "The leaderboard is calculated from levels solved and time taken, and shown as a progress graph per team.",
      },
      {
        title: "Hold the line",
        text: "Cloudflare absorbs DDoS traffic, NGINX rate-limits and load-balances in front of Node, and the app caps each IP at 50 requests a minute.",
      },
    ],
    stack: [
      {
        group: "Backend",
        items: [
          ["Node.js, Express", "Routes for auth, levels and the leaderboard"],
          ["MongoDB, Mongoose", "Teams, users and per-level timing"],
          ["JWT, bcrypt", "Stateless sign-in with access and refresh tokens"],
          ["Zod", "Validating sign-ups and answers"],
          ["Helmet, express-rate-limit", "Headers and per-IP limits"],
          ["Nodemailer", "Account emails"],
        ],
      },
      {
        group: "Frontend",
        items: [
          ["HTML, CSS, JavaScript", "Hunt, leaderboard and team pages"],
          ["three.js", "A 3D model with ASCII and glitch effects on the home page"],
        ],
      },
      {
        group: "Infrastructure",
        items: [
          ["NGINX", "Reverse proxy, rate limiting and load balancing"],
          ["Cloudflare", "DDoS mitigation"],
          ["AWS", "Hosting"],
        ],
      },
    ],
    mine: [
      "Built a competition platform serving 1000+ concurrent users at sub-100 ms response times, with real-time leaderboard calculation and stateless JWT auth to keep the database out of the way during submission spikes.",
      "Secured the deployment with Cloudflare DDoS mitigation and NGINX reverse-proxy rate limiting and load balancing.",
    ],
  },
};
