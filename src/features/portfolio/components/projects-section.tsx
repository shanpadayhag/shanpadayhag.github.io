import { ArrowUpRight } from "lucide-react";
import { cn } from "@/core/class-names";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import ProjectVisual from "@/features/portfolio/components/project-visual";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="projects-title"
            className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
          >
            {portfolioContent.selectedTitle}
          </h2>
          <p className="text-muted-foreground max-w-[46ch] text-lg leading-relaxed">
            {portfolioContent.selectedIntroduction}
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
          {portfolioContent.projects.map((project, projectIndex) => (
            <article
              key={project.name}
              aria-labelledby={`project-${project.illustration}`}
              className={cn(
                "bg-card border-border flex flex-col overflow-hidden rounded-[2rem] border shadow-[0_18px_50px_-32px_rgb(14_21_18/0.4)]",
                projectIndex === 0 && "lg:row-span-2",
              )}
            >
              <div
                className={cn(
                  "bg-accent/70 min-h-64",
                  projectIndex === 0 && "lg:min-h-80 lg:flex-1",
                )}
              >
                <ProjectVisual project={project} />
              </div>
              <div
                className={cn(
                  "flex flex-col gap-4 p-7",
                  projectIndex !== 0 && "flex-1",
                )}
              >
                <div>
                  <h3
                    id={`project-${project.illustration}`}
                    className="text-2xl font-semibold tracking-[-0.02em]"
                  >
                    {project.name}
                  </h3>
                  <p className="text-primary mt-1 text-sm font-medium">
                    {project.category}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <p className="text-muted-foreground text-sm">{project.stack}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary mt-auto inline-flex w-fit items-center gap-1.5 pt-2 font-medium underline-offset-4 hover:underline"
                >
                  {portfolioContent.projectSourceAction}
                  <span className="sr-only">: {project.name}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
