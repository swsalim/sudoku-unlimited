export function smoothScrollToId(id: string, prefersReducedMotion: boolean) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });

  if (typeof history !== 'undefined' && history.pushState) {
    history.pushState(null, '', `#${id}`);
  }
}
