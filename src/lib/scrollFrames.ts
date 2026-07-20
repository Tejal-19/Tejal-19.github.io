/*
  Scroll-driven "frame" motion. Unlike a typical scroll-reveal (binary:
  hidden, then IntersectionObserver flips one class and a CSS transition
  takes over), every value here is recomputed continuously from the actual
  scroll position — motion tracks the scrollbar directly, which is what
  makes it feel like moving through frames instead of a one-time fade.

  Three independent effects, all driven by the same rAF-batched scroll loop:
  - `.reveal`      entrance progress 0→1, consumed via the --p custom
                    property (see .reveal in global.css)
  - `[data-parallax]`  continuous depth offset based on distance from the
                    viewport center — the value is the parallax factor
  - `.timeline`    one progress value for the whole section, driving the
                    trajectory line's "draw on scroll" effect
*/

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function initScrollFrames() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const timelineEls = Array.from(document.querySelectorAll<HTMLElement>('.timeline'));

  if (reduceMotion) {
    revealEls.forEach((el) => el.style.setProperty('--p', '1'));
    timelineEls.forEach((el) => el.style.setProperty('--tl-progress', '1'));
    return;
  }

  if (!revealEls.length && !parallaxEls.length && !timelineEls.length) return;

  let scheduled = false;

  function update() {
    scheduled = false;
    const vh = window.innerHeight;

    for (const el of revealEls) {
      const top = el.getBoundingClientRect().top;
      const progress = clamp((vh - top) / (vh * 0.6), 0, 1);
      el.style.setProperty('--p', String(progress));
    }

    for (const el of parallaxEls) {
      const factor = parseFloat(el.dataset.parallax || '0');
      const rect = el.getBoundingClientRect();
      const centerDelta = rect.top + rect.height / 2 - vh / 2;
      el.style.setProperty('--py', `${(centerDelta * factor).toFixed(1)}px`);
    }

    for (const el of timelineEls) {
      const rect = el.getBoundingClientRect();
      const total = rect.height + vh * 0.5;
      const traveled = vh * 0.85 - rect.top;
      const progress = clamp(traveled / total, 0, 1);
      el.style.setProperty('--tl-progress', String(progress));
    }
  }

  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
