import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "phil | engineer",
  description:
    "breaking building & engineering things, engineer from Ghana interested in systems, algorithms, and good UX.",
  openGraph: {
    title: "phil | engineer",
    description: "breaking building & engineering things.",
    url: "https://www.bennett-eghan.com/",
    type: "website",
  },
};

export default function Home() {
  return (
    <FadeIn className="w-full">
      <p className="text-[16px] font-extrabold text-[#0B0F1F]">hi i&apos;m Phil.</p>

      <div className="text-[14px] font-normal mt-4 leading-[1.55] text-[#0B0F1F]/92 space-y-[calc(0.75rem+1px)] [&_a]:text-[#0B0F1F] [&_span]:text-[#0B0F1F]">
        <p>
          i&apos;m an engineer who&apos;s interested in{" "}
          <span className="inline font-bold">systems and algorithms</span>.
        </p>
        <p>
          i enjoy thinking about the abstractions, infrastructure, and
          engineering decisions behind great software. i&apos;m especially
          drawn to systems that feel simple on the surface but are
          thoughtfully engineered underneath.
        </p>
        <p>outside of work i play padel, swim & go on walks.</p>
      </div>

      <div className="flex flex-col gap-1.5 text-[12px] text-[#0B0F1F] mt-6">
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-1 hover-underline"
        >
          projects
          <ArrowUpRight size={12} />
        </Link>

        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-1 hover-underline"
        >
          writing
          <ArrowUpRight size={12} />
        </Link>

        <Link
          href="/photos"
          className="inline-flex w-fit items-center gap-1 hover-underline"
        >
          keepsakes
          <ArrowUpRight size={12} />
        </Link>
      </div>

      <div className="border-t border-[#0B0F1F]/10 my-8" />

      <div className="flex flex-col gap-1.5">
        <div className="text-[14px] font-medium text-[#0B0F1F] [font-variant:small-caps]">
          get in touch
        </div>

        <div className="flex items-center gap-2.5 text-[12px] text-[#0B0F1F] flex-wrap">
          <a
            href="https://github.com/abena07"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-wipe"
          >
            github
          </a>

          <span className="text-[#0B0F1F]">/</span>

          <a
            href="https://www.linkedin.com/in/phillipa-bennett-eghan/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-wipe"
          >
            linkedin
          </a>

          <span className="text-[#0B0F1F]">/</span>

          <a href="mailto:abenabennett@proton.me" className="underline-wipe">
            email
          </a>

          <span className="text-[#0B0F1F]">/</span>

          <a
            href="https://bsky.app/profile/1bp7l.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-wipe"
          >
            bluesky
          </a>
        </div>
      </div>
    </FadeIn>
  );
}
