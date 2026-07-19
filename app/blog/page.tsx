import type { Metadata } from "next";
import { IndexLink } from "@/components/index-link";
import { FadeIn } from "@/components/fade-in";
import { TagFilterList } from "@/components/tag-filter";
import { getPostSlugs, getPostMetaSync } from "@/lib/posts";

export const metadata: Metadata = {
  title: "phil | blog",
  description: "read phil's latest blog posts.",
  openGraph: {
    title: "phil's blog",
    description: "insights, from phil's experience as an engineer.",
    url: "https://www.bennett-eghan.com/blog",
    type: "website",
  },
};

export default function Blog() {
  const posts = getPostSlugs().map((slug) => ({
    slug,
    meta: getPostMetaSync(slug),
  }));
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    const dateB = b.meta.date ? new Date(b.meta.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <>
      <IndexLink href="/" />
      <FadeIn className="w-full">
        <p className="text-[16px] font-extrabold text-[#0B0F1F] mb-4">
          writing
        </p>
        <TagFilterList posts={sortedPosts} />
      </FadeIn>
    </>
  );
}
