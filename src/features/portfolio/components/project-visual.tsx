import { ArrowUpRight, ChevronRight } from "lucide-react";
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

function LedgerVisual({ diagramLabels }: { diagramLabels: string[] }) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="w-full max-w-[17rem] space-y-2.5">
        {diagramLabels.map((diagramLabel, sheetIndex) => (
          <div
            key={diagramLabel}
            className="bg-card border-border flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-[0_8px_20px_-14px_rgb(14_21_18/0.4)]"
            style={{ marginInlineStart: `${sheetIndex * 0.9}rem` }}
          >
            <div className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{diagramLabel}</span>
              <span className="mt-2 flex gap-1.5" aria-hidden="true">
                <i className="bg-brand/45 h-1 w-10 rounded-full" />
                <i className="bg-border h-1 w-6 rounded-full" />
                <i className="bg-border h-1 w-8 rounded-full" />
              </span>
            </div>
            <ArrowUpRight aria-hidden="true" className="text-brand size-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyVisual({ diagramLabels }: { diagramLabels: string[] }) {
  const cardTilts = ["-rotate-8", "rotate-0 -translate-y-3", "rotate-8"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-end justify-center">
        {diagramLabels.slice(0, 3).map((diagramLabel, cardIndex) => (
          <div
            key={diagramLabel}
            className={`bg-card border-border -mx-1.5 flex h-36 w-28 flex-col justify-between rounded-2xl border p-3 shadow-[0_12px_24px_-16px_rgb(14_21_18/0.45)] ${cardTilts[cardIndex] ?? ""}`}
          >
            <span className="text-sm font-medium">{diagramLabel}</span>
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="stroke-brand size-14 self-center fill-none stroke-[3]"
            >
              <circle cx="50" cy="50" r="32" />
              <ellipse cx="50" cy="50" rx="15" ry="32" />
              <path d="M18 50h64M24 32h52M24 68h52" />
            </svg>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-sm">{diagramLabels[3]}</p>
    </div>
  );
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  return (
    <div role="img" aria-label={project.illustrationLabel} className="h-full">
      {project.illustration === "auth" && (
        <AuthenticationVisual diagramLabels={project.diagramLabels} />
      )}
      {project.illustration === "ledger" && (
        <LedgerVisual diagramLabels={project.diagramLabels} />
      )}
      {project.illustration === "study" && (
        <StudyVisual diagramLabels={project.diagramLabels} />
      )}
    </div>
  );
}
