import { motion } from "framer-motion";
import { Github, LinkSlant } from "pikaicons";
import { Helmet } from "react-helmet-async";

function Projects() {
  const projects = [
    {
      title: "lumon",
      description:
        "an ai-powered financial inclusion platform designed to improve access to lending and financial guidance for underserved communities.",
      tech: ["react", "typeScript", "tailwind", "go"],
      github: "https://github.com/COV-Lumon-Industries/lumon-tech-dashboard",
      type: "open source",
    },
    {
      title: "council",
      description:
        "council is your intelligent legal co-pilot — a case management platform powered by specialized AI agents working together like a legal team.",
      tech: ["react", "typeScript", "tailwind", "fastapi"],
      demo: "https://council.legal/",
      type: "fellowship work",
    },
    {
      title: "fusion",
      description:
        "an open platform for self experimentation. see how changes in your behavior & bio-signals over time impact your life experiences.",
      tech: ["next", "node", "react native"],
      github: "https://github.com/peoray/fusion",
      demo: "https://usefusion.app/",
      type: "open source",
    },
    {
      title: "loop",
      description:
        "a learning aid PWA for practicing literally anything using spaced repetition.",
      tech: ["react"],
      github: "https://github.com/romeo-folie/LooP",
      demo: "https://app.codeloop.pro/",
      type: "open source",
    },
    {
      title: "chill seek",
      description: "find places to hangout with a single prompt",
      tech: ["react", ".Net"],
      demo: "https://chillseek.app",
      type: " personal",

    }
  ];

  return (
    <>
      <Helmet>
        <title>abena | projects</title>
        <meta name="description" content="things i have built" />
        <meta property="og:title" content="projects — abena" />
        <meta
          property="og:description"
          content="things i have built"
        />
        <meta
          property="og:image"
          content="https://www.bennett-eghan.com/og-main.png?v=2"
        />
        <meta
          property="og:url"
          content="https://www.bennett-eghan.com/projects"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <p className="text-[14px] font-medium text-[#0B0F1F]">featured projects</p>

        {/* Projects Grid - card layout */}
        <div className="mt-6 space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="overflow-hidden rounded-[4px] bg-[#E1E4EA]"
            >
              {/* Top graphic strip - subtle horizontal lines effect */}
              <div
                className="h-24 w-full opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    #0B0F1F 0px,
                    #0B0F1F 1px,
                    transparent 1px,
                    transparent 4px
                  )`,
                }}
              />

              {/* Content */}
              <div className="px-6 pb-6 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#0B0F1F] capitalize">
                      {project.title}
                    </h3>
                    <span className="text-[12px] font-medium uppercase tracking-wide text-[#0B0F1F]/80 mt-1 inline-block">
                      {project.type}
                    </span>
                    <p className="text-[14px] leading-relaxed text-[#0B0F1F] mt-3">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-[#0B0F1F]/80">
                      {project.tech.map((t, idx) => (
                        <span key={t} className="font-mono">
                          {t}
                          {idx !== project.tech.length - 1 && (
                            <span className="mx-1.5 text-[#0B0F1F]/50">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0B0F1F] hover:opacity-70 transition"
                        aria-label="GitHub"
                      >
                        <Github width={22} height={22} className="pika-icon shrink-0 inline-block" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0B0F1F] hover:opacity-70 transition"
                        aria-label="Demo"
                      >
                        <LinkSlant width={22} height={22} className="pika-icon shrink-0 inline-block" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* More Projects Link */}
        <div className="mt-12 text-[14px] text-[#0B0F1F]">
          see more on{" "}
          <a
            href="https://github.com/abena07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0B0F1F] hover:underline font-medium"
          >
            github
          </a>
        </div>
      </motion.div>
    </>
  );
}

export default Projects;
