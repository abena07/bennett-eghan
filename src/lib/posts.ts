import fs from "fs";
import path from "path";
import type { ComponentType } from "react";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 200;

export interface PostMeta {
  title: string;
  date?: string;
  description?: string;
  image?: string;
  tags?: string[];
  readingTime?: number;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  Component: ComponentType;
}

function computeReadingTime(rawContent: string): number {
  const withoutMeta = rawContent
    .replace(/export const meta\s*=\s*\{[\s\S]*?\};?\s*/gi, "")
    .trim();
  const withoutCodeBlocks = withoutMeta.replace(/```[\s\S]*?```/g, " ");
  const words = withoutCodeBlocks.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Reads `export const meta = {...}` without compiling the MDX module.
 * Used by metadata routes (e.g. sitemap.ts) which run in an environment
 * that can't evaluate MDX's React-context bootstrapping.
 */
export function getPostMetaSync(slug: string): PostMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
  const match = raw.match(/export const meta\s*=\s*(\{[\s\S]*?\})\s*;?\s*(?:\r?\n|$)/);
  const meta = match
    ? (new Function(`return (${match[1]});`)() as PostMeta)
    : ({ title: slug } as PostMeta);
  return { ...meta, readingTime: meta.readingTime ?? computeReadingTime(raw) };
}

export async function getPost(slug: string): Promise<Post> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as {
    meta: PostMeta;
    default: ComponentType;
  };
  const readingTime = mod.meta.readingTime ?? computeReadingTime(raw);

  return {
    slug,
    meta: { ...mod.meta, readingTime },
    Component: mod.default,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return Promise.all(getPostSlugs().map((slug) => getPost(slug)));
}
