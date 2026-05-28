"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectModal, { type ProjectData } from "../components/ProjectModal";
import { projects as allProjects } from "../data/projects";


export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="min-h-svh flex flex-col">
      <nav className="sticky top-0 z-50 bg-canvas px-6 py-6 sm:px-10 lg:px-16">
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

      <main className="flex-1 flex flex-col justify-center">
        <header className="px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20 lg:px-16 lg:pt-24 lg:pb-24">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-sm tracking-widest uppercase text-orange mb-4">
              All Projects
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
              What I&apos;ve built
              <br />
              <span className="text-orange">in public.</span>
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
                  className="w-full text-left py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 hover:bg-surface/50 transition-colors duration-200 px-3 -mx-3 group border-b border-border cursor-pointer"
                >
                  <span className="font-mono text-xs text-text-muted w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                    <h3 className="min-w-0 font-heading text-lg text-text-primary group-hover:text-orange transition-colors duration-200 break-words">
                      {p.title}
                    </h3>
                    <span className="max-w-full self-start rounded-full bg-orange/8 px-2.5 py-1 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-orange-muted break-words sm:w-fit sm:shrink-0">
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
      </main>

      <footer className="mt-auto px-6 py-8 border-t border-orange/20">
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
