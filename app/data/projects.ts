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
    role: "Full-stack developer. Designed the conflict-resolution algorithm, built the Next.js UI with server actions, and wired n8n workflows for Google Calendar integration.",
    stack: ["Next.js", "n8n", "Google Calendar API", "PostgreSQL", "Prisma"],
    visual: "gantt",
  },
  {
    title: "Resort Management Platform",
    tech: "Django · React",
    label: "Full-Stack",
    date: "March 2024",
    description:
      "A management system handling the full resort workflow. The Django backend manages concurrent bookings with transactional integrity, room inventory, billing, and housekeeping assignments. The React frontend provides staff with fast, keyboard-driven workflows for front-desk operations.",
    shortDescription:"End-to-end resort management system that streamline resort processes.",
    role: "Backend developer. Designed the relational data model, built REST APIs with Django REST Framework, handled concurrent booking logic, and built the React staff interface.",
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
    role: "AI integration engineer. Built the FastAPI pipeline connecting Whisper inference to the scoring engine, designed the feedback model, and built the React practice interface with waveform visualization.",
    stack: ["FastAPI", "Whisper", "React", "PostgreSQL", "Celery", "Docker"],
    visual: "wave",
  },
];