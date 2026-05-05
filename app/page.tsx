"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectModal, { type ProjectData } from "./components/ProjectModal";
import MagneticArea from "./components/MagneticArea";
import ParallaxSection from "./components/ParallaxSection";
import SideNav from "./components/SideNav";
import ScrambleText from "./components/ScrambleText";
import BentoCard from "./components/BentoCard";
import CredentialBadge from "./components/CredentialBadge";
import { projects } from "./data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      <SideNav />

      {/* Hero */}
      <ParallaxSection
        id="hero"
        bg="canvas"
        z={1}
        first
        className="overflow-hidden px-6 sm:px-10 lg:px-16 min-h-[100svh] flex items-center"
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[70%] h-full bg-orange/6 blur-3xl rounded-full translate-x-1/4 -translate-y-1/3"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-deep/12 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"
        />

        <div className="relative max-w-5xl mx-auto w-full py-20">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 lg:items-center">
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

              <MagneticArea className="flex items-center gap-4 mt-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange text-white font-medium hover:bg-orange-bright transition-colors duration-200 text-sm"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-text-secondary hover:border-orange/30 hover:text-orange transition-colors duration-200 text-sm font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Download Resume
                </a>
              </MagneticArea>
            </div>

            <div
              aria-hidden="true"
              className="hidden lg:flex flex-col gap-2 font-mono text-xs text-orange/40 leading-relaxed select-none bg-surface/70 rounded-2xl p-5 border border-border/50 backdrop-blur-sm"
            >
              <span className="text-orange/60">$ whoami</span>
              <span><ScrambleText text="andrew :: backend_dev :: cloud_aspirant" /></span>
              <span className="mt-3 text-orange/60">$ cat location</span>
              <span><ScrambleText text="Philippines (GMT+8)" /></span>
              <span className="mt-3 text-orange/60">$ cat stacks.txt</span>
              <span><ScrambleText text="django . fastapi . nextjs . n8n" /></span>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Experience */}
      <ParallaxSection id="experience" bg="surface" z={2} className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="w-8 h-px bg-orange inline-block align-middle mr-3" />
            <span className="font-mono text-sm tracking-widest uppercase text-orange align-middle">
              Experience
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="mb-6 lg:mb-0">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-xl text-text-primary">
                  Backend Developer Intern
                </span>
                <span className="text-sm text-text-muted">3 months</span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
                Built a mobile app backend for a client project. Shipped a
                React Native frontend with a Fastify API, wired together with
                n8n workflows for business process automation. Owned the
                integration layer end-to-end: auth, data sync, push
                notifications, and deployment.
              </p>

              <div className="flex flex-wrap gap-2">
                {["React Native", "Fastify", "n8n", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-surface-elevated text-text-secondary border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Projects */}
      <ParallaxSection id="projects" bg="canvas" z={3} className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="w-8 h-px bg-orange inline-block align-middle mr-3" />
            <span className="font-mono text-sm tracking-widest uppercase text-orange align-middle">
              Projects
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <BentoCard
              project={projects[0]}
              index={1}
              className="lg:col-span-2 lg:row-span-1"
              large
              onClick={() => setSelectedProject(projects[0])}
            />
            <BentoCard
              project={projects[1]}
              index={2}
              className="lg:col-span-1"
              onClick={() => setSelectedProject(projects[1])}
            />
            <BentoCard
              project={projects[2]}
              index={3}
              className="lg:col-span-3"
              wide
              onClick={() => setSelectedProject(projects[2])}
            />
          </div>

          <div className="mt-24">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 group font-mono text-sm tracking-widest uppercase text-orange hover:text-orange-bright transition-colors duration-200"
            >
              <span className="w-8 h-px bg-orange/40 group-hover:w-14 group-hover:bg-orange transition-all duration-300" />
              View all projects
            </Link>
          </div>
        </div>
      </ParallaxSection>

      {/* Credentials */}
      <ParallaxSection id="credentials" bg="surface" z={4} className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="w-8 h-px bg-orange inline-block align-middle mr-3" />
            <span className="font-mono text-sm tracking-widest uppercase text-orange align-middle">
              Credentials
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            <CredentialBadge label="CCNA" detail="Cisco Certified Network Associate" type="cert" delay={0} />
            <CredentialBadge label="2nd Place" detail="Inter-school Coding Competition" type="award" delay={200} />
          </div>
        </div>
      </ParallaxSection>

      {/* About */}
      <ParallaxSection id="about" bg="canvas" z={5} className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="w-8 h-px bg-orange inline-block align-middle mr-3" />
            <span className="font-mono text-sm tracking-widest uppercase text-orange align-middle">
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
      </ParallaxSection>

      {/* Contact */}
      <ParallaxSection id="contact" bg="surface" z={6} className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="w-8 h-px bg-orange inline-block align-middle mr-3" />
            <span className="font-mono text-sm tracking-widest uppercase text-orange align-middle">
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
                  <input id="contact-name" name="name" type="text" required placeholder="Your name" className="px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-orange/50 transition-colors duration-200 text-sm" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label htmlFor="contact-email" className="font-mono text-xs tracking-widest uppercase text-text-muted">Email</label>
                  <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className="px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-orange/50 transition-colors duration-200 text-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-mono text-xs tracking-widest uppercase text-text-muted">Message</label>
                <textarea id="contact-message" name="message" required rows={4} placeholder="Tell me about your project or opportunity..." className="px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-orange/50 transition-colors duration-200 text-sm resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl bg-orange text-white font-medium hover:bg-orange-bright transition-colors duration-200 w-fit text-sm">
                Send message
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 6-12 6 3-6-3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-sm text-text-muted">
              <p>Built with Next.js and intent.</p>
              <p>&copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      <ProjectModal
        project={selectedProject}
        triggerRect={null}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
