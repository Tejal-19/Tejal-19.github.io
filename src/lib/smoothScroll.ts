import Lenis from 'lenis';

/*
  Lenis smooths scroll input (wheel/touch) into eased motion instead of the
  browser's default per-notch jump — it's what makes scroll-linked effects
  (see scrollFrames.ts) read as continuous camera-like movement rather than
  a slideshow. `anchors` makes it also smooth-scroll same-page nav links
  (#about, #contact, ...), offset to clear the fixed nav bar.
*/
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  return new Lenis({
    autoRaf: true,
    lerp: 0.1,
    anchors: { offset: -64 }, // must match --nav-height in tokens.css
  });
}
