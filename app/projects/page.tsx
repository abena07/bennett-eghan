import type { Metadata } from "next";
import { Github, LinkSlant } from "pikaicons";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "phil | projects",
  description: "things i have built",
  openGraph: {
    title: "projects | phil",
    description: "things i have built",
    url: "https://www.bennett-eghan.com/projects",
    type: "website",
  },
};

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

export default function Projects() {
  return (
    <FadeIn className="w-full">
      <p className="text-[16px] font-extrabold text-[#0B0F1F]">projects</p>

      <div className="mt-4 space-y-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden rounded-[4px] bg-[#E1E4EA]"
          >
            <div
              className="h-24 w-full opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg,#0B0F1F 0px,#0B0F1F 1px,transparent 1px,transparent 4px)`,
              }}
            />

            <div className="px-6 pb-5 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold text-[#0B0F1F] capitalize">
                    {project.title}
                  </h3>
                  <span className="text-[12px] font-medium uppercase tracking-wide text-[#0B0F1F]/80 mt-1 inline-block">
                    {project.type}
                  </span>
                  <p className="text-[12px] leading-normal text-[#0B0F1F] mt-2">
                    {project.description}
                  </p>
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
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0B0F1F] hover:opacity-70 transition"
                      aria-label="GitHub"
                    >
                      <Github
                        width={22}
                        height={22}
                        className="pika-icon shrink-0 inline-block"
                      />
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
                      <LinkSlant
                        width={22}
                        height={22}
                        className="pika-icon shrink-0 inline-block"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

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
    </FadeIn>
  );
}
