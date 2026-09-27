import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { Container, Tag } from "@/components/ui";
import { getProject, projects } from "@/data/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <Container className="max-w-4xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft /> All work
        </Link>

        <header className="mt-10 border-b border-line pb-12">
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
            {project.category}
          </p>
          <h1 data-reveal className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {project.title}
          </h1>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {project.summary}
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </header>

        <section className="py-14" aria-labelledby="overview">
          <h2 id="overview" data-reveal className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Overview
          </h2>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {project.overview.map((o) => (
              <div key={o.label} data-reveal className="bg-surface p-6">
                <dt className="font-mono text-xs text-accent-soft">{o.label}</dt>
                <dd className="mt-2 leading-relaxed">{o.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {project.methodology.length > 0 && (
          <section className="border-t border-line py-14" aria-labelledby="method">
            <h2 id="method" data-reveal className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Methodology
            </h2>
            <ol className="relative">
              {project.methodology.map((s, n) => (
                <li key={s.title} data-reveal className="relative flex gap-6 pb-10 last:pb-0">
                  {n < project.methodology.length - 1 && (
                    <span className="absolute left-[21px] top-12 bottom-0 w-px bg-line" aria-hidden />
                  )}
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-sm text-accent-soft">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {project.evidence.length > 0 && (
          <section className="border-t border-line py-14" aria-labelledby="evidence">
            <h2 id="evidence" data-reveal className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Evidence
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {project.evidence.map((e) => (
                <figure key={e.src} data-reveal className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image src={e.src} alt={e.caption} width={e.width} height={e.height} className="h-auto w-full" />
                  <figcaption className="border-t border-line px-5 py-3 font-mono text-xs text-muted">
                    {e.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.sections.map((s) => (
          <section key={s.title} className="border-t border-line py-14">
            <h2 data-reveal className="mb-6 text-2xl font-semibold tracking-tight">
              {s.title}
            </h2>
            <ul className="space-y-4">
              {s.items.map((item) => (
                <li key={item} data-reveal className="flex gap-4 leading-relaxed text-muted">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 border-t border-line py-14">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg"
              >
                {l.label} <ArrowRight />
              </a>
            ))}
          </div>
        )}

        <Link
          href={`/work/${next.slug}`}
          className="group mt-10 flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2 sm:p-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">Next project</p>
            <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{next.title}</p>
          </div>
          <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </article>
  );
}
