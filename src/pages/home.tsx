import { Github, Linkedin, Mail, } from "lucide-react";

function Home() {
  return (
    <div className="w-full">
      <p className="text-xl font-medium">hi, i'm Abena 👋🏿</p>

      <div className="text-[18px] mt-4 leading-relaxed text-[#494949]">
        i'm a swe from 🇬🇭 & i enjoy building software. 
        i'm also interested in anything sports-related. 
        here, i document my experiences, learnings and my occasional side quests.
      </div>

      {/* "Get in touch" section */}
      <div className="flex flex-col gap-2 mt-16">
        <div className="text-[16px] font-medium ">get in touch</div>

        <div className="flex items-center gap-2.5  mt-1">
        <div className="hover:underline">

          <a 
            href="https://github.com/abena07" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:underline !text-[#494949]"
          >
            <Github size={16} />
            <span className="mt-1 text-[16px]">github</span>
          </a>

        </div>
          <span>/</span>

          <div className="hover:underline">
          <a 
            href="https://www.linkedin.com/in/phillipa-bennett-eghan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 !text-[#494949]"
          >
            <Linkedin size={16} />
            <span className="mt-2 text-[16px] ">linkedin</span>
          </a>
          </div>
          <span>/</span>

          <div className="hover:underline">
          <a 
            href="mailto:abenabennett@gmail.com"
            className="flex items-center space-x-1 hover:underline !text-[#494949]"
          >
            <Mail  size={16}/>
            <span className="mt-1 text-[16px]">email</span>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
