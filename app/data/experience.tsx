export interface ExperienceData {
    logo: string;
    company: string;
    role: string;
    date: string;
    description: string;
    techStack: string[];
}

export const experienceData: ExperienceData[] = [
    {
        logo: 'LG',
        company: "Freelance",
        role: "Web Developer",
        date: "2022 - Present",
        description: "Developed and maintained websites for various clients, utilizing technologies such as React, Node.js, and MongoDB to create responsive and user-friendly web applications.",
        techStack: ["React", "Node.js", "MongoDB"]
    },
    {
        logo: 'TP',
        company: "Turnkey Philippines",
        role: "Backend Developer Intern",
        date: "Dec 2025 - March 2026",
        description: "Built and deployed the backend infrastructure for a client mobile application with a team of interns. Developed RESTful APIs using Fastify, designed scalable database schemas, and hosted both the application and self-managed n8n workflows on DigitalOcean. Implemented CI/CD pipelines for streamlined deployments while gaining hands-on experience in cloud infrastructure, backend architecture, and development workflows.",
        techStack: ["Fastify", "n8n", "DigitalOcean", "TypeScript", "Supabase"]
    }
]