import { useParams } from "react-router-dom";
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

  
  if (!post) return <p>post not found 😢</p>;

  const PostComponent = post.component;
  const { title, description, date, image } = post.meta;

  const baseUrl = "https://www.bennett-eghan.com";

  return (
    <article className="prose prose-p:text-[18px] prose-li:text-[18px] max-w-3xl pb-32">
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
        {image && <meta property="og:image" content={`${baseUrl}${image}`} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={`${baseUrl}${image}`} />}

        {/* Canonical link */}
        <link rel="canonical" href={`${baseUrl}/blog/${slug}`} />
      </Helmet>

      <h2 className="text-[32px]">{title}</h2>
      <p className="text-[18px] text-[#494949]">{date}</p>
      <PostComponent />

      {/* ✅ Giscus Comment Section */}
      <div id="giscus-comments" className="mt-16"></div>
    </article>
  );
}
