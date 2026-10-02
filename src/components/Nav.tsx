"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { nav, site } from "@/data/site";
import { ArrowRight, Download } from "./Icons";

const sectionIds = nav.map((item) => item.href.split("#")[1]);

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  // Links back to the homepage from a case study slide in the "back" direction.
  const back = onHome ? undefined : ["nav-back"];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Scroll state: solid background once scrolled, tuck away while reading
  // downwards, return on any upward scroll, and track the current section.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      setScrolled(y > 8);
      if (y < 160) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);

      // The last nav section whose top has crossed 40% of the viewport is
      // current; Contact has its own button, so it clears the pill.
      let current: string | null = null;
      if (onHome) {
        const line = window.innerHeight * 0.4;
        for (const id of [...sectionIds, "contact"]) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id === "contact" ? null : id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Sliding pill behind the active link.
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const wasActive = useRef(false);
  const [pill, setPill] = useState<CSSProperties>({ opacity: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? links.current[active] : null;
      if (!el) {
        wasActive.current = false;
        return setPill((p) => ({ ...p, opacity: 0 }));
      }
      setPill({
        translate: `${el.offsetLeft}px 0`,
        width: el.offsetWidth,
        opacity: 1,
        // Appearing from nothing: fade in place rather than sliding from the edge.
        transitionProperty: wasActive.current ? undefined : "opacity",
      });
      wasActive.current = true;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const solid = scrolled || open;

  return (
    <header
      data-hidden={hidden && !open ? "" : undefined}
      style={{ viewTransitionName: "site-header" }}
      className={`site-header fixed inset-x-0 top-0 z-50 border-b ${
        solid ? "border-line bg-bg/75 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" transitionTypes={back} className="group text-lg font-semibold tracking-tight">
          {site.shortName}
          <span className="inline-block text-accent transition-transform duration-500 ease-expo group-hover:scale-150">
            .
          </span>
        </Link>

        <div className="relative hidden md:block">
          <span
            aria-hidden
            style={pill}
            className="nav-pill absolute inset-y-0 left-0 my-auto h-8 rounded-full border border-line-strong bg-white/[0.04]"
          />
          <ul className="flex items-center gap-2">
            {nav.map((item, i) => {
              const id = sectionIds[i];
              return (
                <li key={item.href}>
                  <Link
                    ref={(el) => {
                      links.current[id] = el;
                    }}
                    href={item.href}
                    transitionTypes={back}
                    data-scramble-hover
                    aria-current={active === id ? "true" : undefined}
                    className={`relative block rounded-full px-3 py-1.5 font-mono text-sm transition-colors duration-300 hover:text-fg ${
                      active === id ? "text-fg" : "text-muted"
                    }`}
                  >
                    <span data-scramble-text>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {site.cv && (
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              CV <Download className="size-3.5 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
            </a>
          )}
          <Link
            href="/#contact"
            transitionTypes={back}
            data-magnetic
            className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg hover:bg-accent-soft"
          >
            Contact
            <ArrowRight className="size-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 rounded-lg p-2 text-fg md:hidden"
        >
          <span aria-hidden className="burger relative block size-5">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <div id="mobile-menu" data-open={open ? "" : undefined} inert={!open} className="mobile-menu">
        <div>
          <div className="border-t border-line bg-bg px-4 pb-6 pt-2">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href} data-item style={{ ["--i" as string]: i }}>
                  <Link
                    href={item.href}
                    transitionTypes={back}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-lg"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div data-item style={{ ["--i" as string]: nav.length }} className="mt-6 flex gap-3">
              <Link
                href="/#contact"
                transitionTypes={back}
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-fg px-4 py-3 text-sm font-medium text-bg"
              >
                Contact <ArrowRight className="size-3.5" />
              </Link>
              {site.cv && (
                <a
                  href={site.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong px-4 py-3 text-sm"
                >
                  CV <Download className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <span aria-hidden className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-accent via-accent-soft to-accent" />
    </header>
  );
}
