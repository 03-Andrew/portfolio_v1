import type { ProjectData } from "../components/ProjectModal";

export const projects: ProjectData[] = [
  {
    title: "Faculty Meeting AI Scheduler",
    tech: "Next.js · n8n",
    label: "AI Automation",
    date: "October 2025",
    description:
      "An intelligent booking system for a school's faculty. Teachers submit availability through a Next.js frontend; a scheduling algorithm resolves conflicts and triggers n8n webhooks to book rooms and send calendar invites. Replaced a manual process that consumed several hours per week across the faculty.",
    shortDescription:"AI scheduler for faculty meetings.",
    role: "Full-stack dev",
    findings: [
      "Built a scheduling flow that resolves conflicts from teacher availability.",
      "Connected room booking and calendar invites through n8n webhooks.",
      "Reduced recurring manual coordination across faculty meetings.",
    ],
    stack: ["Next.js", "n8n", "Google Calendar API", "PostgreSQL", "Prisma"],
    visual: "gantt",
    links: {code:"code", video:"video"},
    
  },
  {
    title: "Resort Management Platform",
    tech: "Django · React",
    label: "Full-Stack",
    date: "March 2024",
    description:
      "A management system handling the full resort workflow. The Django backend manages concurrent bookings with transactional integrity, room inventory, billing, and housekeeping assignments. The React frontend provides staff with fast, keyboard-driven workflows for front-desk operations.",
    shortDescription:"End-to-end resort management system that streamline resort processes.",
    role: "Backend dev",
    findings: [
      "Modeled rooms, bookings, billing, and housekeeping around staff workflows.",
      "Handled concurrent reservations with transactional booking logic.",
      "Built front-desk screens for faster day-to-day resort operations.",
    ],
    stack: ["Django", "DRF", "React", "PostgreSQL", "Redis", "Docker"],
    visual: "grid",
  },
  {
    title: "Filipino Speech Coach",
    tech: "Whisper · FastAPI · React",
    label: "AI Integration",
    date: "July 2025",
    description:
      "A speech training application that uses OpenAI Whisper for Filipino speech-to-text, then scores pronunciation accuracy against native speaker models. Real-time feedback helps learners master tonal nuances that traditional language apps don't catch. The FastAPI pipeline processes audio, runs scoring algorithms, and returns detailed feedback in under 2 seconds.",
    shortDescription:"AI-powered speech coach for Filipino language learners.",
    role: "AI integration engineer",
    findings: [
      "Connected Whisper transcription to a pronunciation scoring pipeline.",
      "Returned actionable learner feedback from audio processing in under 2 seconds.",
      "Designed waveform practice UI around repeated speech attempts.",
    ],
    stack: ["FastAPI", "Whisper", "React", "PostgreSQL", "Celery", "Docker"],
    visual: "wave",
  },
];
