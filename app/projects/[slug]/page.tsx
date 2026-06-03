import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";
import { slugify } from "@/app/hooks/slugify";
import ProjectVisual from "@/app/components/ProjectVisual";
import BackButton from "@/app/components/BackButton";
import ProjectImageSlider from "@/app/components/ProjectImageSlider";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: slugify(p.title),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.title) === slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  return {
    title: `${project.title} — ${project.role}`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.title) === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-svh bg-canvas text-text-primary font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
        {/* Dynamic Two-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Metadata & Links */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-12">
            <div className="mb-2">
              <BackButton />
            </div>

            {/* Project Type Badge and Date */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange/8 border border-orange/15 px-3 py-0.5 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-orange-muted">
                {project.label}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {project.date}
              </span>
            </div>

            {/* Project Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05] text-wrap-balance">
              {project.title}
            </h1>

            {/* Minimal Editorial Divider */}
            <div className="h-px bg-border/40 w-full" />

            {/* Role details */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                Role
              </span>
              <p className="text-xl sm:text-2xl font-heading text-text-primary font-medium tracking-tight">
                {project.role}
              </p>
            </div>

            {/* Tech Stack Badge List */}
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                  Tech stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links Block */}
            {project.links && Object.entries(project.links).some(([key, val]) => val && key !== "video") && (
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                  Links
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.links.code && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange hover:bg-orange-bright text-white text-[11px] font-mono uppercase tracking-wider transition-colors duration-200"
                    >
                      <span>Source Code</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                  {project.links.manuscript && (
                    <a
                      href={project.links.manuscript}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-orange/30 hover:text-orange text-text-secondary text-[11px] font-mono uppercase tracking-wider transition-colors duration-200"
                    >
                      <span>Manuscript</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Image Showcase, Description, Findings & otherImages */}
          <div className="flex flex-col gap-12">
            
            {/* Screenshot Slideshow Carousel / Mini visual */}
            <div>
              {(project.images && project.images.length > 0) || 
              (project.links?.video && project.videoEmbedLocation !== "dedicated") ? (
                <ProjectImageSlider 
                  images={project.images || []} 
                  video={project.videoEmbedLocation !== "dedicated" ? project.links?.video : undefined} 
                  title={project.title} 
                  aspectRatio={project.aspectRatio}
                />
              ) : (
                project.visual && (
                  <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-border bg-surface/50 p-8 shadow-sm">
                    <div className="scale-90 md:scale-100 transition-transform duration-500">
                      <ProjectVisual type={project.visual} />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Summary Description */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                Overview
              </span>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[65ch] text-wrap-pretty">
                {project.description}
              </p>
            </div>

            {/* Dedicated Deep-Dive Video Walkthrough Section */}
            {project.videoEmbedLocation === "dedicated" && project.links?.video && (
              <div className="flex flex-col gap-4 pt-8 border-t border-border/40">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                  Video Walkthrough (Deep Dive)
                </span>
                {isYouTubeUrl(project.links.video) ? (
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-border/20 shadow-sm bg-surface">
                    <iframe
                      src={getYouTubeEmbedUrl(project.links.video)}
                      title={`${project.title} Deep-Dive Walkthrough`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden rounded-lg border border-border/20 shadow-sm bg-surface p-2">
                    <video
                      src={project.links.video}
                      controls
                      preload="metadata"
                      playsInline
                      className="w-full h-auto max-h-[500px] object-contain block rounded"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Findings List Section */}
            <div className="flex flex-col gap-4 pt-8 border-t border-border/40">
              <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
              Key Contributions & Findings
              </span>
              <ul className="flex flex-col gap-4">
                {project.findings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 items-start text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="font-mono text-xs text-orange w-5 shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-wrap-pretty">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Uniform otherImages loop (dynamic diagrams and detail blocks) */}
            {project.otherImages && project.otherImages.length > 0 && (
              <div className="space-y-12 pt-10 border-t border-border/40">
                {project.otherImages.map((other, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                        {other.label}
                      </span>
                      <h3 className="font-heading text-lg text-text-primary tracking-tight font-medium">
                        {other.title}
                      </h3>
                    </div>

                    {other.url && (
                      <div className="w-full">
                        <div className="relative w-full overflow-hidden rounded-lg bg-surface border border-border/20 group hover:border-border/40 transition-colors duration-300">
                          <img
                            src={other.url}
                            alt={other.title}
                            className="w-full h-auto object-contain block"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm leading-relaxed text-text-secondary max-w-[65ch] text-wrap-pretty">
                      {other.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

// Helpers for responsive YouTube embeds in dedicated walkthroughs
const isYouTubeUrl = (url: string): boolean => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
};
