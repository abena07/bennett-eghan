import type { MetadataRoute } from "next";
import { getPostSlugs, getPostMetaSync } from "@/lib/posts";

const BASE_URL = "https://www.bennett-eghan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/` },
    { url: `${BASE_URL}/projects` },
    { url: `${BASE_URL}/photos` },
    { url: `${BASE_URL}/blog` },
  ];

  const postRoutes: MetadataRoute.Sitemap = getPostSlugs().map((slug) => {
    const meta = getPostMetaSync(slug);
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: meta.date ? new Date(meta.date) : undefined,
    };
  });

  return [...staticRoutes, ...postRoutes];
}
