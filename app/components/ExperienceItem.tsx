export default function ExperienceItem({
    logo, company, role, date, description, techStack
}: {
    logo: string;
    company: string;
    role: string;
    date: string;
    description: string;
    techStack: string[];
}) {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16 py-6">
      <div className="mb-6 lg:mb-0">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-sm border border-orange/10 flex items-center justify-center shrink-0">
            <span className="font-heading text-base text-orange">{logo}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-heading text-lg text-text-primary leading-tight">
              {company}
            </span>
            <span className="text-sm text-text-secondary">
              {role}
            </span>
            <span className="font-mono text-xs tracking-widest uppercase text-text-muted mt-1">
              {date}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
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
  );
}
