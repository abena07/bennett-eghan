import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Helmet } from "react-helmet-async";

function Projects() {
  const projects = [
    {
      title: "lumon",
      description:
        "an ai-powered financial inclusion platform designed to improve access to lending and financial guidance for underserved communities.",
      tech: ["react", "typeScript", "tailwind", "go"],
      github: "https://github.com/COV-Lumon-Industries/lumon-tech-dashboard",
    },
    {
      title: "council",
      description:
        "council is your intelligent legal co-pilot — a case management platform powered by specialized AI agents working together like a legal team.",
      tech: ["react", "typeScript", "tailwind", "fastapi"],
      demo: "https://council.legal/",
    },
    {
      title: "fusion (open source)",
      description:
        "an open platform for self experimentation. see how changes in your behavior & bio-signals over time impact your life experiences.",
      tech: ["next", "node", "react native"],
      github: "https://github.com/peoray/fusion",
      demo: "https://usefusion.app/",
    },
    {
      title: "loop (open source)",
      description:
        "a learning aid PWA for practicing literally anything using spaced repetition.",
      tech: ["react"],
      github: "https://github.com/romeo-folie/LooP",
      demo: "https://app.codeloop.pro/",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Abena | projects</title>
        <meta
          name="description"
          content="a showcase of my projects."
        />
        <meta
          property="og:title"
          content="projects — Abena"
        />
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
        <p className="text-xl font-medium">featured projects 🚀</p>

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
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-[18px] font-medium">{project.title}</h3>
                  <p className="text-[16px] text-[#494949] mt-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[14px] px-2 py-1 bg-gray-100 text-[#494949] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 ml-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#494949] hover:text-black transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#494949] hover:text-black transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
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
