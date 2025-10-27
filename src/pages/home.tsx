import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

function Home() {
  return (
    <>
      <Helmet>
        <title>Abena — swe</title>
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

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-xl font-medium">hi, i'm Abena 👋🏿</p>

        <div className="text-[18px] mt-4 leading-relaxed text-[#494949]">
          i'm a swe from 🇬🇭 & i enjoy building software. 
          i'm also interested in anything sports-related. 
          here, i document my experiences, learnings and my occasional side quests.
        </div>

        <div className="text-[18px] mt-4 leading-relaxed text-[#494949]">
          outside of work, i'm a fellow @{" "}
          <a 
            href="https://hxilabs.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            hxi labs
          </a>
          {" "}where we design technology that amplifies human connection.
        </div>

        <div className="flex flex-col gap-2 mt-16">
          <div className="text-[16px] font-medium">get in touch</div>

          <div className="flex items-center gap-2.5 mt-1">
            <a href="https://github.com/abena07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-[#494949]">
              <Github size={16} />
              <span className="text-[16px]">github</span>
            </a>

            <span>/</span>

            <a href="https://www.linkedin.com/in/phillipa-bennett-eghan/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-[#494949]">
              <Linkedin size={16} />
              <span className="text-[16px]">linkedin</span>
            </a>

            <span>/</span>

            <a href="mailto:abenabennett@gmail.com" className="flex items-center gap-1 hover:underline text-[#494949]">
              <Mail size={16} />
              <span className="text-[16px]">email</span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
