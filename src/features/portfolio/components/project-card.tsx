import { ArrowUpRight } from "lucide-react";
import { cn } from "@/core/class-names";
import {
  portfolioContent,
  type PortfolioProject,
} from "@/features/portfolio/data_sources/content/portfolio-content";
import ProjectVisual from "@/features/portfolio/components/project-visual";

type ProjectCardProps = {
  project: PortfolioProject;
  isFeatured: boolean;
};

export default function ProjectCard({ project, isFeatured }: ProjectCardProps) {
  const projectLinks = [
    { label: portfolioContent.projectSourceAction, href: project.href },
    ...(project.additionalLinks ?? []),
  ];
  return (
    <article
      aria-labelledby={`project-${project.illustration}`}
      className={cn(
        "bg-card border-border flex flex-col overflow-hidden rounded-[2rem] border shadow-[0_18px_50px_-32px_rgb(14_21_18/0.4)]",
        isFeatured && "lg:grid lg:grid-cols-2",
      )}
    >
      <div className={cn("bg-accent/70 min-h-64", isFeatured && "lg:min-h-96")}>
        <ProjectVisual project={project} />
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-7",
          isFeatured && "lg:justify-center lg:p-10",
        )}
      >
        <div>
          <h3
            id={`project-${project.illustration}`}
            className={cn(
              "text-2xl font-semibold tracking-[-0.02em]",
              isFeatured && "lg:text-4xl",
            )}
          >
            {project.name}
          </h3>
          <p className="text-primary mt-1 text-sm font-medium">
            {project.category}
          </p>
        </div>
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            isFeatured && "lg:text-lg",
          )}
        >
          {project.description}
        </p>
        <p className="text-muted-foreground text-sm">{project.stack}</p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          {project.note && (
            <p className="text-muted-foreground text-sm">{project.note}</p>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {projectLinks.map((projectLink) => (
              <a
                key={projectLink.href}
                href={projectLink.href}
                target="_blank"
                rel="noreferrer"
                className="text-primary inline-flex w-fit items-center gap-1.5 font-medium underline-offset-4 hover:underline"
              >
                {projectLink.label}
                <span className="sr-only">: {project.name}</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
