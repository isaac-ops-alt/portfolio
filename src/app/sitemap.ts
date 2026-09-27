import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
  ];
}
