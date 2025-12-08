import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { title } from "process";
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
        <title>Abena | projects</title>
        <meta name="description" content="a showcase of my projects." />
        <meta property="og:title" content="projects — Abena" />
        <meta
          property="og:description"
          content="building intelligent, human-centered, and open tools."
        />
        <meta
          property="og:image"
          content="https://www.bennett-eghan.com/og.png"
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
        <p className="text-xl font-medium">featured projects</p>

        {/* Projects Grid */}
        <div className="mt-6 space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                <div className="flex-1">
                  {/* Title with colored pill background and dot */}
                  <div className="flex items-center gap-2 mb-3">
                    <p
                      className={`text-[16px] font-semibold inline-flex items-center gap-3 px-2 py-0.5 rounded-full uppercase ${project.type.includes("open source")
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : project.type.includes("personal")
                            ? "bg-pink-50 text-pink-700 border border-pink-200"
                            : "bg-purple-50 text-purple-700 border border-purple-200"

                        }`}
                    >
                      {project.title}
                    </p>

                    {/* Colored dot */}
                    <span
                      className={`w-2 h-2 rounded-full ${project.type.includes("open source")
                          ? "bg-yellow-500"
                          : "bg-purple-500"
                        }`}
                    ></span>

                    {/* Type tag */}
                    <span
                      className={`text-[16px] font-medium uppercase ${project.type.includes("open source")
                          ? "text-yellow-600"
                          : project.type.includes("personal")
                            ? "text-pink-600"
                            : "text-purple-600"

                        }`}
                    >
                      {project.type}
                    </span>
                  </div>

                  <p className="text-[17px] leading-relaxed text-gray-600">
                    {project.description}
                  </p>

                  {/* Tech stack with gray dots */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    {project.tech.map((t, idx) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="font-mono">{t}</span>
                        {idx !== project.tech.length - 1 && (
                          <span className="w-1 h-1 rounded-full bg-gray-400 inline-block"></span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 text-gray-500 mt-4 sm:mt-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 transition"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 transition"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects Link */}
        <div className="mt-12 text-[16px] text-[#494949]">
          see more on{" "}
          <a
            href="https://github.com/abena07"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            github
          </a>
        </div>
      </motion.div>
    </>
  );
}

export default Projects;
