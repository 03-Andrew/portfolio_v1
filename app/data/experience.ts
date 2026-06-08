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
        logo: '/turnkey_logo.jpeg',
        company: "Remarkablism Services Corporation | Turnkey Philippines",
        role: "Backend Developer Intern",
        date: "Dec 2025 - March 2026",
        description: "Helped build the backend for a client mobile application with a team of interns. Developed RESTful APIs using Fastify, designed database schemas, and hosted both the application and self-managed n8n workflows on a DigitalOcean droplet. Implemented CI/CD pipelines for streamlined deployments while gaining hands-on experience in cloud computing, backend architecture, and development workflows.",
        techStack: ["Fastify", "n8n", "DigitalOcean", "TypeScript", "React Native","Supabase"]
    },
    {
        logo: '/mmcm.jpeg',
        company: "Mapua Malayan Colleges Mindanao",
        role: "BS Computer Science Student",
        date: "August 2022 - May 2026",
        description: "Consistent Dean's Lister with coursework focused on data structures, algorithms, databases, software engineering, machine learning, and web development, graduated with latin honors",
        techStack: [ "Data Structures & Algorithms","Machine Learning","Software Engineering"]
    }
]