"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";

export function SharePost({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 text-[#0B0F1F]/50">
      <span className="h-4 w-px bg-[#0B0F1F]/15" aria-hidden />
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="hover:text-[#0B0F1F] transition-colors"
      >
        <Twitter size={15} strokeWidth={1.75} />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="hover:text-[#0B0F1F] transition-colors"
      >
        <Linkedin size={15} strokeWidth={1.75} />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="cursor-pointer hover:text-[#0B0F1F] transition-colors"
      >
        {copied ? (
          <Check size={15} strokeWidth={1.75} />
        ) : (
          <LinkIcon size={15} strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
