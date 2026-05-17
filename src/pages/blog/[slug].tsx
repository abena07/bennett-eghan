import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import posts from "./_index";
import { useEffect } from "react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;

    const commentBox = document.getElementById("giscus-comments");
    if (commentBox) commentBox.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;

    script.setAttribute("data-repo", "abena07/bennett-eghan");
    script.setAttribute("data-repo-id", "R_kgDON4R-JA");

    script.setAttribute("data-category", "comments");
    script.setAttribute("data-category-id", "DIC_kwDON4R-JM4Czgvp");

    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");

    commentBox?.appendChild(script);
  }, [slug, post]);

  if (!post)
    return (
      <div className="w-full">
        <Link
          to="/blog"
          className="mb-4 inline-block text-[12px] font-medium text-[#0B0F1F]/75 no-underline"
          aria-label="back to index"
        >
          ← index
        </Link>
        <p className="text-[14px] text-[#0B0F1F]">post not found 😢</p>
      </div>
    );

  const PostComponent = post.component;
  const { title, description, date, readingTime } = post.meta;

  const baseUrl = "https://www.bennett-eghan.com";

  return (
    <article className="prose prose-p:text-[14px] prose-li:text-[14px] prose-sm max-w-3xl pb-24 blog-post prose-p:leading-normal prose-p:my-3 prose-headings:mt-7 prose-headings:mb-2 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-pre:my-3 prose-blockquote:my-3">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={description || "Read this blog post by Abenan."}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/blog/${slug}`} />

        {/* Twitter Card — summary (title + description, no hero image) */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Canonical link */}
        <link rel="canonical" href={`${baseUrl}/blog/${slug}`} />
      </Helmet>

      <Link
        to="/blog"
        className="mb-4 inline-block text-[12px] font-medium text-[#0B0F1F]/75 no-underline"
        aria-label="back to index"
      >
        ← index
      </Link>

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

      {/* ✅ Giscus Comment Section */}
      <div id="giscus-comments" className="mt-10"></div>
    </article>
  );
}
