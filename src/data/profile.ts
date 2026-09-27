// Experience, stack, events and notes shown on the homepage.

export const experience = [
  {
    title: "Information Systems Intern",
    org: "Port Authority of Douala",
    period: "2025",
    points: ["GLPI deployment", "Endpoint security", "Troubleshooting", "IT infrastructure", "Systems support"],
  },
  {
    title: "Environmental Inspection / IT Support",
    org: "MINEPDED",
    period: "2024",
    points: [],
  },
];

export const education = [
  { title: "BSc Cyber Security", org: "Coventry University – CU London", period: "2026 → 2028" },
  { title: "Software Engineering Studies", org: "University of Buea", period: "2023 → 2025" },
];

export const stack = [
  { group: "Security", items: ["Nmap", "Metasploit", "Meterpreter", "Wireshark", "Kali Linux"] },
  { group: "Networking", items: ["TCP/IP", "VLANs", "VLSM", "OSPF", "DNS", "Cisco Packet Tracer"] },
  { group: "Development", items: ["Python", "Git", "GitHub", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Systems", items: ["Linux", "Windows", "VirtualBox", "GLPI"] },
];

export type Event = {
  name: string;
  host?: string;
  topics: string;
  // TODO: replace each takeaway with one sentence in your own words.
  takeaway: string;
  image?: string;
  // Optional CSS object-position for the card crop, e.g. "50% 40%".
  pos?: string;
};

export const events: Event[] = [
  {
    name: "Big Data LDN 2026",
    host: "Olympia London",
    topics: "AI · Data · Cloud",
    takeaway: "How organisations are scaling data and AI — and what it takes to keep it secure.",
    image: "/images/big-data-ldn.jpg",
    pos: "50% 42%",
  },
  {
    name: "Forensics Europe Expo 2026",
    topics: "Digital Forensics · Investigation · Security",
    takeaway: "The tools and processes behind modern digital investigations.",
    image: "/images/forensics.jpg",
    pos: "50% 38%",
  },
  {
    name: "Agentic AI London",
    host: "Vorboss",
    topics: "AI Agents · Infrastructure",
    takeaway: "What AI agents need from the infrastructure underneath them.",
    image: "/images/agentic.jpg",
    pos: "60% 32%",
  },
  {
    name: "Next.js Night London",
    host: "Vercel Community",
    topics: "Web · Next.js · Developer Ecosystem",
    takeaway: "Where the modern web platform is heading, from the people building it.",
    image: "/images/nextjs.jpg",
    pos: "50% 40%",
  },
];

export const notes = [
  "What Big Data LDN taught me about enterprise AI",
  "Building my first penetration-testing lab",
  "What I learned designing an enterprise network",
  "AI agents aren't just chatbots",
];
