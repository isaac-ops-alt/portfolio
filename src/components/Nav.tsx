"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/data/site";
import { ArrowRight, Close, Download, Menu } from "./Icons";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-mono text-sm text-muted transition-colors hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {site.cv && (
            <a
              href={site.cv}
              className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              CV <Download className="size-3.5" />
            </a>
          )}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
          >
            Contact <ArrowRight className="size-3.5" />
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
          {open ? <Close /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-fg px-4 py-3 text-sm font-medium text-bg"
            >
              Contact <ArrowRight className="size-3.5" />
            </Link>
            {site.cv && (
              <a
                href={site.cv}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong px-4 py-3 text-sm"
              >
                CV <Download className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
