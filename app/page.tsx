"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectModal, { type ProjectData } from "./components/ProjectModal";
import CredentialModal from "./components/CredentialModal";
import { credentials, type CredentialData } from "./data/credentials";
import Section from "./components/Section";
import SideNav from "./components/SideNav";
import SkillConstellation from "./components/SkillConstellation";
import ProjectVisual from "./components/ProjectVisual";
import { projects } from "./data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<CredentialData | null>(null);

  return (
    <>
      <SideNav />
      <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-deep/12 blur-3xl rounded-full animate-blob-alt animate-delay-2 -translate-x-1/2 translate-y-1/2"
        />
      {/* Hero */}
      <Section
        id="hero"
        className="overflow-hidden px-6 sm:px-10 lg:px-16 min-h-[100svh] flex items-center"
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[70%] h-full bg-orange/6 blur-3xl rounded-full animate-blob animate-delay-1 translate-x-1/4 -translate-y-1/3"
        />


        <div className="relative max-w-5xl mx-auto w-full py-20">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_auto] lg:gap-10 lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-px bg-orange" />
                <p className="font-mono text-sm tracking-widest uppercase text-orange">
                  Backend Developer · Aspiring Cloud Engineer
                </p>
              </div>

              <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
                Andrew<span className="text-orange">.</span>
              </h1>

              <p className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
                Building reliable backends, wiring AI into workflows, and
                keeping things boring where it counts. Based in the Philippines.
              </p>

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange text-white font-medium hover:bg-orange-bright transition-colors duration-200 text-sm"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-text-secondary hover:border-orange/30 hover:text-orange transition-colors duration-200 text-sm font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Download Resume
                </a>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center w-full max-w-[320px]">
              <SkillConstellation />
            </div>
          </div>
        </div>
      </Section>

      <div aria-hidden="true" className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Experience */}
      <Section stagger id="experience" className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="max-w-5xl mx-auto relative">
          <div className="mb-12">
            <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">01</span>
            <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
              Experience
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-sm border border-orange/10 flex items-center justify-center shrink-0">
                  <span className="font-heading text-base text-orange">TP</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-heading text-lg text-text-primary leading-tight">
                    Turnkey Philippines
                  </span>
                  <span className="text-sm text-text-secondary">
                    Backend Developer Intern
                  </span>
                  <span className="font-mono text-xs tracking-widest uppercase text-text-muted mt-1">
                    Dec 2025 — Mar 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
              Built and deployed the backend infrastructure for a client mobile application with a team of interns. Developed RESTful APIs using Fastify, designed scalable database schemas, and hosted both the application and self-managed n8n workflows on DigitalOcean. Implemented CI/CD pipelines for streamlined deployments while gaining hands-on experience in cloud infrastructure, backend architecture, and development workflows.
              </p>

              <div className="flex flex-wrap gap-2">
                {["React Native", "Fastify", "n8n", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface-elevated text-text-secondary border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>


      {/* Projects */}
      <Section stagger id="projects" className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[50%] h-80 bg-amber/4 blur-3xl rounded-full animate-blob-wide animate-delay-1 -translate-x-1/3 translate-y-1/3" />
        <div className="max-w-5xl mx-auto relative">
          <div className="mb-12">
            <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">02</span>
            <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
              Projects
            </span>
          </div>

          <div className="border-t-2 border-orange/30">
            {projects.map((project, i) => {
              const isEven = i % 2 === 0;
              const labels = ["AI AUTOMATION", "FULL-STACK", "AI + SPEECH"];
              const actions = ["View Project", "View Project", "View Project"];
              return (
                <article
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} border-b border-border/30 hover:bg-surface/40 transition-all duration-500`}
                >
                  <div className={`w-full md:w-2/5 aspect-[4/3] overflow-hidden bg-surface-elevated/20 flex items-center justify-center ${isEven ? "md:border-r" : "md:border-l"} border-border/10 group-hover:bg-surface-elevated/40 transition-colors duration-500`}>
                    <div className="scale-90 group-hover:scale-100 transition-transform duration-700">
                      <ProjectVisual type={project.visual!} />
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-orange-muted block mb-2">
                          {String(i + 1).padStart(2, "0")} / {labels[i]}
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl text-text-primary leading-tight group-hover:text-orange transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase border border-border/30 px-3 py-1.5 rounded-full text-text-muted shrink-0 ml-4">
                        {project.tech}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                      <p className="text-text-secondary text-sm leading-relaxed max-w-lg">
                        {project.description.slice(0, 100)}&hellip;
                      </p>
                      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-orange group-hover:gap-3 transition-all duration-300 shrink-0">
                        <span className="w-6 h-px bg-orange/40 group-hover:w-10 group-hover:bg-orange transition-all duration-300" />
                        {actions[i]}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 group font-mono text-xs sm:text-sm tracking-widest uppercase text-orange hover:text-orange-bright transition-colors duration-200"
            >
              <span className="w-8 h-px bg-orange/40 group-hover:w-14 group-hover:bg-orange transition-all duration-300" />
              Show more
            </Link>
          </div>
        </div>
      </Section>

      <div aria-hidden="true" className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Credentials */}
      <Section stagger id="credentials" className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div aria-hidden="true" className="absolute top-1/2 right-0 w-72 h-72 bg-orange-deep/6 blur-3xl rounded-full animate-blob-slow animate-delay-2 translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-5xl mx-auto relative">
          <div className="mb-12">
            <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">03</span>
            <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
              Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((c) => (
              <button
                key={c.label}
                onClick={() => setSelectedCredential(c)}
                className="text-left p-5 sm:p-6 border border-border/30 bg-surface/30 flex flex-col justify-between hover:bg-surface transition-colors duration-500 cursor-pointer"
              >
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-orange-muted">
                  {c.type === "cert" ? "Certification" : "Award"}
                </span>
                <div>
                  <h4 className="font-heading text-lg sm:text-xl text-text-primary mb-1">{c.label}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{c.detail}</p>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase border-t border-border/20 pt-4 text-text-muted">
                  {c.skills.join(" · ")}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 group font-mono text-xs sm:text-sm tracking-widest uppercase text-orange hover:text-orange-bright transition-colors duration-200"
              onClick={(e) => e.preventDefault()}
            >
              <span className="w-8 h-px bg-orange/40 group-hover:w-14 group-hover:bg-orange transition-all duration-300" />
              See more
            </a>
          </div>

        </div>
      </Section>

      <div aria-hidden="true" className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* About */}
      <Section stagger id="about" className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div aria-hidden="true" className="absolute top-0 left-0 w-80 h-80 bg-orange-deep/8 blur-3xl rounded-full animate-blob-alt animate-delay-3 -translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-5xl mx-auto relative">
          <div className="mb-12">
            <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">04</span>
            <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
              About
            </span>
          </div>
          <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="mb-8 lg:mb-0">
              <span className="font-heading text-xl text-text-primary">
                The person behind the code.
              </span>
            </div>
            <div className="flex flex-col gap-6 text-text-secondary leading-relaxed text-base sm:text-lg">
              <p>
                I write backend code that stays up. Django, FastAPI, Next.js
                server-side. I care about data models that make sense, APIs that
                don&apos;t surprise you, and deployments that don&apos;t wake me
                up at 3am.
              </p>
              <p>
                Lately wiring AI into real workflows: speech processing
                pipelines, automated scheduling agents, systems that turn messy
                human input into structured action. I&apos;m not chasing the
                latest model; I&apos;m making the plumbing around it solid.
              </p>
              <p>
                Moving toward cloud engineering. I want to build systems that
                scale past a single VPS without turning into spaghetti. Learning
                the AWS ecosystem, infrastructure-as-code, and the patterns that
                keep distributed systems boring in the best way.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div aria-hidden="true" className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Contact */}
      <Section stagger id="contact" className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-amber/3 blur-3xl rounded-full animate-blob-wide animate-delay-1 translate-x-1/4 translate-y-1/3" />
        <div className="max-w-5xl mx-auto relative">
          <div className="mb-12">
            <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">05</span>
            <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
              Contact
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                Open to opportunities, collaborations, and conversations about
                backend systems, AI pipelines, or cloud architecture.
              </p>

              <div className="flex flex-col gap-2 mt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-orange transition-colors duration-200 group py-2">
                  <span className="w-6 h-px bg-orange/30 group-hover:bg-orange group-hover:w-10 transition-all duration-300" />
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-orange transition-colors duration-200 group py-2">
                  <span className="w-6 h-px bg-orange/30 group-hover:bg-orange group-hover:w-10 transition-all duration-300" />
                  LinkedIn
                </a>
              </div>
            </div>

            <form
              className="flex flex-col gap-4 mt-10 lg:mt-0"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                const subject = `Portfolio contact from ${name}`;
                const body = `${message}\n\n— ${name} (${email})`;
                window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label htmlFor="contact-name" className="font-mono text-xs tracking-widest uppercase text-text-muted">Name</label>
                  <input id="contact-name" name="name" type="text" required placeholder="Your name" className="px-4 py-3 rounded-md bg-surface border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-orange/50 transition-colors duration-200 text-sm" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label htmlFor="contact-email" className="font-mono text-xs tracking-widest uppercase text-text-muted">Email</label>
                  <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className="px-4 py-3 rounded-md bg-surface border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-orange/50 transition-colors duration-200 text-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-mono text-xs tracking-widest uppercase text-text-muted">Message</label>
                <textarea id="contact-message" name="message" required rows={4} placeholder="Tell me about your project or opportunity..." className="px-4 py-3 rounded-md bg-surface border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-orange/50 transition-colors duration-200 text-sm resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-md bg-orange text-white font-medium hover:bg-orange-bright transition-colors duration-200 w-fit text-sm">
                Send message
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 6-12 6 3-6-3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-orange/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-sm text-text-muted">
          <p>Built with Next.js and intent.</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        triggerRect={null}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

      <CredentialModal
        credential={selectedCredential}
        isOpen={selectedCredential !== null}
        onClose={() => setSelectedCredential(null)}
      />
    </>
  );
}
