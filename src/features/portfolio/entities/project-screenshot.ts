export const projectScreenshotWidths = [640, 1280] as const;

export const projectScreenshotAspect = { width: 16, height: 10 } as const;

export type ProjectScreenshotSlug = "daibx" | "savings-tracker" | "study-aid";

export type ProjectScreenshot = {
  slug: ProjectScreenshotSlug;
  alt: string;
  caption: string;
};

export function getProjectScreenshotHeight(width: number) {
  return (
    (width * projectScreenshotAspect.height) / projectScreenshotAspect.width
  );
}

export function getProjectScreenshotSource(
  slug: ProjectScreenshotSlug,
  width: (typeof projectScreenshotWidths)[number],
) {
  return `/projects/${slug}-${width}.webp`;
}

export function getProjectScreenshotSourceSet(slug: ProjectScreenshotSlug) {
  return projectScreenshotWidths
    .map((width) => `${getProjectScreenshotSource(slug, width)} ${width}w`)
    .join(", ");
}
