import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Home() {
  return (
    <>
      <Helmet>
        <title>phil | engineer</title>
        <meta
          name="description"
          content="breaking building & engineering things, engineer from Ghana interested in systems, algorithms, and good UX."
        />
        <meta property="og:title" content="phil | engineer" />
        <meta
          property="og:description"
          content="breaking building & engineering things."
        />
        <meta property="og:image" content="https://www.bennett-eghan.com/og-main.png?v=2" />
        <meta property="og:url" content="https://www.bennett-eghan.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-[16px] font-extrabold text-[#0B0F1F]">Hi i'm Phil.</p>

        <div className="text-[14px] font-normal mt-4 leading-[1.55] text-[#0B0F1F]/92 space-y-[calc(0.75rem+1px)] [&_a]:text-[#0B0F1F] [&_span]:text-[#0B0F1F]">
          <p>
            i'm an engineer from Ghana who's interested in{" "}
            <span className="inline font-bold">
              systems, algorithms and good ux
            </span>
            .
          </p>
          <p>
            i spend a lot of time thinking about what happens behind the scenes, the abstractions,
            infrastructure and engineering decisions that power good software, and how all of that ties
            back into making products usable and great.
          </p>
          <p>
            i'm especially drawn to systems that feel simple on the surface but are incredibly thoughtful
            underneath.
          </p>
          <p>
            outside of work i play padel, swim & go on walks.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 text-[12px] text-[#0B0F1F] mt-6">
          <Link to="/projects" className="inline-flex w-fit items-center gap-1 hover-underline">
            projects
            <ArrowUpRight size={12} />
          </Link>

          <Link to="/blog" className="inline-flex w-fit items-center gap-1 hover-underline">
            writing
            <ArrowUpRight size={12} />
          </Link>

          <Link to="/photos" className="inline-flex w-fit items-center gap-1 hover-underline">
            keepsakes
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="border-t border-[#0B0F1F]/10 my-8" />

        <div className="flex flex-col gap-1.5">
          <div className="text-[14px] font-medium text-[#0B0F1F] [font-variant:small-caps]">get in touch</div>

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
      </motion.div>
    </>
  );
}

export default Home;
