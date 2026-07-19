"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

const FILTER_ALL = "all";

export function TagFilterList({
  posts,
}: {
  posts: { slug: string; meta: PostMeta }[];
}) {
  const [tagFilter, setTagFilter] = useState<string>(FILTER_ALL);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      (p.meta.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (tagFilter === FILTER_ALL) return posts;
    return posts.filter((p) => (p.meta.tags || []).includes(tagFilter));
  }, [posts, tagFilter]);

  return (
    <>
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
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

      {filteredPosts.length === 0 ? (
        <p className="text-[14px] mt-4 leading-normal text-[#0B0F1F]">
          wow such empty 💀
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredPosts.map(({ slug, meta }) => (
            <li key={slug}>
              <Link
                href={`/blog/${slug}`}
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
    </>
  );
}
