"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { scramble } from "@/lib/scramble";

// Fades in any element marked with `data-reveal` as it scrolls into view, and
// decrypts any `data-scramble` text the first time it is seen.
export default function RevealObserver() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // A layout effect, so that after a client-side navigation it runs before the
  // view transition snapshots the new page.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }

    // On client-side navigations the page transition is the entrance, so
    // anything already on screen appears settled instead of fading in late.
    if (!firstRender.current) {
      const vh = window.innerHeight;
      const onScreen = els.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      if (onScreen.length) {
        root.classList.add("reveal-instant");
        onScreen.forEach((el) => el.setAttribute("data-visible", ""));
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("reveal-instant")));
      }
    }
    firstRender.current = false;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            reveal.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.filter((el) => !el.hasAttribute("data-visible")).forEach((el) => reveal.observe(el));

    const timers: number[] = [];
    const decrypt = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          decrypt.unobserve(el);
          timers.push(window.setTimeout(() => scramble(el), Number(el.dataset.scrambleDelay ?? 120)));
        }
      },
      { threshold: 0.6 },
    );
    if (!reduced) {
      document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => decrypt.observe(el));
    }

    return () => {
      reveal.disconnect();
      decrypt.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
