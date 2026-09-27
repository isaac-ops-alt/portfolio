// Everything personal about the site lives here. Edit this file first.

export const site = {
  name: "Isa'ac Godwin Mvodo Ngo'o",
  shortName: "ISAAC",
  role: "Cybersecurity student. Builder. Technologist.",
  intro:
    "I explore security, software and emerging technology — while building products and documenting what I learn along the way.",
  location: "London, UK",
  availability: "Open to work",
  goal: "Aspiring Cloud Security Analyst",

  // Used for SEO + social cards. On Vercel this picks up the production URL automatically;
  // set NEXT_PUBLIC_SITE_URL once you connect a custom domain.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  // Leave a value empty ("") to hide that link everywhere on the site.
  email: "",
  linkedin: "https://www.linkedin.com/in/isaac-mvodo-7b3105375/",
  github: "https://github.com/isaac-ops-alt",

  // Path to your CV inside public/. Empty hides the CV buttons.
  cv: "/Isaac_Godwin_Mvodo_Ngoo_Cybersecurity_CV.pdf",
};

export const socials = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
  { label: "Email", href: site.email && `mailto:${site.email}` },
].filter((s) => s.href);

// Primary "Get in touch" target: email if set, otherwise LinkedIn.
export const contactHref = site.email ? `mailto:${site.email}` : site.linkedin;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Notes", href: "/#notes" },
];
