import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import posts from "./_index";

export default function Blog() {
  // sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    const dateB = b.meta.date ? new Date(b.meta.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {/* ✅ SEO meta tags */}
      <Helmet>
        <title>Abena | blog</title>
        <meta
          name="description"
          content="read Abena's latest blog posts."
        />
        <meta property="og:title" content="Phillipa’s Blog" />
        <meta
          property="og:description"
          content="insights, from Abena's experience as a swe."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bennett-eghan.com/blog" />
      </Helmet>

      <p className="text-xl font-medium">blog 📚</p>

      {sortedPosts.length === 0 ? (
        <p className="text-[18px] mt-4 leading-relaxed text-[#494949]">
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
                <div className="flex justify-between items-center text-[#494949] transform transition-all duration-300 ease-in-out group-hover:-translate-x-1 group-hover:text-black">
                  <span className="md:text-[18px] transform transition-all duration-300 ease-in-out">
                    {meta.title}
                  </span>
                  {meta.date && (
                    <span className="md:text-[18px] ml-4 whitespace-nowrap lowercase transition-all duration-300">
                      {new Date(meta.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
