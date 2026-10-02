"use client";

import { useEffect } from "react";
import { scramble } from "@/lib/scramble";

// One delegated listener for every pointer-driven effect on the site:
//   [data-spotlight]       receives --mx / --my, the cursor position inside it
//   [data-magnetic]        leans a few pixels toward the cursor
//   [data-scramble-hover]  decrypts its [data-scramble-text] child on hover
// Mouse and trackpad only; touch input never triggers any of it.
export default function PointerEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pending: PointerEvent | null = null;
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const release = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const update = () => {
      raf = 0;
      const e = pending;
      if (!e || !(e.target instanceof Element)) return;

      const spot = e.target.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const m = reduced.matches ? null : e.target.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) release();
      if (m) {
        // Measure from the resting position: subtract the live (mid-transition)
        // offset so the pull doesn't feed back on itself.
        const r = m.getBoundingClientRect();
        const live = getComputedStyle(m).translate;
        const [ox = 0, oy = 0] = live === "none" ? [] : live.split(" ").map(parseFloat);
        const dx = e.clientX - (r.left - ox + r.width / 2);
        const dy = e.clientY - (r.top - oy + r.height / 2);
        m.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.32).toFixed(1)}px`;
        magnet = m;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !finePointer.matches) return;
      pending = e;
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced.matches || !(e.target instanceof Element)) return;
      const host = e.target.closest<HTMLElement>("[data-scramble-hover]");
      // Only fire when the pointer arrives from outside the host.
      if (!host || (e.relatedTarget instanceof Node && host.contains(e.relatedTarget))) return;
      const text = host.querySelector<HTMLElement>("[data-scramble-text]");
      if (text) scramble(text, 420);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);

    return () => {
      cancelAnimationFrame(raf);
      release();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  return null;
}
