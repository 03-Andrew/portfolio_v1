"use client";

import { useState } from "react";
import Link from "next/link";
import CredentialModal from "./components/CredentialModal";
import { credentials, type CredentialData } from "./data/credentials";
import CredentialCard from "./components/CredentialCard";
import Section from "./components/Section";
import SideNav from "./components/SideNav";
import SkillConstellation from "./components/SkillConstellation";
import ProjectVisual from "./components/ProjectVisual";
import SectionHeader from "./components/SectionHeader";
import { projects } from "./data/projects";
import { experienceData } from "./data/experience";
import ExperienceItem from "./components/ExperienceItem";
import { useModalUrlSync, slugify } from "./hooks/useModalUrlSync";
import ContactModal from "./components/ContactModal";
import ContactCard from "./components/ContactCard";
export default function Home() {
  const [selectedCredential, setSelectedCredential] =
    useState<CredentialData | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const selectCredential = useModalUrlSync({
    paramName: "credential",
    items: credentials,
    getSlug: (c) => slugify(c.label),
    setSelectedItem: setSelectedCredential,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "James Andrei Nadela",
      "jobTitle": "Backend Developer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Davao",
        "addressCountry": "PH"
      },
      "knowsAbout": [
        "Backend Development",
        "Cloud Engineering",
        "AI Integration",
        "FastAPI",
        "Docker",
        "Node.js",
        "Python",
        "PostgreSQL",
        "Supabase",
      ],
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[60%_40%] lg:gap-4 lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-orange" />
                  <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-orange">
                    Backend Developer · Aspiring Cloud Engineer
                  </p>
                </div>
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-text-primary">
                Andrew<span className="text-orange">.</span>
              </h1>

              <p className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
                Building reliable backends and wiring AI into workflows. Based in Davao City, Philippines.
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
                    <path
                      d="M5 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <a
                  href="https://drive.google.com/file/d/1AFQAuZDt66Z8EbI6IlKtM5LZ5MOP1l2X/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-text-secondary hover:border-orange/30 hover:text-orange transition-colors duration-200 text-sm font-medium"
                >
                  View Resume
                </a>
              </div>
            </div>

            <div className="flex w-full items-center justify-start lg:max-w-[320px]">
              <SkillConstellation className="mt-2 lg:mt-0" />
            </div>
          </div>
        </div>
      </Section>

      <div
        aria-hidden="true"
        className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Experience */}
      <Section
        stagger
        id="experience"
        className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader title="Experience/Education" number="01" />
          {experienceData.map((exp) => (
            <ExperienceItem
              key={exp.company}
              role={exp.role}
              company={exp.company}
              logo={exp.logo}
              date={exp.date}
              description={exp.description}
              techStack={exp.techStack}
            />
          ))}
        </div>
      </Section>

      <div
        aria-hidden="true"
        className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Projects */}
      <Section
        stagger
        id="projects"
        className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-[50%] h-80 bg-amber/4 blur-3xl rounded-full animate-blob-wide animate-delay-1 translate-x-1/3 translate-y-1/3"
        />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader title="Projects" number="02" />

          <div className="border-t-2 border-orange/30">
            {projects.slice(0, 4).map((project, i) => {
              const isEven = i % 2 === 0;
              const projectSlug = slugify(project.title);
              return (
                <Link
                  key={project.title}
                  href={`/projects/${projectSlug}`}
                  className={`group cursor-pointer flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } border-b border-border/30 hover:bg-surface/40 transition-all duration-500`}
                >
                  <div
                    className={`w-full md:w-2/5 aspect-[4/3] overflow-hidden bg-surface-elevated/20 flex items-center justify-center ${
                      isEven ? "md:border-r" : "md:border-l"
                    } border-border/10 group-hover:bg-surface-elevated/40 transition-colors duration-500 relative`}
                  >
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={`${project.title} Mockup Preview`}
                        className="w-full h-full object-cover brightness-[0.75] contrast-[0.95] group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="scale-90 group-hover:scale-100 transition-transform duration-700">
                        <ProjectVisual type={project.visual!} />
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div className="flex min-w-0 flex-col gap-3">
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-orange-muted block mb-2">
                          {String(i + 1).padStart(2, "0")} / {project.label} /{" "}
                          {project.date}
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl text-text-primary leading-tight group-hover:text-orange transition-colors duration-300 break-words">
                          {project.title}
                        </h3>
                      </div>
                      {project.stack && project.stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 max-w-full">
                          {project.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-border/30 bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <p className="text-text-secondary text-sm leading-relaxed max-w-lg">
                        {project.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-orange group-hover:gap-3 transition-all duration-300 shrink-0">
                        <span className="w-6 h-px bg-orange/40 group-hover:w-10 group-hover:bg-orange transition-all duration-300" />
                        View details
                      </span>
                    </div>
                  </div>
                </Link>
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

      <div
        aria-hidden="true"
        className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Credentials */}
      <Section
        stagger
        id="credentials"
        className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-0 w-72 h-72 bg-orange-deep/6 blur-3xl rounded-full animate-blob-slow animate-delay-2 translate-x-1/2 -translate-y-1/2"
        />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader title="Credentials" number="03" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.slice(0, 2).map((c) => (
              <CredentialCard
                key={c.label}
                credential={c}
                onSelect={selectCredential}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/credentials"
              className="inline-flex items-center gap-3 group font-mono text-xs sm:text-sm tracking-widest uppercase text-orange hover:text-orange-bright transition-colors duration-200"
            >
              <span className="w-8 h-px bg-orange/40 group-hover:w-14 group-hover:bg-orange transition-all duration-300" />
              Show more
            </Link>
          </div>
        </div>
      </Section>

      <div
        aria-hidden="true"
        className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* About */}
      <Section
        stagger
        id="about"
        className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-80 h-80 bg-orange-deep/8 blur-3xl rounded-full animate-blob-alt animate-delay-3 -translate-x-1/3 -translate-y-1/3"
        />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader title="About" number="04" />

          <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="mb-8 lg:mb-0">
              <span className="font-heading text-xl text-text-primary">
                The person behind the code.
              </span>
            </div>
            <div className="flex flex-col gap-6 text-text-secondary leading-relaxed text-base sm:text-lg">
              <p>
                A Computer Science graduate and Cisco Certified Network
                Associate (CCNA) focused on writing functional, server-side code
                in Node.js and Python, handling everything from API routing to
                database management on Supabase and PostgreSQL.
              </p>
              <p>
                Lately, I&apos;ve been focusing on the core infrastructure around
                AI—building reliable pipelines for speech processing, automated
                scheduling agents, and workflow automation. I leverage a
                foundational understanding of network connectivity to bridge the
                gap between application code and deployment environments,
                seeking to grow within Cloud Engineering and DevOps roles where
                I can help build systems that run reliably at scale.
              </p>
              <p>
                Outside of projects and tech stuff, I apply that same discipline
                and consistency to my running, constantly training for the next
                milestone and tracking my progress on Strava.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div
        aria-hidden="true"
        className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
      </div>

      {/* Contact */}
      <Section
        stagger
        id="contact"
        className="relative overflow-visible px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-[50%] h-80 bg-amber/4 blur-3xl rounded-full animate-blob-wide animate-delay-1 translate-x-1/3 translate-y-1/3"
        />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader title="Contact" number="05" />

          <div className="lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="flex flex-col justify-start gap-6 py-2">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange"></span>
                </span>
                <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                  Available for work
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-3xl sm:text-4xl text-text-primary tracking-tight">
                  James Andrei Nadela
                </h3>
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md">
                  Open to opportunities, collaborations, and conversations about
                  backend systems, AI pipelines, or cloud architecture.
                  Let&apos;s build systems that scale.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-0">
              {/* Direct Email Card */}
              <ContactCard
                title="andreinadela052@gmail.com"
                label="Direct Contact"
                description="Click to start a conversation or copy my address."
                isDoubleWide
                onClick={() => setIsContactOpen(true)}
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />

              {/* GitHub Card */}
              <ContactCard
                title="GitHub"
                label="Source Code"
                href="https://github.com/03-Andrew"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                }
              />

              {/* LinkedIn Card */}
              <ContactCard
                title="LinkedIn"
                label="Professional"
                href="https://www.linkedin.com/in/andrei-nadela"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                }
              />

              {/* Credly Card */}
              <ContactCard
                title="Credly"
                label="Badges & Certs"
                href="https://www.credly.com/users/james-andrei-nadela"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                }
              />

              {/* Strava Card */}
              <ContactCard
                title="Strava"
                label="Fitness & Running"
                href="https://www.strava.com/athletes/87837103"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-orange/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-sm text-text-muted">
          <p>Built with Next.js</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <CredentialModal
        credential={selectedCredential}
        isOpen={selectedCredential !== null}
        onClose={() => selectCredential(null)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
