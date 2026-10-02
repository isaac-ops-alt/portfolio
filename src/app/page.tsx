import Image from "next/image";
import Link from "next/link";
import NetworkCanvas from "@/components/NetworkCanvas";
import { ArrowRight, Download, GitHub, LinkedIn, Mail } from "@/components/Icons";
import { Container, PageTransition, ProjectCard, SectionHeader, SplitWords, Tag } from "@/components/ui";
import { education, events, experience, notes, stack } from "@/data/profile";
import { contactHref, site, socials as socialLinks } from "@/data/site";
import { projects } from "@/data/work";

const icons = { LinkedIn, GitHub, Email: Mail } as const;
const socials = socialLinks.map((s) => ({ ...s, Icon: icons[s.label as keyof typeof icons] }));
const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
// Delay for a step of the hero's load sequence.
const at = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export default function Home() {
  return (
    <PageTransition>
      <div>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Events />
        <About />
        <Notes />
        <Contact />
      </div>
    </PageTransition>
  );
}

function Hero() {
  return (
    <section className="hero relative flex min-h-svh items-center overflow-hidden pt-16">
      <NetworkCanvas />
      <div
        aria-hidden
        className="orb pointer-events-none absolute left-1/2 top-1/3 -mt-[180px] size-[1000px]"
      />
      <Container className="relative grid items-center gap-12 py-16 md:grid-cols-[1.35fr_0.65fr] md:gap-16">
        <div className="hero-copy">
          <p
            style={at(100)}
            className="intro mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-emerald-300/90 md:backdrop-blur"
          >
            <span className="beacon" aria-hidden>
              <span />
            </span>
            <span data-scramble data-scramble-delay="300">
              {site.availability}
            </span>
          </p>
          <h1
            style={at(200)}
            className="intro-words font-display text-[clamp(2.4rem,6.4vw,5.25rem)] font-bold uppercase leading-[0.92] tracking-tight"
          >
            <SplitWords text={site.name} />
          </h1>
          <p style={at(650)} className="intro mt-6 text-xl font-medium text-fg/90 sm:text-2xl">
            {site.role}
          </p>
          <p style={at(750)} className="intro mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {site.intro}
          </p>

          <div style={at(850)} className="intro mt-10 flex flex-wrap gap-3">
            <Link
              href="/#work"
              data-magnetic
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white hover:bg-accent-soft hover:text-bg sm:flex-none sm:px-6"
            >
              View my work
              <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
            </Link>
            {site.cv ? (
              <a
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 font-medium hover:border-fg sm:flex-none sm:px-6"
              >
                Download CV
                <Download className="size-4 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
              </a>
            ) : (
              <a
                href={contactHref}
                {...external(contactHref)}
                data-magnetic
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 font-medium hover:border-fg sm:flex-none sm:px-6"
              >
                Get in touch
                <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </a>
            )}
          </div>

          <div
            style={at(950)}
            className="intro mt-10 flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-center sm:gap-6"
          >
            <p>
              {site.location} <span className="text-accent">•</span> {site.goal}
            </p>
            <ul className="flex gap-5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} {...external(href)} className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
                    <Icon className="size-3.5" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-portrait relative mx-auto w-full max-w-sm md:max-w-none">
          <div style={at(300)} className="intro relative">
            <div aria-hidden className="frame-glow absolute -inset-px rounded-3xl" />
            <div className="relative overflow-hidden rounded-3xl bg-surface">
              <div style={at(450)} className="portrait-reveal">
                <Image
                  src="/images/headshot.jpg"
                  alt={`Portrait of ${site.name}`}
                  width={1000}
                  height={1250}
                  sizes="(min-width: 768px) 360px, 90vw"
                  loading="eager"
                  fetchPriority="high"
                  className="h-auto w-full"
                />
              </div>
              <div aria-hidden style={at(450)} className="scan" />
            </div>
          </div>
          <p style={at(1300)} className="intro mt-4 text-center font-mono text-xs text-muted">
            <span data-scramble data-scramble-delay="1400">
              Cybersecurity · Cloud security · Building
            </span>
          </p>
        </div>
      </Container>

      <div aria-hidden className="hero-fade pointer-events-none absolute inset-x-0 bottom-8">
        <div style={at(1700)} className="scroll-cue intro flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
          <span className="cue-line" />
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Selected Work"
          title="Security work I can explain end to end."
          intro="Every project has a full case study — the objective, the method, what I found and what I'd fix."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeader index="02" eyebrow="Experience" title="Where I've been learning." />
        <div className="grid gap-16 md:grid-cols-2">
          <Timeline label="Work" items={experience} />
          <Timeline label="Education" items={education.map((e) => ({ ...e, points: [] as string[] }))} />
        </div>
      </Container>
    </section>
  );
}

