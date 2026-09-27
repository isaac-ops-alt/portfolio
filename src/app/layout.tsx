import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const description = `${site.role} ${site.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cybersecurity Student`,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    title: `${site.name} — Cybersecurity Student`,
    description,
    images: [{ url: "/images/headshot.jpg", width: 1200, height: 1490, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-svh font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <p>Designed &amp; built with Next.js, TypeScript and Tailwind CSS.</p>
          </div>
        </footer>
        <RevealObserver />
      </body>
    </html>
  );
}
