export function resolveNotebookProgress(progress: number, singlePage: boolean) {
  const clamped = Number.isFinite(progress)
    ? Math.max(0, Math.min(1, progress))
    : 0;
  if (singlePage) {
    const position = clamped * 4;
    const page = Math.min(3, Math.floor(position));
    return {
      page,
      turn:
        page === 3
          ? 0
          : Math.max(0, Math.min(1, (position - page - 0.78) / 0.22)),
    };
  }
  return {
    page: clamped < 0.5 ? 0 : 2,
    turn: Math.max(0, Math.min(1, (clamped - 0.38) / 0.24)),
  };
}

export function updateNotebook(surface: HTMLElement, progress: number) {
  const book = surface.querySelector<HTMLElement>(".notebook-book");
  const leaf = surface.querySelector<HTMLElement>(".notebook-leaf");
  if (!book || !leaf) return;
  const single = surface.clientWidth < 560;
  const { page, turn } = resolveNotebookProgress(progress, single);
  book.dataset.layout = single ? "single" : "spread";
  book.dataset.page = String(page);
  leaf.style.transform = single ? "none" : `rotateY(${-180 * turn}deg)`;
  for (const sheet of book.querySelectorAll<HTMLElement>(".notebook-page")) {
    const index = Number(sheet.dataset.page);
    if (single) {
      const current = index === page;
      const next = index === page + 1 && turn > 0;
      sheet.style.visibility = current || next ? "visible" : "hidden";
      sheet.style.opacity = current ? String(1 - turn) : "1";
      sheet.style.transform = current ? `rotateY(${-90 * turn}deg)` : "none";
      sheet.style.zIndex = current ? "2" : "1";
      sheet.inert = !current || turn > 0.5;
    } else {
      sheet.removeAttribute("style");
      sheet.inert = index < 2 ? turn > 0.5 : turn < 0.5;
    }
  }
  const status = surface.querySelector(".notebook-page-status");
  if (status)
    status.textContent = single
      ? `Page ${page + 1} / 4`
      : `Pages ${page + 1}–${page + 2} / 4`;
  const previous = surface.querySelector<HTMLButtonElement>(
    '[data-page-turn="previous"]',
  );
  const next = surface.querySelector<HTMLButtonElement>(
    '[data-page-turn="next"]',
  );
  if (previous) previous.disabled = page === 0;
  if (next) next.disabled = page === (single ? 3 : 2);
}
