"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "./Icons";
import { ProjectBadge, ProjectTitle } from "./ui";

// The "Next project" card at the end of a case study. Its badge and title morph
// into the next case study's header, but they only take the shared names once
// clicked. Otherwise, arriving on this page from the homepage (where every
// project card is on screen) would pair them with the wrong card.
export default function NextProject({ slug, title }: { slug: string; title: string }) {
  const [armed, setArmed] = useState(false);

  return (
    <Link
      href={`/work/${slug}`}
      transitionTypes={["nav-forward"]}
      onClick={() => setArmed(true)}
      data-spotlight
      className="spotlight-card group mt-10 flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong hover:bg-surface-2 sm:p-8"
    >
      <div className="flex items-center gap-5">
        <ProjectBadge
          slug={slug}
          shared={armed}
          className="shrink-0 transition-[border-color] duration-500 group-hover:border-accent/50"
        />
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">Next project</p>
          <p className="mt-2">
            <ProjectTitle slug={slug} shared={armed} className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </ProjectTitle>
          </p>
        </div>
      </div>
      <ArrowRight className="size-6 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />
    </Link>
  );
}
