import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import ProjectCard from "@/features/portfolio/components/project-card";

export default function ProjectsSection() {
  const [featuredProject, ...otherProjects] = portfolioContent.projects;
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
        {featuredProject && (
          <div className="mt-12">
            <ProjectCard project={featuredProject} isFeatured />
          </div>
        )}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              isFeatured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
