import { MetadataRoute } from "next";
import { projects } from "@/app/data/projects";
import { slugify } from "@/app/hooks/slugify";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dreww.space"; // Replace with your production domain

  // Dynamic project routes
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${slugify(project.title)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/credentials`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...projectUrls];
}
