/*
  A small hand-rolled typing effect, replacing the old site's typed.js
  dependency. The idea: hold an array of strings, type one out character by
  character with setTimeout, pause, delete it, move to the next string, loop
  forever. No library needed for something this small.
*/
export function typewriter(el: HTMLElement, words: string[], opts: { typeMs?: number; deleteMs?: number; holdMs?: number } = {}) {
  const { typeMs = 65, deleteMs = 35, holdMs = 1600 } = opts;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, holdMs);
        return;
      }
      setTimeout(tick, typeMs);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(tick, deleteMs);
    }
  }

  tick();
}
