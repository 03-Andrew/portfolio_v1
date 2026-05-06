import Section from "./Section";

export default function Experience(){
    return (
        <div>
                  <Section
                    stagger
                    id="experience"
                    className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
                  >
                    <div className="max-w-5xl mx-auto relative">
                      <div className="mb-12">
                        <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">
                          01
                        </span>
                        <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
                        <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
                          Experience
                        </span>
                      </div>
            
                      <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 p-8 sm:p-10 lg:p-14 bg-surface/30 border border-border/40 hover:border-orange/15 hover:bg-surface/50 transition-all duration-500 group/card">
                        {/* Logo */}
                        <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center border border-border/30 bg-surface-elevated/30">
                          <span className="font-heading text-2xl sm:text-3xl text-text-muted/30 tracking-tighter text-center leading-tight">
                            TP
                          </span>
                        </div>
            
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-5">
                            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl text-text-primary">
                              Backend Developer Intern{" "}
                              <span className="text-orange">@ Turnkey Philippines</span>
                            </h3>
                            <span className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-text-muted shrink-0">
                              Dec 2025 — Mar 2026
                            </span>
                          </div>
            
                          <p className="text-text-secondary leading-relaxed text-sm sm:text-base max-w-3xl mb-6">
                            Built and deployed the backend infrastructure for a client
                            mobile application alongside a team of interns. Developed
                            RESTful APIs with Fastify, designed scalable database schemas,
                            and deployed both the application server and self-hosted n8n
                            automation workflows on DigitalOcean. Implemented CI/CD
                            pipelines to streamline deployments and gained hands-on
                            experience with cloud infrastructure, backend architecture, and
                            production-grade development workflows.
                          </p>
            
                          <div className="flex flex-wrap gap-2.5">
                            {[
                              "React Native",
                              "Fastify",
                              "n8n",
                              "TypeScript",
                              "DigitalOcean",
                              "CI/CD",
                            ].map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-[10px] px-3 py-1 border border-border/30 text-text-muted uppercase tracking-widest"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Section>
        </div>
    )
}