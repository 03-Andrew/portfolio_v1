"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectModal, { type ProjectData } from "../components/ProjectModal";

const allProjects: ProjectData[] = [
  {
    title: "Faculty Meeting AI Scheduler",
    tech: "Next.js · n8n",
    description:
      "An intelligent booking system for a school's faculty. Teachers submit availability through a Next.js frontend; a scheduling algorithm resolves conflicts and triggers n8n webhooks to book rooms and send calendar invites. Replaced a manual process that consumed several hours per week across the faculty.",
    role: "Full-stack developer. Designed the conflict-resolution algorithm, built the Next.js UI with server actions, and wired n8n workflows for Google Calendar integration.",
    stack: ["Next.js", "n8n", "Google Calendar API", "PostgreSQL", "Prisma"],
    visual: "gantt",
  },
  {
    title: "Resort Management Platform",
    tech: "Django · React",
    description:
      "A management system handling the full resort workflow. The Django backend manages concurrent bookings with transactional integrity, room inventory, billing, and housekeeping assignments. The React frontend provides staff with fast, keyboard-driven workflows for front-desk operations.",
    role: "Backend developer. Designed the relational data model, built REST APIs with Django REST Framework, handled concurrent booking logic, and built the React staff interface.",
    stack: ["Django", "DRF", "React", "PostgreSQL", "Redis", "Docker"],
    visual: "grid",
  },
  {
    title: "Filipino Speech Coach",
    tech: "Whisper · FastAPI · React",
    description:
      "A speech training application that uses OpenAI Whisper for Filipino speech-to-text, then scores pronunciation accuracy against native speaker models. Real-time feedback helps learners master tonal nuances that traditional language apps don't catch. The FastAPI pipeline processes audio, runs scoring algorithms, and returns detailed feedback in under 2 seconds.",
    role: "AI integration engineer. Built the FastAPI pipeline connecting Whisper inference to the scoring engine, designed the feedback model, and built the React practice interface with waveform visualization.",
    stack: ["FastAPI", "Whisper", "React", "PostgreSQL", "Celery", "Docker"],
    visual: "wave",
  },
  {
    title: "Inventory Tracking API",
    tech: "Express · MongoDB",
    description:
      "A lightweight inventory tracking system built for a local retail business. Supports barcode scanning, stock level alerts, and CSV export for accounting. Designed to run on minimal hardware with a focus on reliability over features.",
    role: "Solo developer. Full stack from database design to deployment on a Raspberry Pi.",
    stack: ["Express.js", "MongoDB", "React", "Node.js"],
    visual: "gantt",
  },
];

const allCerts = [
  { label: "CCNA", detail: "Cisco Certified Network Associate", type: "cert" },
  { label: "2nd Place", detail: "Inter-school Coding Competition", type: "award" },
  { label: "AWS Cloud Practitioner", detail: "In progress — expected Q3 2026", type: "cert" },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="min-h-full">
      <nav className="px-6 pt-8 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-text-secondary hover:text-orange transition-colors duration-200 group font-mono text-sm tracking-widest uppercase"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-1 transition-transform duration-200">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Back
        </Link>
      </nav>

      <header className="px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20 lg:px-16 lg:pt-24 lg:pb-24">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-sm tracking-widest uppercase text-orange mb-4">
            All Projects &amp; Credentials
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
            What I&apos;ve built
            <br />
            <span className="text-orange">and earned.</span>
          </h1>
        </div>
      </header>

      {/* Projects list */}
      <section className="px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16 lg:pb-40">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-1">
            {allProjects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setSelectedProject(p)}
                className="w-full text-left py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 hover:bg-surface/50 transition-colors duration-200 px-3 -mx-3 rounded-lg group border-b border-border cursor-pointer"
              >
                <span className="font-mono text-xs text-text-muted w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                  <h3 className="font-heading text-lg text-text-primary shrink-0 group-hover:text-orange transition-colors duration-200">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[11px] tracking-widest uppercase text-orange-muted bg-orange/8 px-2.5 py-1 rounded-full w-fit shrink-0">
                    {p.tech}
                  </span>
                </div>
                <p className="text-sm text-text-muted hidden sm:block flex-1 min-w-0">
                  {p.description.slice(0, 70)}&hellip;
                </p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-orange transition-all duration-200">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-sm tracking-widest uppercase text-orange mb-12">
            Certifications &amp; Awards
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCerts.map((c) => (
              <div
                key={c.label}
                className="flex flex-col gap-2 p-5 rounded-lg bg-surface border border-border"
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-orange-muted">
                  {c.type}
                </span>
                <span className="font-heading text-lg text-text-primary">
                  {c.label}
                </span>
                <span className="text-sm text-text-muted">{c.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-orange/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-sm text-text-muted">
          <Link href="/" className="text-text-secondary hover:text-orange transition-colors duration-200">
            Back to home
          </Link>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        triggerRect={null}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
