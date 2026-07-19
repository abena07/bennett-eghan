import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndexLink } from "@/components/index-link";
import { GiscusComments } from "@/components/giscus-comments";
import { getPost, getPostSlugs } from "@/lib/posts";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

async function loadPost(slug: string) {
  try {
    return await getPost(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};

  const { title, description } = post.meta;

  return {
    title,
    description: description || "Read this blog post by phil.",
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.bennett-eghan.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const { title, date, readingTime } = post.meta;
  const PostComponent = post.Component;

  return (
    <>
      <IndexLink href="/blog" />
      <article className="prose prose-p:text-[14px] prose-li:text-[14px] prose-sm max-w-3xl pb-24 blog-post prose-p:leading-normal prose-p:my-[calc(0.75rem+1px)] prose-headings:mt-7 prose-headings:mb-2 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-pre:my-3 prose-blockquote:my-3">
        <h2 className="text-[14px] font-extrabold text-[#0B0F1F]">{title}</h2>
        <p className="blog-meta text-[12px] text-[#888888] mt-1">
          {date}
          {readingTime != null && (
            <>
              <span className="mx-2 text-[#888888]">·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </p>
        <PostComponent />

        <GiscusComments />
      </article>
    </>
  );
}
