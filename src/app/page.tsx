import Image from "next/image";
import Link from "next/link";
import NetworkCanvas from "@/components/NetworkCanvas";
import { ArrowRight, Download, GitHub, LinkedIn, Mail } from "@/components/Icons";
import { Container, ProjectCard, SectionHeader, Tag } from "@/components/ui";
import { education, events, experience, notes, stack } from "@/data/profile";
import { contactHref, site, socials as socialLinks } from "@/data/site";
import { projects } from "@/data/work";

const icons = { LinkedIn, GitHub, Email: Mail } as const;
const socials = socialLinks.map((s) => ({ ...s, Icon: icons[s.label as keyof typeof icons] }));
const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Events />
      <About />
      <Notes />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-16">
      <NetworkCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
      <Container className="relative grid items-center gap-12 py-16 md:grid-cols-[1.35fr_0.65fr] md:gap-16">
        <div>
          <p data-reveal className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-emerald-300/90 backdrop-blur">
            <span className="beacon" aria-hidden />
            {site.availability}
          </p>
          <h1
            data-reveal
            className="font-display text-[clamp(2.4rem,6.4vw,5.25rem)] font-bold uppercase leading-[0.92] tracking-tight"
          >
            {site.name}
          </h1>
          <p data-reveal className="mt-6 text-xl font-medium text-fg/90 sm:text-2xl">
            {site.role}
          </p>
          <p data-reveal className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {site.intro}
          </p>

          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-soft hover:text-bg"
            >
              View my work <ArrowRight />
            </Link>
            {site.cv ? (
              <a
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium transition-colors hover:border-fg"
              >
                Download CV <Download />
              </a>
            ) : (
              <a
                href={contactHref}
                {...external(contactHref)}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium transition-colors hover:border-fg"
              >
                Get in touch <ArrowRight />
              </a>
            )}
          </div>

          <div data-reveal className="mt-10 flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-center sm:gap-6">
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

        <div data-reveal className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-accent/50 via-line to-transparent" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl bg-surface">
            <Image
              src="/images/headshot.jpg"
              alt={`Portrait of ${site.name}`}
              width={1200}
              height={1490}
              sizes="(min-width: 768px) 360px, 90vw"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-4 text-center font-mono text-xs text-muted">Cybersecurity · Cloud security · Building</p>
        </div>
      </Container>
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
        {label}
      </h3>
      <ol className="relative border-l border-line">
        {items.map((item) => (
          <li key={item.title} data-reveal className="relative pb-12 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-2 size-[9px] rounded-full border border-accent bg-bg" aria-hidden />
            <p className="font-mono text-xs text-accent-soft">{item.period}</p>
            <h4 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h4>
            <p className="mt-1 text-muted">{item.org}</p>
            {item.points.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.points.map((pt) => (
                  <Tag key={pt}>{pt}</Tag>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
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
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((g, i) => (
            <div
              key={g.group}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="bg-surface p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold">{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item}>
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
      <div className="mx-auto max-w-6xl">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6" aria-label="Events attended">
          {events.map((e, i) => (
            <li
              key={e.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface sm:w-[340px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                {e.image ? (
                  <Image
                    src={e.image}
                    alt={`${site.name} at ${e.name}`}
                    fill
                    sizes="340px"
                    className="object-cover object-[50%_60%]"
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
          <div data-reveal className="overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/office-portrait.jpg"
              alt={`${site.name} in a modern tech office`}
              width={1200}
              height={1490}
              sizes="(min-width: 768px) 540px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p data-reveal className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">05</span> / About
            </p>
            <h2 data-reveal className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              More than the terminal.
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
            <ul data-reveal className="mt-8 flex flex-wrap gap-2">
              {["Technology", "Building", "Fitness", "Experiences", "Personal growth"].map((t) => (
                <li
                  key={t}
                  className="cursor-default rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure data-reveal className="mt-16 overflow-hidden rounded-3xl border border-line md:mt-24">
          <Image
            src="/images/soc-desk.jpg"
            alt={`${site.name} working at a desk in front of security dashboards`}
            width={2000}
            height={1116}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="h-auto w-full"
          />
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
          {notes.map((n) => (
            <li
              key={n}
              data-reveal
              className="flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between"
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
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-32 md:py-44">
      <Image
        src="/images/datacenter.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_30%] opacity-35"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/85 to-bg/60" />
      <Container>
        <p data-reveal className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">07</span> / Contact
        </p>
        <h2
          data-reveal
          className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-balance"
        >
          Let&apos;s build something meaningful.
        </h2>
        <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-fg/80">
          I&apos;m currently looking for cybersecurity internships, technical collaborations and opportunities to learn
          from ambitious teams.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <a
            href={contactHref}
            {...external(contactHref)}
            className="inline-flex items-center gap-2 rounded-full bg-fg px-7 py-3.5 font-medium text-bg transition-colors hover:bg-accent-soft"
          >
            Get in touch <ArrowRight />
          </a>
          {site.cv && (
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/40 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-fg"
            >
              Download CV <Download />
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