function Timeline({
  label,
  items,
}: {
  label: string;
  items: { title: string; org: string; period: string; points: string[] }[];
}) {
  return (
    <div>
      <h3 data-reveal className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span data-scramble>{label}</span>
      </h3>
      <div className="relative">
        <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />
        <span
          aria-hidden
          className="track-fill absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent-soft via-accent to-accent/0"
        />
        <ol>
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="relative pb-12 pl-8 last:pb-0"
            >
              <span className="node absolute -left-[4px] top-2 size-[9px] rounded-full border border-accent bg-bg" aria-hidden />
              <p className="font-mono text-xs text-accent-soft">{item.period}</p>
              <h4 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h4>
              <p className="mt-1 text-muted">{item.org}</p>
              {item.points.length > 0 && (
                <ul data-stagger className="mt-4 flex flex-wrap gap-2">
                  {item.points.map((pt, j) => (
                    <li key={pt} style={{ ["--i" as string]: j }}>
                      <Tag>{pt}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Stack() {
  return (
    <section id="stack" className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Tech Stack"
          title="Tools I've actually used."
          intro="No skill bars. Just the tools behind the work above."
        />
        <div
          data-spotlight
          className="spotlight-grid grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {stack.map((g, i) => (
            <div
              key={g.group}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="bg-surface p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold">{g.group}</h3>
              <ul data-stagger className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item, j) => (
                  <li key={item} style={{ ["--i" as string]: j }}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Industry"
          title="Exploring the industry."
          intro="I put myself in rooms where I can learn from people building the future of security, data and AI."
        />
      </Container>
      <div className="rail mx-auto max-w-6xl">
        <ul
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6"
          aria-label="Events attended"
        >
          {events.map((e, i) => (
            <li
              key={e.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="group w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong sm:w-[340px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                {e.image ? (
                  <Image
                    src={e.image}
                    alt={`${site.name} at ${e.name}`}
                    fill
                    sizes="340px"
                    style={{ objectPosition: e.pos ?? "50% 50%" }}
                    className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-end bg-[radial-gradient(circle_at_30%_20%,rgb(124_92_255/0.35),transparent_60%)] p-6">
                    <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-fg/80">
                      {e.topics.split(" · ").join("\n")}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="font-mono text-xs text-accent-soft">{e.topics}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{e.name}</h3>
                {e.host && <p className="text-sm text-muted">{e.host}</p>}
                <p className="mt-4 text-sm leading-relaxed text-muted">{e.takeaway}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div data-reveal="clip" className="overflow-clip rounded-3xl border border-line">
            <Image
              src="/images/office-portrait.jpg"
              alt={`${site.name} in a modern tech office`}
              width={1200}
              height={1490}
              sizes="(min-width: 768px) 540px, 100vw"
              className="parallax h-auto w-full"
            />
          </div>
          <div>
            <p data-reveal className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">05</span> / <span data-scramble>About</span>
            </p>
            <h2 data-reveal className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              <SplitWords text="More than the terminal." />
            </h2>
            <div data-reveal className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m a cybersecurity student based in London with a background in software engineering and a
                strong curiosity for how technology shapes the world.
              </p>
              <p>
                I enjoy building products, exploring emerging technologies, meeting people in the industry and
                constantly putting myself in environments where I can learn something new. My goal is to become a
                cloud security analyst.
              </p>
            </div>
            <ul data-reveal data-stagger className="mt-8 flex flex-wrap gap-2">
              {["Technology", "Building", "Fitness", "Experiences", "Personal growth"].map((t, i) => (
                <li
                  key={t}
                  style={{ ["--i" as string]: i }}
                  className="cursor-default rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure data-reveal="clip" className="mt-16 overflow-clip rounded-3xl border border-line md:mt-24">
          <div className="overflow-clip">
            <Image
              src="/images/soc-desk.jpg"
              alt={`${site.name} working at a desk in front of security dashboards`}
              width={2000}
              height={1116}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="parallax h-auto w-full"
            />
          </div>
          <figcaption className="border-t border-line bg-surface px-6 py-4 font-mono text-xs text-muted">
            Working towards a career in cloud security.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

function Notes() {
  return (
    <section id="notes" className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeader
          index="06"
          eyebrow="Notes"
          title="Latest thoughts."
          intro="Writing about what I build, what I break and what I learn along the way."
        />
        <ul className="border-t border-line">
          {notes.map((n, i) => (
            <li
              key={n}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="rule flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-lg font-medium sm:text-xl">{n}</span>
              <span className="font-mono text-xs text-muted">Coming soon</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-clip border-t border-line py-32 md:py-44">
      <Image
        src="/images/datacenter.jpg"
        alt=""
        fill
        sizes="100vw"
        className="zoom-in-view -z-20 object-cover object-[50%_30%] opacity-35"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/85 to-bg/60" />
      <Container>
        <p data-reveal className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">07</span> / <span data-scramble>Contact</span>
        </p>
        <h2
          data-reveal
          className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-balance"
        >
          <SplitWords text="Let's build something meaningful." />
        </h2>
        <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-fg/80">
          I&apos;m currently looking for cybersecurity internships, technical collaborations and opportunities to learn
          from ambitious teams.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <a
            href={contactHref}
            {...external(contactHref)}
            data-magnetic
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-fg px-5 py-3.5 font-medium text-bg hover:bg-accent-soft sm:flex-none sm:px-7"
          >
            Get in touch
            <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
          </a>
          {site.cv && (
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong bg-bg/60 px-5 py-3.5 font-medium hover:border-fg sm:flex-none sm:px-7 md:bg-bg/40 md:backdrop-blur"
            >
              Download CV
              <Download className="size-4 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
            </a>
          )}
        </div>
        <ul data-reveal className="mt-12 flex flex-wrap gap-6 font-mono text-sm text-muted">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} {...external(href)} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                <Icon /> {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
