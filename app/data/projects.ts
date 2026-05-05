import type { ProjectData } from "../components/ProjectModal";

export const projects: ProjectData[] = [
  {
    title: "Faculty Meeting AI Scheduler",
    tech: "Next.js · n8n",
    description:
      "An intelligent booking system that automates faculty meeting scheduling for a school. Teachers input availability; the system resolves conflicts and books rooms via n8n workflows. Built to replace a manual process that ate hours every week.",
    role: "Full-stack. Designed the scheduling algorithm, built the Next.js frontend, and wired n8n webhooks for calendar automation.",
    visual: "gantt",
    stack: ["Next.js", "n8n", "Google Calendar API", "PostgreSQL", "Prisma"],
  },
  {
    title: "Resort Management Platform",
    tech: "Django · React",
    description:
      "End-to-end management system for a resort: front-desk check-in, room inventory, billing, and housekeeping coordination. The backend handles concurrent bookings with transactional integrity; the React frontend keeps staff moving fast.",
    role: "Backend-heavy. Designed the data model, wrote the API in Django REST Framework, and built the React UI for staff workflows.",
    visual: "grid",
    stack: ["Django", "DRF", "React", "PostgreSQL", "Redis", "Docker"],
  },
  {
    title: "Filipino Speech Coach",
    tech: "Whisper · FastAPI · React",
    description:
      "A speech training app that uses OpenAI Whisper to transcribe spoken Filipino, scores pronunciation accuracy, and gives real-time feedback. Built to help learners practice tonal nuances that traditional language apps miss.",
    role: "AI integration. Connected Whisper via FastAPI, designed the scoring pipeline, and built the practice interface in React.",
    visual: "wave",
    stack: ["FastAPI", "Whisper", "React", "PostgreSQL", "Celery", "Docker"],
  },
];
