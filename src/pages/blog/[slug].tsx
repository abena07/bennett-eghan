import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import posts from "./_index";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <p>post not found 😢</p>;

  const PostComponent = post.component;
  const { title, description, date, image } = post.meta;

  const baseUrl = "https://www.bennett-eghan.com";

  return (
    <article className="prose prose-p:text-[18px] prose-li:text-[18px] max-w-3xl pb-32">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{`${title} | Abena’s Blog`}</title>
        <meta
          name="description"
          content={description || "Read this blog post by Abenan."}
        />

        {/* ✅ Open Graph / Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/blog/${slug}`} />
        {image && <meta property="og:image" content={`${baseUrl}${image}`} />}

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && (
          <meta name="twitter:image" content={`${baseUrl}${image}`} />
        )}

        {/* ✅ Canonical link */}
        <link rel="canonical" href={`${baseUrl}/blog/${slug}`} />
      </Helmet>

      <h2 className="text-[32px]">{title}</h2>
      <p className="text-[18px] text-[#494949]">{date}</p>
      <PostComponent />
    </article>
  );
}
