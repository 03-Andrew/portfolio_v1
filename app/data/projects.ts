export interface ProjectData {
  title: string;
  tech: string;
  label: string;
  date: string;
  description: string;
  shortDescription: string;
  role: string;
  findings: string[];
  links?: {
    code?: string;
    video?: string;
    manuscript?: string;
  };
  stack?: string[];
  visual?: "gantt" | "grid" | "wave";
  images?: string[];
  architectureUrl?: string;
  architectureDescription?: string;
  n8nUrl?: string;
  n8nDescription?: string;
  otherImages?: {
    title: string;
    label: string;
    url?: string;
    description: string;
  }[];
  videoEmbedLocation?: "slider" | "dedicated";
  aspectRatio?: "16/10" | "video";
}

export const projects: ProjectData[] = [
  // {
  //   title: "Strava AI Coach Discord Bot",
  //   tech: "Lambda · SQS · DynamoDB · Gemini",
  //   label: "Serverless AI",
  //   date: "May 2026",
  //   description:
  //     "A serverless, AI-driven fitness coach integrated directly into Discord. The bot ingests real-time activity and club webhook events from the Strava API, allowing athletes to trigger performance diagnostics, leaderboards, and custom workouts via Discord Slash Commands. Utilizing Gemini Pro, the bot generates personalized coaching advice, kudos, and performance cards.",
  //   shortDescription: "AI-powered fitness coach bot for Discord synced with Strava.",
  //   role: "Serverless systems engineer",
  //   findings: [
  //     "Architected an event-driven serverless pipeline using AWS API Gateway and SQS to ingest Strava activity webhooks and Discord Slash Commands.",
  //     "Completely neutralized Lambda cold start latency by offloading webhook and command execution to SQS queues, guaranteeing rapid and reliable API Gateway handshakes.",
  //     "Engineered a distributed token and session-state storage layer using DynamoDB, securing athlete credentials with strict IAM boundary roles.",
  //     "Connected the Gemini API to process athletes' fitness trends and club activity, rendering rich, contextual coaching cards directly in chat."
  //   ],
  //   stack: ["AWS Lambda", "AWS SQS", "DynamoDB", "API Gateway", "Strava API", "Discord API", "Gemini API", "AWS IAM"],
  //   visual: "grid",
  //   images: [],
  //   architectureUrl: "/strava_architecture.png",
  //   architectureDescription: "An event-driven serverless webhook and slash command processor. Users trigger Discord Slash Commands or Strava publishes activity webhooks, which are swallowed by AWS API Gateway and immediately offloaded into an SQS queue. SQS decouples the network transaction, protecting the backend from Lambda cold start timeouts. An AWS Lambda worker processes the payload, loads authentication tokens from DynamoDB, queries Gemini Pro, and delivers rich coaching cards to Discord.",
  //   otherImages: [
  //     {
  //       title: "System Architecture",
  //       label: "Infrastructure",
  //       url: "/strava_architecture.png",
  //       description: "An event-driven serverless webhook and slash command processor. Users trigger Discord Slash Commands or Strava publishes activity webhooks, which are swallowed by AWS API Gateway and immediately offloaded into an SQS queue. SQS decouples the network transaction, protecting the backend from Lambda cold start timeouts. An AWS Lambda worker processes the payload, loads authentication tokens from DynamoDB, queries Gemini Pro, and delivers rich coaching cards to Discord."
  //     }
  //   ]
  // },
  {
    title: "Faculty Meeting AI Scheduler",
    tech: "Next.js · n8n",
    label: "AI Automation",
    date: "October 2025",
    description:
      "An AI-powered conversational scheduling platform for academic faculty that merges agentic AI workflow automation with role-aware logic. Built with Next.js and an n8n-orchestrated AI agent connected to a PostgreSQL database, the system leverages Azure OAuth for secure institutional authentication. It autonomously parses user intent via an AI chatbot, resolves scheduling conflicts through an internal algorithmic pipeline, and triggers reliable webhook workflows to automate multi-room bookings and calendar synchronization.",
    shortDescription: "AI scheduler for faculty meetings.",
    role: "Automation dev (Teams of 2)",
    findings: [
      "Connected microsoft oauth to securely authenticate students and faculty with their institutional accounts",
      "Developed a custom AI agent workflow in n8n that autonomously parses natural language scheduling requests, checks for conflicts against a PostgreSQL database, and executes multi-room booking logic with conditional branching.",
    ],
    stack: ["Next.js", "n8n", "PostgreSQL", "Prisma"],
    visual: "gantt",
    links: { code: "https://github.com/LAFruto/MCMeet", video: "https://youtu.be/RmAbrai9WrI" },
    images: [
      "/MCMeet/mockup.webp",
      "/MCMeet/agenda.webp",
      "/MCMeet/cal_day.webp",
      "/MCMeet/cal_month.webp"
    ],
    videoEmbedLocation: "dedicated",
    aspectRatio: "16/10",
    otherImages: [
      {
        title: "System Architecture",
        label: "Infrastructure",
        url: "/MCMeet/Archi.webp",
        description: "An event-driven orchestration architecture that manages an internal, PostgreSQL-backed scheduling system, completely decoupling the frontend from synchronous data operations. Scheduling submissions trigger immediate conflict-validation routines against the database, while asynchronous n8n worker nodes handle and finalize background database writes to update the internal calendar state. Users authenticate via Microsoft OAuth to seamlessly link their school email accounts"
      },
      {
        title: "n8n Integration Flow",
        label: "Workflow Automation",
        url: "/MCMeet/n8n_diagram.webp",
        description: "An automated multi-node scheduling workflow built in n8n. Webhook triggers ingest availability data, route the payload through conditional check loops to resolve scheduling conflicts, write bookings to PostgreSQL."
      }
    ]
  },
  {
    title: "Filipino Speech Coach",
    tech: "WhisperX · FastAPI · Azure · Supabase",
    label: "AI Integration",
    date: "July 2025",
    description:
      "A cloud-native speech training application that transmits user audio to a FastAPI backend hosted on an Azure VM. Utilizing the WhisperX model for character-level alignment and phoneme transcription. Metadata and transaction logs are stored in Supabase, while audio recordings and public assets are cached and served via Cloudflare R2 bucket storage.",
    shortDescription: "AI-powered speech coach for Filipino language learners.",
    role: "Backend and AI integration (Team of 3)",
    findings: [
      "Integrated WhisperX speech-to-text with phoneme alignment scoring, obtaining word-level timing precision for native model comparison.",
      "Deployed a FastAPI server in an Azure VM",
      "Utilized Supabase for real-time user database sync, coupled with Cloudflare R2 bucket storage to achieve fast and responsive asset loading.",
      "Implemented Spaced Repetition scheduling logic to optimize user retention and pronunciation improvement over time"
    ],
    stack: ["React", "FastAPI", "Azure VM", "WhisperX", "Supabase", "Cloudflare R2", "REST API"],
    links: {
      video: "/SpeechCoach/Demo_vid.mp4"
    },
    images: [
      "/SpeechCoach/mockup.webp",
      "/SpeechCoach/mockup2.webp"
    ],
    otherImages: [
      {
        title: "System Architecture",
        label: "Infrastructure",
        url: "",
        description: "A cloud-native machine learning pipeline. Audio payloads are sent from the React frontend via REST API endpoints to a FastAPI server hosted on an Azure VM, which executes phoneme-level WhisperX inference. User scores and metadata are stored in Supabase, while raw audio files are persisted securely in Cloudflare R2 bucket storage."
      }
    ]
  },
  {
    title: "CluckTrack: IoT Coop Surveillance",
    tech: "YOLOv8s · ESP32-CAM · Firebase · Flutter",
    label: "IoT & Computer Vision",
    date: "May 2024",
    description:
      "An automated smart chicken coop monitoring system built to track native chicken activity and alert poultry raisers of potential problems. The system uses a budget-friendly ESP32-CAM module mounted inside the coop to snap photos at regular intervals and send them to a connected laptop. A specialized AI model (YOLOv8s) on the laptop analyzes the images to keep a count of active chickens. If any unusual inactivity or potential threats are detected, the system updates a mobile app and instantly triggers a cellular module to text an emergency alert directly to the farmer's phone.",
    shortDescription: "Co-authored IoT coop surveillance system running YOLOv8s object detection.",
    role: "IOT & AI developer (Team of 3)",
    findings:[
      "Successfully built and trained YOLOv8s model that accurately identified local native chickens with 92.8% precision under normal coop lighting conditions.",
      "Chose an image snapshot polling method instead of video streaming to save device memory, protect the camera from overheating, and ensure reliable data transmission over weak Wi-Fi.",
      "Integrated a backup cellular text alert layer that operates independently of internet access, ensuring farmers receive immediate emergency notifications even during rural network outages.",
      "Co-authored an IEEE-published research paper documenting the system, the creation of the custom chicken image dataset, and its practical benefits for backyard poultry farming."],
    stack: ["YOLOv8s", "ESP32-CAM", "Firebase", "Arduino Uno", "SIM800C GSM", "Flutter", "Python", "C++"],
    visual: "wave",
    links: {
      manuscript: "https://ieeexplore.ieee.org/document/10928195"
    },
    images: [
      "/CluckTrack/main.webp"
    ],
    otherImages: [
      {
        title: "System Architecture",
        label: "Infrastructure",
        url: "/CluckTrack/archi.webp",
        description: "An IoT-to-Cloud edge AI pipeline. An ESP32-CAM captures and streams coop video frames over Wi-Fi to Firebase Cloud Storage. A server-side YOLOv8s model ingests the stream, performing real-time object detection and tracking. If coop activity counts drop or chickens show prolonged inactivity, a serial triggers is sent to an an Arduino Uno with a SIM800C GSM module, broadcasting cellular SMS alerts to the farmer while syncing stats to a Flutter mobile app."
      },
      {
        title: "Circuit Diagram",
        label: "Hardware",
        url: "/CluckTrack/circuit_diagram.webp",
        description: "A detailed schematic of the coop edge devices. An ESP32-CAM functions as the vision hub. The Arduino Uno orchestrates communication and commands, interface connections with the SIM800C GSM module, establishing a secondary cellular SMS signaling network when standard Wi-Fi is lost."
      }
    ]
  },
  {
    title: "Resort Management Platform",
    tech: "Django · React",
    label: "Full-Stack",
    date: "February 2025",
    description:
      "A management system handling the full resort workflow. The Django backend manages concurrent bookings with transactional integrity, room inventory, billing, and housekeeping assignments. The React frontend provides staff with fast, keyboard-driven workflows for front-desk operations.",
    shortDescription: "End-to-end resort management system that streamline resort processes.",
    role: "Fullstack dev (Team of 5)",
    findings: [
      "Designed ER diagrams and implemented a normalized PostgreSQL database schema to manage complex relationships between guests, rooms, bookings, billing, and housekeeping.",
      "Developed RESTful API endpoints in Django to handle resort operations",
      "Deployed the application in digitalocean app platform, utilizing managed PostgreSQL for data persistence and ensuring secure, scalable hosting.",
      "Implemented Django APIs to React frontend"
    ],
    stack: ["Django", "DRF", "React", "PostgreSQL", "Docker"],
    visual: "grid",
    links: {
      video: "https://www.youtube.com/watch?v=nfA3tLsWmW0"
    },
    images: ["/Beach/mockup (3).webp", "/Beach/dashboard.webp", "/Beach/dashboard2.webp"],
    aspectRatio: "video",
    otherImages: [
      {
        title: "System Architecture",
        label: "Infrastructure",
        url: "",
        description: "A secure, decoupled system architecture. The React frontend is hosted on Vercel for rapid delivery, communicating via HTTPS with a monolithic Django backend running on DigitalOcean App Platform. Data persistence is managed on DigitalOcean PostgreSQL with strict isolation levels to guarantee reservation integrity."
      }
    ]
  }
];
