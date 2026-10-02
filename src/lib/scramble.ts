// "Decrypts" an element's text: characters cycle through random glyphs and lock
// in left to right. The real text never leaves the DOM (screen readers and
// copy/paste see it unchanged); the glyphs live in a temporary aria-hidden
// overlay. Works best on monospace text, where every glyph has the same width.

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=";
const LOWER = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+/<>=";

const active = new WeakSet<HTMLElement>();

const pick = (pool: string) => pool[Math.floor(Math.random() * pool.length)];

export function scramble(el: HTMLElement, duration = 650) {
  const text = el.textContent ?? "";
  if (active.has(el) || !text.trim()) return;
  active.add(el);

  const overlay = document.createElement("span");
  overlay.className = "scramble-overlay";
  overlay.setAttribute("aria-hidden", "true");
  el.classList.add("scrambling");
  el.appendChild(overlay);

  // Each character locks in at its own moment, roughly left to right.
  const chars = [...text];
  const lockAt = chars.map((_, i) => (i / chars.length) * duration * 0.7 + Math.random() * duration * 0.3);
  const render = (t: number) => {
    overlay.textContent = chars
      .map((c, i) => {
        if (t >= lockAt[i] || !/[a-z0-9]/i.test(c)) return c;
        return pick(c === c.toLowerCase() && c !== c.toUpperCase() ? LOWER : UPPER);
      })
      .join("");
  };

  const start = performance.now();
  let frame = 0;
  render(0);

  const tick = (now: number) => {
    const t = now - start;
    // Re-roll glyphs every other frame so the noise reads as flicker, not blur.
    if (++frame % 2 === 0 || t >= duration) render(t);
    if (t < duration) {
      requestAnimationFrame(tick);
    } else {
      overlay.remove();
      el.classList.remove("scrambling");
      active.delete(el);
    }
  };
  requestAnimationFrame(tick);
}
