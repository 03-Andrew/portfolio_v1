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
        logo: 'TP',
        company: "Turnkey Philippines",
        role: "Backend Developer Intern",
        date: "Dec 2025 - March 2026",
        description: "Built and deployed the backend infrastructure for a client mobile application with a team of interns. Developed RESTful APIs using Fastify, designed scalable database schemas, and hosted both the application and self-managed n8n workflows on DigitalOcean. Implemented CI/CD pipelines for streamlined deployments while gaining hands-on experience in cloud infrastructure, backend architecture, and development workflows.",
        techStack: ["Fastify", "n8n", "DigitalOcean", "TypeScript", "Supabase"]
    },
    {
        logo: 'MP',
        company: "Mapua Malayan Colleges Mindanao",
        role: "BS Computer Science Student",
        date: "2022 - 2026",
        description:"Consistent Dean's Lister with coursework focused on data structures, algorithms, databases, software engineering, machine learning, and web development.",
        techStack: [ "Data Structures & Algorithms","Machine Learning","Software Engineering"]
    }
]