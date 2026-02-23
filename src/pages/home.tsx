import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Github, Linkedin, MessageDefault, LinkSlant } from "pikaicons";
import { useState } from "react";

type BannerTheme = "swe" | "sports" | "hxi";

const bannerConfig = {
  swe: {
    text: "breaking, building & engineering things",
    bgColor: "bg-[#CECEDC]",
    borderColor: "border-[#0B0F1F]/20",
    dotColor: "bg-[#0B0F1F]",
    textColor: "text-[#0B0F1F]",
    boldTextColor: "text-[#0B0F1F]",
  },
  sports: {
    text: "skating, cycling & playing ping-pong",
    bgColor: "bg-[#CECEDC]",
    borderColor: "border-[#0B0F1F]/20",
    dotColor: "bg-[#0B0F1F]",
    textColor: "text-[#0B0F1F]",
    boldTextColor: "text-[#0B0F1F]",
  },
  hxi: {
    text: "contributing to products that amplify human interactions",
    bgColor: "bg-[#CECEDC]",
    borderColor: "border-[#0B0F1F]/20",
    dotColor: "bg-[#0B0F1F]",
    textColor: "text-[#0B0F1F]",
    boldTextColor: "text-[#0B0F1F]",
  },
};

function Home() {
  const [activeTheme, setActiveTheme] = useState<BannerTheme>("swe");
  const banner = bannerConfig[activeTheme];

  return (
    <>
      <Helmet>
        <title>abena | swe</title>
        <meta
          name="description"
          content="hi, i'm Abena, a software engineer from Ghana who enjoys building software. here, i share my experiences, learnings, and side projects."
        />
        <meta property="og:title" content="Abena — swe" />
        <meta
          property="og:description"
          content="building software & sharing what i learn along the way."
        />
        <meta property="og:image" content="https://www.bennett-eghan.com/og-main.png?v=2" />
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
        <div className="flex justify-start mb-5 hidden md:flex">
          <div className={`inline-flex items-center gap-3 px-1.5 py-0.5 rounded-[2px] ${banner.bgColor} border ${banner.borderColor} transition-colors duration-300`}>
            <div className={`w-2.5 h-2.5 rounded-[2px] ${banner.dotColor} animate-pulse`} />
            <span className={`text-[12px] font-medium ${banner.textColor} transition-colors duration-300`}>
              i'm currently{" "}
              <span className={`font-semibold ${banner.boldTextColor} transition-colors duration-300`}>
                {banner.text}
              </span>
            </span>
          </div>
        </div>
        <p className="text-[16px] font-medium text-[#0B0F1F]">hi, i'm Abena 👋🏿</p>

        <div className="text-[14px] mt-4 leading-relaxed text-black">
          i'm a <span
            className="text-[#0B0F1F] font-bold hover-underline cursor-pointer"
            onMouseEnter={() => setActiveTheme("swe")}
            onClick={() => setActiveTheme("swe")}
          >swe</span> from ghana 🇬🇭 & i enjoy building software.
          i'm also interested in anything <span
            className="text-[#0B0F1F] font-bold hover-underline cursor-pointer"
            onMouseEnter={() => setActiveTheme("sports")}
            onClick={() => setActiveTheme("sports")}
          >sports-related</span>.
          here, i document my experiences, learnings and my occasional side quests.
        </div>

        <div className="text-[14px] mt-4 leading-relaxed text-black">
          outside of work, i'm a fellow @{" "}
          <a
            href="https://hxilabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0B0F1F] font-bold hover-underline cursor-pointer"
            onMouseEnter={() => setActiveTheme("hxi")}
          >
            hxi labs
          </a>
          {" "}where we design technology that amplifies human connection.
        </div>

        <div className="flex flex-col gap-2 mt-16">
          <div className="text-[14px] font-medium text-black">stalk me</div>

          <div className="flex items-center gap-2.5 mt-1 text-[12px] text-black flex-wrap">
            {/* GitHub */}
            <a
              href="https://github.com/abena07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover-underline inline-flex items-center"
              aria-label="github"
            >
              <Github width={20} height={20} className="pika-icon shrink-0 inline-block" />
              <span className="hidden sm:inline ml-1.5">github</span>
            </a>

            <span className="text-black hidden sm:inline">/</span>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/phillipa-bennett-eghan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover-underline inline-flex items-center"
              aria-label="linkedin"
            >
              <Linkedin width={20} height={20} className="pika-icon shrink-0 inline-block" />
              <span className="hidden sm:inline ml-1.5">linkedin</span>
            </a>

            <span className="text-black hidden sm:inline">/</span>

            {/* Email */}
            <a
              href="mailto:abenabennett@proton.me"
              className="text-black hover-underline inline-flex items-center"
              aria-label="email"
            >
              <MessageDefault width={20} height={20} className="pika-icon shrink-0 inline-block" />
              <span className="hidden sm:inline ml-1.5">email</span>
            </a>

            <span className="text-black hidden sm:inline">/</span>

            {/* Bluesky */}
            <a
              href="https://bsky.app/profile/1bp7l.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover-underline inline-flex items-center"
              aria-label="bluesky"
            >
              <LinkSlant width={20} height={20} className="pika-icon shrink-0 inline-block" />
              <span className="hidden sm:inline ml-1.5">bluesky</span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
