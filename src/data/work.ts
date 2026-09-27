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
    tags: ["Cisco", "OSPF", "VLANs", "VLSM", "SSH", "DNS"],
    summary:
      "Designed and built a three-tier enterprise WAN for SkyGrid Networks Ltd across three branch sites — redundant OSPF core, VLSM addressing, VLAN segmentation, hardened devices and core services — then verified it end to end with ping and traceroute.",
    cta: "Explore project",
    overview: [
      {
        label: "Objective",
        value:
          "Design a network for SkyGrid Networks Ltd that links three branch sites, keeps each site's Marketing, Sales and IT traffic separated, and routes efficiently over redundant paths.",
      },
      { label: "Environment", value: "Cisco Packet Tracer" },
      { label: "My role", value: "Network designer & implementer" },
      { label: "Architecture", value: "Three-tier — core routers, distribution multilayer switches, access switches" },
      { label: "Sites", value: "Warsaw · London · York, each with Marketing, Sales and IT VLANs" },
      { label: "Addressing", value: "210.165.10.0/24 subnetted with VLSM" },
    ],
    methodology: [
      {
        title: "Addressing with VLSM",
        body: "Split 210.165.10.0/24 into right-sized subnets so each department got only what it needed — for example, in London: Marketing a /28, Sales and IT a /29 each — leaving room to grow without renumbering.",
      },
      {
        title: "Three-tier hierarchy",
        body: "Built the network in core, distribution and access layers so each layer has one job and traffic stays close to its source.",
      },
      {
        title: "VLAN segmentation & inter-VLAN routing",
        body: "Placed Marketing, Sales and IT in separate VLANs at each site, with the distribution multilayer switches acting as their gateways and routing between them.",
      },
      {
        title: "OSPF WAN core",
        body: "Linked the sites with serial WAN lines between the core routers and ran OSPF (area 0) so paths are learned automatically and re-converge over the redundant links if one fails.",
      },
      {
        title: "Security hardening",
        body: "Configured an encrypted enable secret, console and VTY passwords, SSH access (domain name, 1024-bit RSA key pair and a local account) to replace Telnet, and a Message-of-the-Day warning banner.",
      },
      {
        title: "Services",
        body: "Added DNS, an HTTP web server and wireless coverage so the network supports real-world services, not just host-to-host reachability.",
      },
    ],
    evidence: [
      {
        src: "/images/net1.png",
        caption: "Full topology — a three-tier design across three branch sites (Warsaw, London, York): a redundant router core over serial WAN links, multilayer switches at the distribution layer and access switches connecting the hosts.",
        width: 865,
        height: 366,
      },
      {
        src: "/images/net2.png",
        caption: "The core layer — routers joined by serial WAN links, each labelled with its OSPF cost, giving the branches redundant paths through the backbone.",
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
        caption: "Sales VLAN — Sales-05 reaching Sales-12 (210.165.10.77), 4 of 4 replies.",
        width: 540,
        height: 400,
      },
      {
        src: "/images/net5.png",
        caption: "IT VLAN — IT-01 reaching IT-05 (210.165.10.82) across the switched segment.",
        width: 502,
        height: 432,
      },
      {
        src: "/images/net6.png",
        caption: "Inter-site routing — a traceroute from Sales-03 to Sales-08 (210.165.10.53) crossing four routers in five hops over the OSPF WAN.",
        width: 526,
        height: 396,
      },
    ],
    sections: [
      {
        title: "Testing & verification",
        items: [
          "Every ping test returned all four replies with 0% loss — where the first packet dropped, ARP resolution explained the one-off delay before traffic settled.",
          "Traceroute showed a single hop for same-subnet traffic and multiple hops between sites, matching the OSPF-computed paths.",
          "Both local switching and inter-VLAN routing were confirmed — traffic stayed within a VLAN where it should, and crossed the core only when it had to.",
        ],
      },
      {
        title: "Troubleshooting",
        items: [
          "Wireless clients lost connectivity and pings timed out; switch port Fa0/5 to the wireless router sat down/down.",
          "The cable was in the wireless router's Internet (WAN) port — moving it to a plain Ethernet port and running 'no shutdown' brought the link up/up and restored reach.",
          "A pass over each end device's IP, mask and default gateway cleared the remaining VLAN and inter-site conflicts.",
        ],
      },
      {
        title: "Reliability & resilience",
        items: [
          "OSPF senses a failed link and re-routes automatically, with no manual intervention.",
          "The redundant serial links mean losing one backbone link doesn't isolate a site.",
          "The three-tier hierarchy isolates faults — a broken access switch or VLAN affects only its own users, not the whole network.",
        ],
      },
      {
        title: "What I learned",
        items: [
          "Segmentation is a security control, not just a tidy diagram.",
          "A VLSM plan drawn up front makes routing, services and troubleshooting all easier later.",
          "Most 'network' faults come down to the physical layer and a wrong gateway — check those first.",
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
