/*
  Scroll-reveal: elements with class="reveal" start hidden (see .reveal in
  global.css) and fade/slide in once they cross into the viewport.
  IntersectionObserver is the browser API for "tell me when this element
  becomes visible" — cheaper than a scroll listener recalculating every
  element's position on every scroll tick.
*/
export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}
