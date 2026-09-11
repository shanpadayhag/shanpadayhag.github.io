import type { PortfolioProject } from "../content";

export function ProjectVisual({ project }: { project: PortfolioProject }) {
  return (
    <div
      className={`project-visual project-visual-${project.illustration}`}
      role="img"
      aria-label={project.illustrationLabel}
    >
      {project.illustration === "auth" && (
        <div className="auth-diagram">
          <div className="auth-orbit" />
          <div className="auth-core">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M24 5 9 11v12c0 10 15 20 15 20s15-10 15-20V11Z" />
              <path d="m17 24 5 5 10-11" />
            </svg>
          </div>
          <div className="auth-flow">
            {project.diagramLabels.slice(0, 3).map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="auth-annotations">
            {project.diagramLabels.slice(3).map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      )}
      {project.illustration === "ledger" && (
        <div className="ledger-diagram">
          {project.diagramLabels.map((label, index) => (
            <div
              className="ledger-sheet"
              key={label}
              style={{ "--sheet-index": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <div className="ledger-lines">
                <i />
                <i />
                <i />
              </div>
              <b aria-hidden="true">↗</b>
            </div>
          ))}
        </div>
      )}
      {project.illustration === "study" && (
        <div className="study-diagram">
          <div className="study-cards">
            {project.diagramLabels.slice(0, 3).map((label, index) => (
              <div
                className="study-card"
                key={label}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                <span>{label}</span>
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="32" />
                  <ellipse cx="50" cy="50" rx="15" ry="32" />
                  <path d="M18 50h64M24 32h52M24 68h52" />
                </svg>
              </div>
            ))}
          </div>
          <p>{project.diagramLabels[3]}</p>
        </div>
      )}
    </div>
  );
}
