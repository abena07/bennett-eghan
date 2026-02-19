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

      <p className="text-xl font-medium text-[#0B0F1F]">blog</p>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
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
            className={`cursor-pointer text-sm font-medium px-3 py-1.5 rounded-[4px] transition ${
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
              className={`cursor-pointer text-sm font-medium px-3 py-1.5 rounded-[4px] transition ${
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
        <p className="text-[18px] mt-6 leading-relaxed text-[#0B0F1F]">
          wow such empty 💀
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
  {sortedPosts.map(({ slug, meta }) => (
    <li key={slug}>
      <Link
        to={`/blog/${slug}`}
        className="block border-b border-gray-200 pb-1 group"
      >
        <div className="flex justify-between items-center text-[#0B0F1F] transform transition-all duration-300 ease-in-out group-hover:-translate-x-1 group-hover:opacity-90">
          <div className="flex items-center gap-2 md:text-[18px]">
            <span>{meta.title}</span>

            {/* Tags */}
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[#0B0F1F] text-sm font-medium px-2 py-0.5 rounded-[4px] bg-[#E1E4EA]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span className="md:text-[18px] ml-4 whitespace-nowrap lowercase transition-all duration-300 flex items-center gap-2">
            {meta.date &&
              new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>
      </Link>
    </li>
  ))}
</ul>

      )}
    </motion.div>
  );
}
