import { cn } from "@/core/class-names";
import {
  getProjectScreenshotHeight,
  getProjectScreenshotSource,
  getProjectScreenshotSourceSet,
  type ProjectScreenshot,
} from "@/features/portfolio/entities/project-screenshot";

type ProjectScreenshotFigureProps = {
  screenshot: ProjectScreenshot;
  isFeatured: boolean;
};

const largestScreenshotWidth = 1280;

export default function ProjectScreenshotFigure({
  screenshot,
  isFeatured,
}: ProjectScreenshotFigureProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-center gap-3 p-4 sm:p-5",
        isFeatured && "lg:p-8",
      )}
    >
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-[0_14px_36px_-24px_rgb(14_21_18/0.45)]">
        {/* A static export has no image optimizer; the sizes are prepared ahead. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getProjectScreenshotSource(
            screenshot.slug,
            largestScreenshotWidth,
          )}
          srcSet={getProjectScreenshotSourceSet(screenshot.slug)}
          sizes={
            isFeatured
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
          }
          width={largestScreenshotWidth}
          height={getProjectScreenshotHeight(largestScreenshotWidth)}
          alt={screenshot.alt}
          loading="lazy"
          decoding="async"
          className="block aspect-[16/10] h-auto w-full object-cover object-top"
        />
      </div>
      <figcaption className="text-muted-foreground text-xs">
        {screenshot.caption}
      </figcaption>
    </figure>
  );
}
