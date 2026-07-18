import { motion } from "framer-motion";
import { Github, LinkSlant } from "pikaicons";
import { Helmet } from "react-helmet-async";

function Projects() {
  const projects = [
    {
      title: "baremetal",
      description:
        "a concurrent TCP server with a custom wire protocol, built from scratch in Go.",
      tech: ["go"],
      github: "https://github.com/abena07/baremetal",
      type: "personal",
    },
    {
      title: "publr",
      description:
        "a mini server that helps you post photos to your website & any social media of your choice (supports Instagram currently).",
      tech: ["python", "fastapi", "typeScript", "postgresql"],
      github: "https://github.com/abena07/publr",
      demo: "https://publr.bennett-eghan.com/",
      type: "personal",
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
  ];

  return (
    <>
      <Helmet>
        <title>phil | projects</title>
        <meta name="description" content="things i have built" />
        <meta property="og:title" content="projects | phil" />
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
        <p className="text-[16px] font-extrabold text-[#0B0F1F]">projects</p>

        {/* Projects Grid - card layout */}
        <div className="mt-4 space-y-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="overflow-hidden rounded-[4px] bg-[#E1E4EA]"
            >
              {/* Top graphic strip */}
              <div
                className="h-24 w-full opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg,#0B0F1F 0px,#0B0F1F 1px,transparent 1px,transparent 4px)`,
                }}
              />

              {/* Content */}
              <div className="px-6 pb-5 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#0B0F1F] capitalize">{project.title}</h3>
                    <span className="text-[12px] font-medium uppercase tracking-wide text-[#0B0F1F]/80 mt-1 inline-block">
                      {project.type}
                    </span>
                    <p className="text-[12px] leading-normal text-[#0B0F1F] mt-2">{project.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-[#0B0F1F]/80">
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
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-[#0B0F1F] hover:opacity-70 transition" aria-label="GitHub">
                        <Github width={22} height={22} className="pika-icon shrink-0 inline-block" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="text-[#0B0F1F] hover:opacity-70 transition" aria-label="Demo">
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
        <div className="mt-10 text-[14px] leading-normal text-[#0B0F1F]">
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
