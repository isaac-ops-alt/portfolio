import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import NextProject from "@/components/NextProject";
import { Container, PageTransition, ProjectBadge, ProjectTitle, Tag } from "@/components/ui";
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

// Delay for a step of the header's load sequence.
const at = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];

  return (
    <PageTransition>
      <article className="pb-24 pt-32 md:pt-40">
        <Container className="max-w-4xl">
          <Link
            href="/#work"
            transitionTypes={["nav-back"]}
            style={at(0)}
            className="intro group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-x-1" /> All
            work
          </Link>

          {/* The badge and title are shared elements that arrive from the card. */}
          <header className="mt-10 border-b border-line pb-12">
            <div className="flex items-center gap-4">
              <ProjectBadge slug={project.slug} />
              <p style={at(150)} className="intro font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
                <span data-scramble data-scramble-delay="250">
                  {project.category}
                </span>
              </p>
            </div>
            <h1 className="mt-6">
              <ProjectTitle
                slug={project.slug}
                className="font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl"
              >
                {project.title}
              </ProjectTitle>
            </h1>
            <p style={at(250)} className="intro mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              {project.summary}
            </p>
            <div style={at(350)} className="intro mt-8 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </header>

          <section className="py-14" aria-labelledby="overview">
            <h2 id="overview" data-reveal className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span data-scramble>Overview</span>
            </h2>
            <dl
              data-spotlight
              className="spotlight-grid grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
            >
              {project.overview.map((o, n) => (
                <div
                  key={o.label}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(n % 2) * 80}ms` }}
                  className="bg-surface p-6"
                >
                  <dt className="font-mono text-xs text-accent-soft">{o.label}</dt>
                  <dd className="mt-2 leading-relaxed">{o.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {project.methodology.length > 0 && (
            <section className="border-t border-line py-14" aria-labelledby="method">
              <h2 id="method" data-reveal className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                <span data-scramble>Methodology</span>
              </h2>
              <ol className="relative">
                {project.methodology.map((s, n) => (
                  <li key={s.title} data-reveal className="relative flex gap-6 pb-10 last:pb-0">
                    {n < project.methodology.length - 1 && (
                      <>
                        <span className="absolute bottom-0 left-[21px] top-12 w-px bg-line" aria-hidden />
                        <span
                          className="track-fill absolute bottom-0 left-[21px] top-12 w-px bg-gradient-to-b from-accent-soft to-accent/30"
                          aria-hidden
                        />
                      </>
                    )}
                    <span className="node-ring grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-sm text-accent-soft">
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
                <span data-scramble>Evidence</span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {project.evidence.map((e, n) => (
                  <figure
                    key={e.src}
                    data-reveal="clip"
                    style={{ ["--reveal-delay" as string]: `${(n % 2) * 90}ms` }}
                    className="group overflow-hidden rounded-2xl border border-line bg-surface [--clip-r:1rem]"
                  >
                    <div className="overflow-hidden">
                      <Image
                        src={e.src}
                        alt={e.caption}
                        width={e.width}
                        height={e.height}
                        className="h-auto w-full transition-transform duration-1000 ease-expo group-hover:scale-[1.03]"
                      />
                    </div>
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
                  data-magnetic
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium hover:border-fg"
                >
                  {l.label}
                  <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          )}

          <NextProject slug={next.slug} title={next.title} />
        </Container>
      </article>
    </PageTransition>
  );
}
