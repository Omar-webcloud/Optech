import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
