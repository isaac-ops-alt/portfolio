import Link from "next/link";
import { Fragment, ViewTransition, type ReactNode } from "react";
import type { Project } from "@/data/work";
import { ArrowRight, Cube, Layout, Network, Shield } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

// Slides the page out and the next one in, in the direction of travel: links
// tagged `nav-forward` go deeper, `nav-back` returns. Untagged navigations
// (browser back/forward) just swap, though shared elements still morph.
const directional = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}

// Wraps each word in a mask so headings can rise out from their baseline.
// Animated by `.intro-words` on load or by a revealed `[data-reveal]` ancestor.
export function SplitWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="word">
        <span style={{ ["--i" as string]: i }}>{word}</span>
      </span>
    </Fragment>
  ));
}

export function SectionHeader({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <div data-reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span> / <span data-scramble>{eyebrow}</span>
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        {typeof title === "string" ? <SplitWords text={title} /> : title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="group/tag inline-flex cursor-default items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft">
      <span
        aria-hidden
        className="size-1 rounded-full bg-muted transition-colors duration-200 group-hover/tag:bg-accent"
      />
      {children}
    </span>
  );
}

const projectIcons: Record<string, (p: { className?: string }) => ReactNode> = {
  "penetration-testing-lab": Shield,
  "enterprise-network": Network,
  "orvexa-labs": Cube,
  "this-portfolio": Layout,
};

// The icon badge and title are shared elements: they travel from the card into
// the case-study header (and back) during navigation. `shared={false}` leaves
// an instance out of any morph until it is needed (see NextProject).
export function ProjectBadge({ slug, className = "", shared = true }: { slug: string; className?: string; shared?: boolean }) {
  const Icon = projectIcons[slug] ?? Cube;
  return (
    <ViewTransition name={shared ? `project-icon-${slug}` : undefined} share="morph" default="none">
      <span
        className={`grid size-11 place-items-center rounded-xl border border-line bg-bg text-accent-soft ${className}`}
      >
        <Icon />
      </span>
    </ViewTransition>
  );
}

export function ProjectTitle({
  slug,
  children,
  className,
  shared = true,
}: {
  slug: string;
  children: ReactNode;
  className: string;
  shared?: boolean;
}) {
  return (
    <ViewTransition name={shared ? `project-title-${slug}` : undefined} share="morph-text" default="none">
      <span className={`block ${className}`}>{children}</span>
    </ViewTransition>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      transitionTypes={["nav-forward"]}
      data-reveal
      data-spotlight
      style={{ ["--reveal-delay" as string]: `${(index % 2) * 90}ms` }}
      className="spotlight-card group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-surface-2 sm:p-8"
    >
      <div className="mb-10 flex items-start justify-between">
        <ProjectBadge
          slug={project.slug}
          className="transition-[border-color,box-shadow] duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_24px_-4px_rgb(124_92_255/0.6)]"
        />
        <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-accent-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-accent-soft">{project.category}</p>
      <h3 className="mt-2">
        <ProjectTitle slug={project.slug} className="font-display text-2xl font-semibold tracking-tight">
          {project.title}
        </ProjectTitle>
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
        {project.cta}
        <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}
