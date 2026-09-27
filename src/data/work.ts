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
    title: "SkyGrid Networks — Enterprise Network",
    tags: ["Cisco", "OSPF", "VLANs", "VLSM", "Inter-VLAN Routing", "DNS"],
    summary:
      "Designed and built a segmented multi-department enterprise network with a redundant four-router OSPF core, VLSM addressing, inter-VLAN routing and core services — then verified it end to end with ping and traceroute.",
    cta: "Explore project",
    overview: [
      {
        label: "Objective",
        value:
          "Design a network for SkyGrid Networks Ltd that separates the Marketing, Sales and IT departments, routes efficiently over redundant paths and stays reachable end to end.",
      },
      { label: "Environment", value: "Cisco Packet Tracer" },
      { label: "My role", value: "Network designer & implementer" },
      { label: "Core", value: "Four Cisco routers in a redundant OSPF area 0, connected by /30 serial links" },
      { label: "Addressing", value: "210.165.10.0/24 subnetted with VLSM across departments and links" },
    ],
    methodology: [
      {
        title: "Requirements & addressing",
        body: "Broke 210.165.10.0/24 into right-sized subnets with VLSM — larger blocks for the department LANs and /30s for the point-to-point serial links between routers.",
      },
      {
        title: "Segmentation",
        body: "Separated Marketing, Sales and IT into their own segments, each served by a multilayer switch, to limit broadcast domains and contain lateral movement.",
      },
      {
        title: "Inter-VLAN routing",
        body: "Used the department multilayer switches to route between VLANs so segments communicate only through defined Layer-3 paths.",
      },
      {
        title: "Redundant OSPF core",
        body: "Connected four core routers with redundant serial links and ran OSPF (process 1, all interfaces in area 0) so routes are learned dynamically and re-converge if a link fails.",
      },
      {
        title: "Services & hardening",
        body: "Added DNS (network.local), an enable secret, console and VTY line authentication, SSH via RSA keys and a login banner across the core devices.",
      },
      {
        title: "Verification",
        body: "Confirmed intra-department and inter-department reachability with ping, and used traceroute to prove packets follow the intended multi-hop OSPF paths.",
      },
    ],
    evidence: [
      {
        src: "/images/net1.png",
        caption: "Full topology — a redundant four-router OSPF core linking the Marketing (blue), Sales (yellow) and IT (green) departments, each with its own multilayer switch and hosts.",
        width: 865,
        height: 366,
      },
      {
        src: "/images/net2.png",
        caption: "The core — point-to-point serial links between the four routers, each labelled with its OSPF cost, giving every department two paths through the backbone.",
        width: 696,
        height: 270,
      },
      {
        src: "/images/net3.png",
        caption: "Intra-department reachability — MKT-01 pinging MKT-08 (210.165.10.35) with 0% packet loss.",
        width: 555,
        height: 401,
      },
      {
        src: "/images/net4.png",
        caption: "Sales department — Sales-05 reaching Sales-12 (210.165.10.77), 4 of 4 replies.",
        width: 540,
        height: 400,
      },
      {
        src: "/images/net5.png",
        caption: "IT department — IT-01 reaching IT-05 (210.165.10.82) across the switched segment.",
        width: 502,
        height: 432,
      },
      {
        src: "/images/net6.png",
        caption: "Inter-department routing — a traceroute from Sales-03 to Sales-08 (210.165.10.53) crossing four routers in five hops, confirming OSPF is forwarding along the intended path.",
        width: 526,
        height: 396,
      },
    ],
    sections: [
      {
        title: "Testing & verification",
        items: [
          "Every ping test returned all four replies with 0% loss — where the first packet dropped, ARP resolution explained the one-off delay before traffic settled.",
          "Traceroute showed a single hop for same-subnet traffic and multiple hops between branches, matching the OSPF-computed paths.",
          "Redundant serial links mean a failed backbone link re-routes automatically instead of isolating a department.",
        ],
      },
      {
        title: "What I learned",
        items: [
          "Segmentation is a security control, not just a tidy diagram.",
          "A VLSM plan drawn up front makes routing, services and troubleshooting all easier later.",
          "OSPF costs are a design lever — they decide which redundant path traffic actually prefers.",
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
