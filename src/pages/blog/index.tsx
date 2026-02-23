import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import posts from "./_index";

const FILTER_ALL = "all";

export default function Blog() {
  const [tagFilter, setTagFilter] = useState<string>(FILTER_ALL);

  // unique tags from all posts
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      ((p.meta.tags || []) as string[]).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, []);

  // sort posts by date (newest first) and filter by tag
  const sortedPosts = useMemo(() => {
    let list = [...posts].sort((a, b) => {
      const dateA = a.meta.date ? new Date(a.meta.date).getTime() : 0;
      const dateB = b.meta.date ? new Date(b.meta.date).getTime() : 0;
      return dateB - dateA;
    });
    if (tagFilter !== FILTER_ALL) {
      list = list.filter((p) => ((p.meta.tags || []) as string[]).includes(tagFilter));
    }
    return list;
  }, [tagFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {/* ✅ SEO meta tags */}
      <Helmet>
        <title>abena | blog</title>
        <meta
          name="description"
          content="read abena's latest blog posts."
        />
        <meta property="og:title" content="abena's blog" />
        <meta
          property="og:description"
          content="insights, from abena's experience as a swe."
        />
        <meta property="og:image" content="https://www.bennett-eghan.com/og-main.png?v=2" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bennett-eghan.com/blog" />
      </Helmet>

      <p className="text-[16px] font-medium text-[#0B0F1F] mb-6">blog</p>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <span
            role="button"
            tabIndex={0}
            onClick={() => setTagFilter(FILTER_ALL)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setTagFilter(FILTER_ALL);
              }
            }}
            className={`cursor-pointer text-[12px] font-medium px-2 py-1 transition ${
              tagFilter === FILTER_ALL
                ? "bg-[#0B0F1F] text-white"
                : "bg-transparent text-[#0B0F1F] hover:bg-[#E1E4EA]/60"
            }`}
          >
            all
          </span>
          {allTags.map((tag) => (
            <span
              key={tag}
              role="button"
              tabIndex={0}
              onClick={() => setTagFilter(tag)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setTagFilter(tag);
                }
              }}
              className={`cursor-pointer text-[12px] font-medium px-2 py-1 transition ${
                tagFilter === tag
                  ? "bg-[#0B0F1F] text-white"
                  : "bg-transparent text-[#0B0F1F] hover:bg-[#E1E4EA]/60"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {sortedPosts.length === 0 ? (
        <p className="text-[14px] mt-6 leading-relaxed text-[#0B0F1F]">
          wow such empty 💀
        </p>
      ) : (
        <ul className="space-y-5">
          {sortedPosts.map(({ slug, meta }) => (
            <li key={slug}>
              <Link
                to={`/blog/${slug}`}
                className="blog-list-link flex justify-between items-center w-full py-1 px-0 group no-underline"
              >
                <span className="text-[14px] text-[#0B0F1F] group-hover:bg-[#0B0F1F] group-hover:text-white group-hover:no-underline py-0.5 px-1 -mx-1 transition-colors duration-150 underline decoration-[#0B0F1F] decoration-1 underline-offset-2">
                  {meta.title}
                </span>
                <span className="text-[12px] text-[#888888] whitespace-nowrap ml-4 shrink-0">
                  {meta.date &&
                    new Date(meta.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
