import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data/work";
import { ArrowRight, Cube, Layout, Network, Shield } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeader({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <div data-reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span> / {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
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

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = projectIcons[project.slug] ?? Cube;
  return (
    <Link
      href={`/work/${project.slug}`}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${(index % 2) * 90}ms` }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-surface-2 sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/15"
      />
      <div className="mb-10 flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg text-accent-soft transition-colors group-hover:border-accent/40">
          <Icon />
        </span>
        <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-accent-soft">{project.category}</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
        {project.cta}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
