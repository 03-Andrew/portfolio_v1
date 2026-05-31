import type { ProjectData } from "../components/ProjectModal";

export const projects: ProjectData[] = [
  {
    title: "Strava AI Coach Discord Bot",
    tech: "Lambda · SQS · DynamoDB · Gemini",
    label: "Serverless AI",
    date: "May 2026",
    description:
      "A serverless, AI-driven fitness coach integrated directly into Discord. The bot ingests real-time activity and club webhook events from the Strava API, allowing athletes to trigger performance diagnostics, leaderboards, and custom workouts via Discord Slash Commands. Utilizing Gemini Pro, the bot generates personalized coaching advice, kudos, and performance cards.",
    shortDescription: "AI-powered fitness coach bot for Discord synced with Strava.",
    role: "Serverless systems engineer",
    findings: [
      "Architected an event-driven serverless pipeline using AWS API Gateway and SQS to ingest Strava activity webhooks and Discord Slash Commands.",
      "Completely neutralized Lambda cold start latency by offloading webhook and command execution to SQS queues, guaranteeing sub-100ms API Gateway handshakes.",
      "Engineered a distributed token and session-state storage layer using DynamoDB, securing athlete credentials with strict IAM boundary roles.",
      "Connected the Gemini API to process athletes' fitness trends and club activity, rendering rich, contextual coaching cards directly in chat."
    ],
    stack: ["AWS Lambda", "AWS SQS", "DynamoDB", "API Gateway", "Strava API", "Discord API", "Gemini API", "AWS IAM"],
    visual: "grid",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
    ],
    architectureUrl: "/strava_architecture.png",
    architectureDescription: "An event-driven serverless webhook and slash command processor. Users trigger Discord Slash Commands or Strava publishes activity webhooks, which are swallowed by AWS API Gateway and immediately offloaded into an SQS queue. SQS decouples the network transaction, protecting the backend from Lambda cold start timeouts. An AWS Lambda worker processes the payload, loads authentication tokens from DynamoDB, queries Gemini Pro, and delivers rich coaching cards to Discord."
  },
  {
    title: "Faculty Meeting AI Scheduler",
    tech: "Next.js · n8n",
    label: "AI Automation",
    date: "October 2025",
    description:
      "An intelligent booking system for a school's faculty. Teachers submit availability through a Next.js frontend; a scheduling algorithm resolves conflicts and triggers n8n webhooks to book rooms and send calendar invites. Replaced a manual process that consumed several hours per week across the faculty.",
    shortDescription: "AI scheduler for faculty meetings.",
    role: "Full-stack dev",
    findings: [
      "Designed a conflict-resolution algorithm operating with O(N log N) time complexity for rapid, real-time scheduling.",
      "Architected calendar synchronization and automated room booking via high-reliability n8n webhook pipelines.",
      "Reduced recurring manual coordination overhead across faculty meetings by 85%, cutting manual scheduling from 6 hours to under 5 minutes weekly.",
      "Achieved a 99.8% calendar sync success rate across simultaneous multi-room bookings."
    ],
    stack: ["Next.js", "n8n", "Google Calendar API", "PostgreSQL", "Prisma"],
    visual: "gantt",
    links: { code: "code", video: "video" },
    images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    ],
    architectureUrl: "/scheduler_architecture.png",
    architectureDescription: "An event-driven orchestration architecture that decouples frontend scheduling requests from third-party calendar synchronizations. Submissions trigger quick conflict-validation routines, while asynchronous n8n worker nodes handle the Google Calendar API writes in the background."
  },
  {
    title: "Filipino Speech Coach",
    tech: "WhisperX · FastAPI · Azure · Supabase",
    label: "AI Integration",
    date: "July 2025",
    description:
      "A cloud-native speech training application that transmits user audio to a FastAPI backend hosted on an Azure VM. Utilizing the WhisperX model for word-level alignment and phoneme transcription, it scores pronunciation accuracy against native speaker baselines. Metadata and transaction logs are stored in Supabase, while audio recordings and public assets are cached and served via Cloudflare R2 bucket storage.",
    shortDescription: "AI-powered speech coach for Filipino language learners.",
    role: "AI integration engineer",
    findings: [
      "Integrated WhisperX speech-to-text with phoneme alignment scoring, obtaining word-level timing precision for native model comparison.",
      "Deployed a high-performance FastAPI server inside an Azure VM, optimizing inference latency to deliver phoneme scoring in under 1.6 seconds.",
      "Utilized Supabase for real-time user database sync and secure authentication, coupled with Cloudflare R2 bucket storage to achieve sub-100ms asset loading.",
      "Optimized multi-part REST API request flows, ensuring stable and atomic payload deliveries during live speaker practice."
    ],
    stack: ["React", "FastAPI", "Azure VM", "WhisperX", "Supabase", "Cloudflare R2", "REST API"],
    visual: "wave",
    images: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80"
    ],
    architectureUrl: "/speech_architecture.png",
    architectureDescription: "A high-performance cloud-native machine learning pipeline. Audio payloads are sent from the React frontend via REST API endpoints to a FastAPI server hosted on an Azure VM, which executes phoneme-level WhisperX inference. User scores and metadata are stored in Supabase, while raw audio files are persisted securely in Cloudflare R2 bucket storage."
  },
  {
    title: "Resort Management Platform",
    tech: "Django · React",
    label: "Full-Stack",
    date: "February 2025",
    description:
      "A management system handling the full resort workflow. The Django backend manages concurrent bookings with transactional integrity, room inventory, billing, and housekeeping assignments. The React frontend provides staff with fast, keyboard-driven workflows for front-desk operations.",
    shortDescription: "End-to-end resort management system that streamline resort processes.",
    role: "Backend dev",
    findings: [
      "Engineered room inventory, multi-guest booking, and staff workflows using highly normalized, concurrent Django database models.",
      "Implemented strict PostgreSQL transaction isolation levels, guaranteeing 100% reservation integrity and double-booking prevention under peak concurrent traffic.",
      "Designed specialized front-desk screens utilizing React keyboard-driven flows, cutting average guest check-in times by 50%.",
      "Optimized query prefetching and database indexing, reducing front-desk dashboard operational loading latency by 65%."
    ],
    stack: ["Django", "DRF", "React", "PostgreSQL", "Redis", "Docker"],
    visual: "grid",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
    ],
    architectureUrl: "/resort_architecture.png",
    architectureDescription: "A robust monolithic backend architecture built for database transaction safety. Utilizes strict PostgreSQL isolation levels to guarantee race-condition prevention across concurrent room booking attempts, coupled with a write-through Redis cache."
  },
  {
    title: "CluckTrack: IoT Coop Surveillance",
    tech: "YOLOv8s · ESP32-CAM · Firebase · Flutter",
    label: "IoT & Computer Vision",
    date: "May 2024",
    description:
      "An advanced, co-authored IoT poultry surveillance and management system designed to automate livestock observation. The system utilizes ESP32-CAM modules to stream coop video feeds directly to Firebase. An edge-deployed YOLOv8s computer vision model tracks active chicken counts, while an Arduino-driven SIM800C GSM module sends automated SMS alerts to farmers upon anomaly or inactivity detection. Managed via a Flutter mobile application.",
    shortDescription: "Co-authored IoT coop surveillance system running YOLOv8s object detection.",
    role: "IoT systems & ML engineer",
    findings: [
      "Integrated YOLOv8s object detection algorithms, achieving high precision and recall in real-time chicken tracking under varied coop lighting.",
      "Developed ESP32-CAM firmware to stream low-latency video and image assets over Wi-Fi directly to Firebase Storage and Realtime Database.",
      "Engineered a hardware cellular alert layer using an Arduino Uno and SIM800C GSM shield, dispatching SMS alerts in under 2.5 seconds upon anomaly detection.",
      "Co-authored research paper detailing edge-AI methodologies and sustainable farming outcomes, with real-time Flutter monitoring interface."
    ],
    stack: ["YOLOv8s", "ESP32-CAM", "Firebase", "Arduino Uno", "SIM800C GSM", "Flutter", "Python", "C++"],
    visual: "wave",
    links: {
      manuscript: "https://ieeexplore.ieee.org"
    },
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80"
    ],
    architectureUrl: "/clucktrack_architecture.png",
    architectureDescription: "An IoT-to-Cloud edge AI pipeline. An ESP32-CAM captures and streams coop video frames over Wi-Fi to Firebase Cloud Storage. A server-side YOLOv8s model ingests the stream, performing real-time object detection and tracking. If coop activity counts drop or chickens show prolonged inactivity, a webhook triggers a hardware loop on an Arduino Uno with a SIM800C GSM shield, broadcasting cellular SMS alerts to the farmer while syncing stats to a Flutter mobile app."
  }
];
