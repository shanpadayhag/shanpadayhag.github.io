import { ChevronRight } from "lucide-react";
import type { PortfolioProject } from "@/features/portfolio/data_sources/content/portfolio-content";

type ProjectVisualProps = {
  project: PortfolioProject;
};

function AuthenticationVisual({ diagramLabels }: { diagramLabels: string[] }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-7 p-8">
      <div className="border-brand/40 grid size-32 place-items-center rounded-full border border-dashed">
        <div className="bg-brand text-background grid size-20 place-items-center rounded-full shadow-[0_12px_30px_-12px_var(--brand)]">
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="size-10 fill-none stroke-current stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M24 5 9 11v12c0 10 15 20 15 20s15-10 15-20V11Z" />
            <path d="m17 24 5 5 10-11" />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-medium">
        {diagramLabels.slice(0, 3).map((diagramLabel, labelIndex) => (
          <span key={diagramLabel} className="flex items-center gap-1.5">
            {labelIndex > 0 && (
              <ChevronRight
                aria-hidden="true"
                className="text-muted-foreground size-4"
              />
            )}
            <span className="bg-card border-border rounded-full border px-3 py-1.5">
              {diagramLabel}
            </span>
          </span>
        ))}
      </div>
      <div className="text-muted-foreground flex flex-wrap justify-center gap-2 text-xs">
        {diagramLabels.slice(3).map((diagramLabel) => (
          <span
            key={diagramLabel}
            className="bg-background/70 rounded-full px-2.5 py-1"
          >
            {diagramLabel}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  const diagramLabels = project.diagramLabels ?? [];
  return (
    <div role="img" aria-label={project.illustrationLabel} className="h-full">
      {project.illustration === "auth" && (
        <AuthenticationVisual diagramLabels={diagramLabels} />
      )}
    </div>
  );
}
