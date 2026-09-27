// Selected Work + case studies.
// Each project renders a card on the homepage and a full case study at /work/<slug>.

export type Step = { title: string; body: string };

export type Evidence = {
  // Drop screenshots in public/images/work/ and reference them here, e.g.
  // { src: "/images/work/nmap-results.png", caption: "Nmap service scan", width: 1600, height: 900 }
  src: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  category: string;
  title: string;
  tags: string[];
  summary: string;
  cta: string;
  overview: { label: string; value: string }[];
  methodology: Step[];
  evidence: Evidence[];
  sections: { title: string; items: string[] }[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "penetration-testing-lab",
    category: "Penetration Testing & Vulnerability Assessment",
    title: "Windows Security Lab",
    tags: ["Kali Linux", "Nmap", "Metasploit", "Meterpreter", "VirtualBox"],
    summary:
      "Conducted an authorised penetration test against an isolated Windows environment, progressing from reconnaissance and enumeration through vulnerability validation, controlled exploitation and post-exploitation analysis.",
    cta: "View case study",
    overview: [
      {
        label: "Objective",
        value:
          "Assess the security posture of a deliberately vulnerable Windows machine in an authorised, isolated lab.",
      },
      { label: "Environment", value: "Kali Linux · Windows 7 · VirtualBox internal network" },
      { label: "My role", value: "Security tester" },
      { label: "Scope", value: "Single target host, fully isolated from the internet and production networks" },
    ],
    methodology: [
      {
        title: "Reconnaissance",
        body: "Mapped the isolated lab network to identify live hosts and confirm the target was in scope before touching it.",
      },
      {
        title: "Service enumeration",
        body: "Used Nmap to fingerprint open ports, running services and operating-system details on the Windows target.",
      },
      {
        title: "Vulnerability assessment",
        body: "Matched discovered services against known vulnerabilities and validated candidates with Metasploit auxiliary scanners before attempting anything intrusive.",
      },
      {
        title: "Controlled exploitation",
        body: "Exploited a validated vulnerability in a controlled way to gain access, keeping all activity inside the isolated network.",
      },
      {
        title: "Post-exploitation",
        body: "Used a Meterpreter session to understand the level of access gained and what an attacker could reach from that foothold.",
      },
      {
        title: "Remediation",
        body: "Documented each finding and mapped it to practical fixes a system owner could act on.",
      },
    ],
    evidence: [
      {
        src: "/images/lab1.png",
        caption: "Reconnaissance — confirming the target's IP on the isolated lab network (ipconfig on the Windows host, ip a on Kali).",
        width: 965,
        height: 448,
      },
      {
        src: "/images/lab2.png",
        caption: "Service enumeration — an Nmap version scan revealing open SMB and RPC ports on the Windows target.",
        width: 865,
        height: 374,
      },
      {
        src: "/images/lab3.png",
        caption: "OS fingerprinting — Nmap OS detection and SMB scripts identifying Windows 7 SP1 and its SMB security configuration.",
        width: 924,
        height: 703,
      },
      {
        src: "/images/lab4.png",
        caption: "Vulnerability validation — Metasploit's MS17-010 module confirming the host is likely vulnerable.",
        width: 931,
        height: 574,
      },
      {
        src: "/images/lab5.png",
        caption: "Post-exploitation — a Meterpreter session running with NT AUTHORITY\\SYSTEM privileges.",
        width: 911,
        height: 475,
      },
      {
        src: "/images/lab6.png",
        caption: "Post-exploitation — extracting local account password hashes from the compromised host.",
        width: 935,
        height: 152,
      },
    ],
    sections: [
      {
        title: "What I learned",
        items: [
          "Enumeration drives everything — the quality of the scan decides the quality of the test.",
          "Validating a vulnerability before exploiting it keeps a test safe, quiet and defensible.",
          "The report and the remediation are the real deliverable, not the shell.",
        ],
      },
      {
        title: "Security implications",
        items: [
          "Unpatched, end-of-life systems remain one of the easiest ways into a network.",
          "A single exposed service can be enough to give an attacker a foothold.",
        ],
      },
      {
        title: "Recommended remediation",
        items: [
          "Patch or retire end-of-life operating systems.",
          "Disable or restrict network services that are not needed.",
          "Segment legacy hosts away from critical systems.",
          "Monitor endpoints for exploitation and post-exploitation activity.",
        ],
      },
    ],
  },
  {
    slug: "enterprise-network",
    category: "Enterprise Network Design & Security",
    title: "Segmented Enterprise Network",
    tags: ["Cisco", "VLANs", "VLSM", "OSPF", "TCP/IP", "DNS"],
    summary:
      "Designed and implemented a segmented enterprise network incorporating VLANs, subnetting, inter-VLAN routing, OSPF and application services.",
    cta: "Explore project",
    overview: [
      {
        label: "Objective",
        value: "Design a network that separates departments, routes efficiently and delivers core services reliably.",
      },
      { label: "Environment", value: "Cisco Packet Tracer" },
      { label: "My role", value: "Network designer & implementer" },
      { label: "Focus", value: "Segmentation, addressing efficiency and dynamic routing" },
    ],
    methodology: [
      {
        title: "Requirements & addressing",
        body: "Planned the address space with VLSM so each segment got a right-sized subnet with room to grow.",
      },
      {
        title: "Segmentation",
        body: "Separated departments into VLANs to limit broadcast domains and contain lateral movement.",
      },
      {
        title: "Inter-VLAN routing",
        body: "Configured routing between VLANs so segments communicate only through defined paths.",
      },
      {
        title: "Dynamic routing",
        body: "Deployed OSPF so routes are learned and updated automatically across the network.",
      },
      {
        title: "Services",
        body: "Integrated application services such as DNS so users reach resources by name.",
      },
      {
        title: "Verification",
        body: "Tested connectivity and routing end to end to confirm the design behaved as intended.",
      },
    ],
    // TODO: add your topology diagram and configuration screenshots.
    evidence: [],
    sections: [
      {
        title: "What I learned",
        items: [
          "Segmentation is a security control, not just a tidy diagram.",
          "Good addressing plans make every later step — routing, services, troubleshooting — easier.",
        ],
      },
    ],
  },
  {
    slug: "orvexa-labs",
    category: "Product & Web",
    title: "Orvexa Labs",
    tags: ["Next.js", "TypeScript", "Tailwind", "Web"],
    summary: "Building digital products and web experiences for businesses.",
    cta: "View project",
    overview: [
      { label: "What it is", value: "A studio for building digital products and web experiences for businesses." },
      { label: "Stack", value: "Next.js · TypeScript · Tailwind CSS" },
      { label: "Focus", value: "Fast, modern websites and products that solve real business problems" },
    ],
    methodology: [],
    // TODO: add screenshots of Orvexa Labs work.
    evidence: [],
    sections: [
      {
        title: "Why it matters to my security career",
        items: [
          "Building products shows me how systems are made — which makes it easier to see how they break.",
          "Shipping real work for businesses means thinking about users, reliability and trust, not just code.",
        ],
      },
    ],
  },
  {
    slug: "this-portfolio",
    category: "Personal Project",
    title: "This Portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    summary:
      "Designed and developed my personal portfolio from scratch — fast, accessible and built to be read in seconds.",
    cta: "How it's built",
    overview: [
      { label: "Goal", value: "Show who I am and what I can do within five seconds of landing." },
      { label: "Stack", value: "Next.js App Router · TypeScript · Tailwind CSS" },
      { label: "Targets", value: "95+ Lighthouse across performance, accessibility, SEO and best practices" },
    ],
    methodology: [
      {
        title: "Structure first",
        body: "Organised the page around what a recruiter asks: who is he, what can he do, does he really know it, how do I contact him.",
      },
      {
        title: "Statically generated",
        body: "Every page is pre-rendered at build time, so it loads fast and has almost nothing to attack.",
      },
      {
        title: "Motion with restraint",
        body: "Subtle reveals and an interactive network background that respects reduced-motion settings.",
      },
    ],
    evidence: [],
    sections: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
