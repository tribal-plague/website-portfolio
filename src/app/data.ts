export const serif = { fontFamily: '"Lora", Georgia, "Times New Roman", serif' };
export const serifItalic = {
  fontFamily: '"Lora", Georgia, "Times New Roman", serif',
  fontStyle: "italic" as const,
};
export const sans = { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' };

export const EXPERIENCES = [
  {
    index: "01",
    company: "Zopper",
    role: "Design Lead",
    period: "March 2023 – Present",
    year: "present",
    location: "Noida",
    url: "zopper.com",
    industry: "InsurTech",
    keyMetric: { value: "40%", label: "Brand presence uplift" },
    summary:
      "Led all design output for Zopper's brand and digital presence — sole designer and developer of the full production website, brand identity, video production, and partner collaterals.",
    highlights: [
      "Sole designer & developer of Zopper's entire website, driving a 25% increase in click rates.",
      "Produced a brand explainer video improving audience engagement by 30%.",
      "Elevated brand presence by 40% through strategic visual identity redesign.",
      "Improved design team efficiency by 20% via faster project turnaround workflows.",
      "Designed partner collaterals supporting key business relationships and revenue growth.",
    ],
    skills: [
      "UI Design",
      "Web Development",
      "Brand Identity",
      "Motion Graphics",
      "Webflow",
      "Figma",
      "AI-Assisted Design",
    ],
  },
  {
    index: "02",
    company: "Polygon",
    role: "Sr. Visual Designer",
    period: "July 2022 – March 2023",
    year: "2022–23",
    location: "Bangalore",
    url: "polygon.technology",
    industry: "Web3 / Blockchain",
    keyMetric: { value: "120+", label: "Digital designs produced" },
    summary:
      "Owned the Web3 design language for Polygon's global marketing — 120+ digital assets, marquee multi-city campaigns, and a mentorship-led approach to brand consistency across teams.",
    highlights: [
      "Developed 120+ unique digital designs maintaining visual consistency across blog images, presentations, infographics and marketing collaterals.",
      "Led end-to-end design for marquee campaigns including Polygon Loves Creators and Polygon Guild, executed across multiple cities in India.",
      "Ensured cross-team brand consistency and mentored designers to uphold quality standards.",
    ],
    skills: [
      "Visual Design",
      "Campaign Design",
      "Design Systems",
      "Infographics",
      "Presentations",
      "Team Mentoring",
    ],
  },
  {
    index: "03",
    company: "Nykaa",
    role: "Visual Designer",
    period: "March 2021 – July 2022",
    year: "2021–22",
    location: "Mumbai",
    url: "nykaa.com",
    industry: "Beauty & E-commerce",
    keyMetric: { value: "23%", label: "User engagement increase" },
    summary:
      "Designed 100+ animated emailers and web banners for Nykaa Man and Nykaa Beauty, delivering measurable lifts in engagement, CTR, and page load performance.",
    highlights: [
      "Designed 100+ animated emailers for Nykaa Man and Nykaa Beauty, driving a 23% increase in user engagement.",
      "Developed optimised HTML email templates achieving 2× faster load times and improved click-through rates.",
      "Created animated web banners boosting CTR by 30%, maintaining visual consistency across platforms.",
      "Maintained visual consistency while collaborating with the team to inject fresh creative direction.",
    ],
    skills: [
      "Motion Design",
      "HTML Email",
      "Banner Design",
      "Adobe After Effects",
      "Brand Consistency",
    ],
  },
  {
    index: "04",
    company: "Bewakoof",
    role: "Graphic Designer & Illustrator",
    period: "December 2018 – March 2021",
    year: "2018–21",
    location: "Mumbai",
    url: "bewakoof.com",
    industry: "Fashion & Retail",
    keyMetric: { value: "20+", label: "Best-sellers designed" },
    summary:
      "Created licensed graphic apparel for Marvel, DC, and Warner Bros., contributing to top-5 all-time sales rankings and a 15%+ profit increase through design-led product strategy.",
    highlights: [
      "Designed graphics for T-shirts and extended product lines, contributing to a 15%+ increase in company profits.",
      "Created licensed artwork for Marvel, DC Comics, and Warner Bros., expanding audience reach and driving revenue.",
      "Served as primary point of contact for licensing-related design, enabling 20% faster delivery.",
      "Designed 20+ best-sellers, consistently achieving top 5 all-time sales rankings.",
    ],
    skills: [
      "Illustration",
      "Print Design",
      "Licensed Artwork",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Product Design",
    ],
  },
];

export const SKILLS = [
  "UI Design",
  "Web Design & Development",
  "Branding & Visual Identity",
  "Graphic Design",
  "Motion Graphics & Animation",
  "Print Collaterals",
  "Illustration",
  "Business Presentations",
  "Design Systems",
  "Responsive Design",
  "AI-Assisted Design",
  "Prompt Engineering",
  "Problem Solving",
];

export const TOOLS = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Adobe Premiere Pro",
  "Figma",
  "Webflow",
  "Midjourney / Firefly",
  "ChatGPT / Claude",
  "Google AI Suite",
];

export const ACHIEVEMENTS = [
  {
    index: "01",
    title: "Best-Selling Designs Award",
    body: "Recognised for design excellence in innovative print design; 3 original designs ranked among the top 5 all-time best-sellers company-wide at Bewakoof.",
  },
  {
    index: "02",
    title: "AI Tools & Development Award",
    body: "Awarded for independently designing and developing a full production website from the ground up, leveraging AI tools and full-stack software skills at Zopper.",
  },
];

export const STATS = [
  { value: "7+", label: "Years Experience" },
  { value: "120+", label: "Digital Designs" },
  { value: "100+", label: "Animated Emailers" },
  { value: "20+", label: "Best-Sellers" },
];

export type ProjectCategory =
  | "All"
  | "UI Design"
  | "Branding"
  | "Campaign"
  | "Motion"
  | "Illustration";

export type Project = {
  id: number;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  company: string;
  year: string;
  role: string;
  description: string;
  longDescription: string[];
  outcomes: { value: string; label: string }[];
  skills: string[];
  tools: string[];
  thumb: string;
  images: string[];
  featured: boolean;
  uploadDate?: string;
};

export const PROJECTS: Project[] = [];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CONTACT = {
  email: "shreeshvikramsingh@gmail.com",
  phone: "+91 7985385142",
  location: "Noida, Uttar Pradesh",
  linkedin: "https://linkedin.com/in/shreeshsingh",
  linkedinLabel: "linkedin.com/in/shreeshsingh",
  behance: "https://behance.net/shreeshvikramsingh",
  behanceLabel: "behance.net/shreeshvikramsingh",
};
