import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/blog"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
  const postRoutes = getPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(),
  }));
  const legalRoutes = getLegalSlugs().map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...postRoutes, ...legalRoutes];
}
