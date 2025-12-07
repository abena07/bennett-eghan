import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

function Home() {
  return (
    <>
      <Helmet>
        <title>Abena | swe</title>
        <meta
          name="description"
          content="hi, i'm Abena, a software engineer from Ghana who enjoys building software. here, i share my experiences, learnings, and side projects."
        />
        <meta property="og:title" content="Abena — swe" />
        <meta
          property="og:description"
          content="building software & sharing what i learn along the way."
        />
        <meta property="og:image" content="https://www.bennett-eghan.com/og.png" />
        <meta property="og:url" content="https://www.bennett-eghan.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <style>{`
        .hover-underline {
          position: relative;
          display: inline-block;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .hover-underline:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex justify-start mb-5">
          <div className="inline-flex items-center gap-3 px-1.5 py-0.5  bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-cyan-600">
              i'm currently{" "}
              <span className="font-semibold text-cyan-700">
                breaking, building & engineering things
              </span>
            </span>
          </div>
        </div>
        <p className="text-xl font-medium">hi, i'm Abena 👋🏿</p>

        <div className="text-[18px] mt-4 leading-relaxed text-[#494949]">
          i'm a <span className="text-cyan-500 hover-underline cursor-pointer">swe</span> from ghana 🇬🇭 & i enjoy building software. 
          i'm also interested in anything <span className="text-cyan-500 hover-underline cursor-pointer">sports-related</span>. 
          here, i document my experiences, learnings and my occasional side quests.
        </div>

        <div className="text-[18px] mt-4 leading-relaxed text-[#494949]">
          outside of work, i'm a fellow @{" "}
          <a 
            href="https://hxilabs.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-500 hover-underline"
          >
            hxi labs
          </a>
          {" "}where we design technology that amplifies human connection. 
        </div>

        <div className="flex flex-col gap-2 mt-16">
          <div className="text-[16px] font-medium">stalk me</div>

          <div className="flex items-center gap-2.5 mt-1 text-[16px]">
            {/* GitHub */}
            <a 
              href="https://github.com/abena07" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#494949] hover-underline inline-flex"
            >
              <div className="flex items-center gap-1.5">
                <Github size={16} />
                <span>github</span>
              </div>
            </a>

            <span className="text-[#494949]">/</span>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/phillipa-bennett-eghan/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#494949] hover-underline inline-flex"
            >
              <div className="flex items-center gap-1.5">
                <Linkedin size={16} />
                <span>linkedin</span>
              </div>
            </a>

            <span className="text-[#494949]">/</span>

            {/* Email */}
            <a
              href="mailto:abenabennett@gmail.com"
              className="text-[#494949] hover-underline inline-flex"
            >
              <div className="flex items-center gap-1.5">
                <Mail size={16} />
                <span>email</span>
              </div>
            </a>

            <span className="text-[#494949]">/</span>

            {/* Bluesky */}
            <a 
              href="https://bsky.app/profile/1bp7l.bsky.social" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#494949] hover-underline inline-flex"
            >
              <div className="flex items-center gap-1.5">
                <span>bluesky</span>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
