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

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Zopper Website Redesign",
    category: "UI Design",
    company: "Zopper",
    year: "2024",
    role: "Designer & Developer",
    description:
      "End-to-end design and development of Zopper's production website — driving a 25% increase in click rates through intentional information architecture and visual hierarchy.",
    longDescription: [
      "Zopper's website was carrying the weight of an outdated visual language that no longer reflected the company's ambitions in the InsurTech space. As the sole designer and developer, I owned the project from discovery through launch — conducting a full audit of the existing site, mapping user journeys, and rebuilding the information architecture from the ground up.",
      "The design system I built centred on clarity and trust — critical signals for an insurance technology product. Every component was designed with conversion in mind: from the hero section hierarchy to the CTAs, micro-interactions, and form states. I developed the site in Webflow, integrating custom code where the builder's constraints fell short.",
      "Post-launch analytics confirmed a 25% increase in click rates within the first month. The redesigned site now serves as Zopper's primary touchpoint for partners, investors, and enterprise clients — and has become a reference standard for internal brand consistency.",
    ],
    outcomes: [
      { value: "25%", label: "Increase in click rates" },
      { value: "40%", label: "Brand presence uplift" },
      { value: "20%", label: "Faster team turnaround" },
      { value: "1", label: "Designer — end to end" },
    ],
    skills: ["UI Design", "Information Architecture", "Responsive Design", "Web Development", "Design Systems"],
    tools: ["Figma", "Webflow", "Adobe Illustrator", "ChatGPT"],
    thumb: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1592839961515-64c68091f712?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1702468292597-6b8874fbd2fe?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Zopper Brand Identity System",
    category: "Branding",
    company: "Zopper",
    year: "2023",
    role: "Lead Designer",
    description:
      "Strategic visual identity redesign elevating brand presence by 40% — covering logo, colour system, typography, and partner collateral guidelines.",
    longDescription: [
      "When I joined Zopper, the brand was visually fragmented — inconsistent across decks, collaterals, and digital touchpoints. My brief was to unify and elevate. I led a full visual identity redesign that began with brand positioning workshops and competitive auditing, and resulted in a comprehensive identity system ready for scale.",
      "The new identity introduced a refined logo mark, a structured colour palette built on trust and precision, and a typographic system that worked equally well in investor presentations and partner-facing materials. I documented every decision in a 40-page brand guidelines document used daily by the team.",
      "The impact was measurable: brand presence metrics climbed 40% within two quarters, partner onboarding materials required significantly fewer revision rounds, and the team consistently shipped on-brand work without direct design intervention.",
    ],
    outcomes: [
      { value: "40%", label: "Brand presence uplift" },
      { value: "40+", label: "Pages of brand guidelines" },
      { value: "20%", label: "Faster partner collateral delivery" },
      { value: "1", label: "Unified design language" },
    ],
    skills: ["Brand Identity", "Logo Design", "Typography", "Colour Systems", "Print Design", "Brand Strategy"],
    tools: ["Adobe Illustrator", "Figma", "Adobe InDesign"],
    thumb: "https://images.unsplash.com/photo-1760386129108-d17b9cdfc4fa?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1777652918753-d66882b15391?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1590102426275-8d1c367070d3?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Polygon Loves Creators",
    category: "Campaign",
    company: "Polygon",
    year: "2022",
    role: "Sr. Visual Designer",
    description:
      "Multi-city campaign celebrating creators in the Web3 space — designed across OOH, digital, and social formats with a distinct Web3 visual language.",
    longDescription: [
      "Polygon Loves Creators was the most ambitious campaign I led at Polygon — a celebration of the artists, developers, and storytellers building in Web3. The campaign ran simultaneously across Bangalore, Mumbai, and Delhi, spanning OOH placements, digital activations, and a social rollout reaching hundreds of thousands of followers.",
      "The visual language I developed drew from the energy of the creator economy: kinetic, layered, and unapologetically bold. I created a modular design system that allowed the same core aesthetic to flex across formats — from a 48×16 ft hoarding to a 1080×1080 Instagram post — without losing cohesion or impact.",
      "Every asset in the campaign was designed and delivered within a three-week production window. Working closely with the marketing, community, and events teams, I ensured creative consistency from the first social teaser through to the on-ground event installations.",
    ],
    outcomes: [
      { value: "3", label: "Cities simultaneously" },
      { value: "120+", label: "Digital assets produced" },
      { value: "Multi", label: "Format campaign system" },
      { value: "3wk", label: "End-to-end production" },
    ],
    skills: ["Campaign Design", "OOH Design", "Social Media Design", "Brand Systems", "Web3 Visual Design"],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Midjourney"],
    thumb: "https://images.unsplash.com/photo-1676907820329-d74d048a6969?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1770885653473-ca48b4d69173?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1758979616454-77dec15a982d?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: true,
  },
  {
    id: 4,
    title: "Nykaa Beauty Email Campaign",
    category: "Motion",
    company: "Nykaa",
    year: "2022",
    role: "Visual Designer",
    description:
      "100+ animated emailers for Nykaa Man and Nykaa Beauty — achieving a 23% lift in user engagement with optimised HTML templates delivering 2× faster load times.",
    longDescription: [
      "Email was one of Nykaa's highest-performing owned channels, but the templates were static, heavy, and inconsistent. My role was to overhaul both the visual quality and technical performance of every emailer going out for Nykaa Man and Nykaa Beauty.",
      "I redesigned the template architecture from scratch — building modular HTML blocks that could be assembled rapidly for weekly campaign drops. Each template was animated using CSS and lightweight GIF sequences, tested across 12 email clients, and optimised to load in under 2 seconds. The result was a 2× improvement in load times and a 23% increase in user engagement.",
      "Beyond the templates, I also established a visual rhythm for the email programme — seasonal colour palettes, typographic pairings, and photography guidelines that gave the channel a consistent editorial identity without constraining the marketing team's flexibility.",
    ],
    outcomes: [
      { value: "23%", label: "User engagement increase" },
      { value: "2×", label: "Faster load times" },
      { value: "30%", label: "CTR boost on banners" },
      { value: "100+", label: "Emailers designed" },
    ],
    skills: ["Motion Design", "HTML Email Development", "Animation", "Brand Consistency", "Template Architecture"],
    tools: ["Adobe After Effects", "Adobe Photoshop", "Figma", "HTML/CSS"],
    thumb: "https://images.unsplash.com/photo-1648134859177-66e35b61e106?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1642052503374-13c45f288e5e?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: false,
  },
  {
    id: 5,
    title: "Bewakoof × Marvel Licensed Artwork",
    category: "Illustration",
    company: "Bewakoof",
    year: "2020",
    role: "Graphic Designer & Illustrator",
    description:
      "Licensed graphic apparel for Marvel properties — 3 original designs ranked in the top 5 all-time best-sellers, contributing to a 15%+ increase in company profits.",
    longDescription: [
      "Working with a Marvel license is equal parts creative challenge and technical constraint. Every character, colour, and composition must be approved through a strict licensing review process — and it must still feel fresh and wearable for Bewakoof's young, fashion-forward audience.",
      "I served as the primary design lead for all Marvel licensing work during my time at Bewakoof, managing the brief-to-approval pipeline and ensuring our submissions consistently cleared review on the first or second pass. This required deep familiarity with the Marvel brand bible, as well as an ability to interpret licensing restrictions creatively.",
      "Three of my original designs entered the top 5 all-time best-sellers list for the company. Beyond the numbers, this body of work sharpened my illustration skills in ways that pure digital work rarely does — every piece had to stand up on fabric, at scale, in direct sunlight.",
    ],
    outcomes: [
      { value: "3", label: "Top-5 all-time best-sellers" },
      { value: "15%+", label: "Company profit increase" },
      { value: "20%", label: "Faster licensing delivery" },
      { value: "20+", label: "Best-sellers designed" },
    ],
    skills: ["Illustration", "Print Design", "Licensed Artwork", "Character Design", "Apparel Graphics"],
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    thumb: "https://images.unsplash.com/photo-1678951558353-3a85c36358bb?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1625578388299-c1a45099ccba?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1764085793232-1d45cc8a598d?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: false,
  },
  {
    id: 6,
    title: "Zopper Brand Explainer Video",
    category: "Motion",
    company: "Zopper",
    year: "2023",
    role: "Designer & Director",
    description:
      "Full-production brand video scripted, storyboarded, and animated in-house — improving audience engagement by 30% and serving as the cornerstone of investor and partner communications.",
    longDescription: [
      "Zopper needed a single piece of content that could explain a complex InsurTech proposition to three very different audiences: investors, enterprise partners, and end customers. I took the project from a blank brief to a finished, broadcast-quality video — entirely in-house.",
      "I wrote the script, designed every frame of the storyboard, built the motion graphics system in After Effects, and directed the voiceover session. The visual language drew from the brand identity system I had built earlier — ensuring the video felt like a natural extension of the brand rather than a standalone production.",
      "The video lifted audience engagement by 30% across Zopper's owned channels, became the centrepiece of every investor and partner deck, and cut the time spent explaining the business model in meetings by roughly half.",
    ],
    outcomes: [
      { value: "30%", label: "Audience engagement increase" },
      { value: "100%", label: "In-house production" },
      { value: "3", label: "Audience segments addressed" },
      { value: "1", label: "Designer, director, animator" },
    ],
    skills: ["Motion Graphics", "Storyboarding", "Scriptwriting", "Animation", "Video Direction"],
    tools: ["Adobe After Effects", "Adobe Premiere Pro", "Adobe Illustrator", "Claude"],
    thumb: "https://images.unsplash.com/photo-1618800520158-c1f1c275f78e?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1515253564590-b7ec416b06be?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: false,
  },
  {
    id: 7,
    title: "Polygon Guild Campaign",
    category: "Campaign",
    company: "Polygon",
    year: "2022",
    role: "Sr. Visual Designer",
    description:
      "Pan-India multi-format campaign for Polygon Guild — executed across print, digital, and event installations in Bangalore, Mumbai, and Delhi.",
    longDescription: [
      "Polygon Guild was Polygon's community programme for developers and builders in the Indian Web3 ecosystem. The campaign was designed to drive awareness and membership — speaking directly to a technically literate audience that had high expectations for visual quality.",
      "I developed a visual system that referenced the geometry and logic of blockchain architecture while remaining warm and approachable — avoiding the cold, alienating aesthetic that dominates much of the Web3 design space. The palette, iconography, and motion principles were all developed specifically for this campaign.",
      "The campaign ran across three cities and multiple formats: event branding, digital display, social content, and print collateral for guild meetups. I designed every asset and worked directly with the events team to ensure the on-ground execution matched the digital vision.",
    ],
    outcomes: [
      { value: "3", label: "Cities — BLR, MUM, DEL" },
      { value: "Multi", label: "Format execution" },
      { value: "120+", label: "Assets in campaign system" },
      { value: "1", label: "Unified visual system" },
    ],
    skills: ["Campaign Design", "Event Branding", "Print Design", "Digital Design", "Community Design"],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Midjourney"],
    thumb: "https://images.unsplash.com/photo-1676907820365-0ad1a99dbaa6?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1758979616454-77dec15a982d?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1676907820329-d74d048a6969?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: false,
  },
  {
    id: 8,
    title: "Nykaa Web Banner Suite",
    category: "UI Design",
    company: "Nykaa",
    year: "2021",
    role: "Visual Designer",
    description:
      "Animated web banners aligned with Nykaa's seasonal campaigns — boosting CTR by 30% while maintaining strict brand guidelines across Nykaa Man and Nykaa Beauty.",
    longDescription: [
      "Nykaa's web banner programme was one of its highest-volume design outputs — dozens of banners per campaign, across multiple sizes, refreshed weekly. My role was to build a production system that maintained quality at speed while pushing the visual bar higher than the static templates that had come before.",
      "I developed an animated banner framework using CSS animation and lightweight After Effects exports, covering all standard IAB sizes. Each banner was designed to work with and without animation — ensuring fallback states were equally polished.",
      "The animated banners delivered a 30% improvement in click-through rates compared to the static equivalents. I also introduced a seasonal colour system that allowed the marketing team to brief new executions with minimal back-and-forth.",
    ],
    outcomes: [
      { value: "30%", label: "CTR improvement" },
      { value: "100+", label: "Banners designed" },
      { value: "2×", label: "Production speed vs previous" },
      { value: "12", label: "IAB sizes covered" },
    ],
    skills: ["Banner Design", "CSS Animation", "Digital Advertising", "Brand Application", "Responsive Design"],
    tools: ["Adobe After Effects", "Adobe Photoshop", "Figma", "HTML/CSS"],
    thumb: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1648134859177-66e35b61e106?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1592839961515-64c68091f712?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: false,
  },
  {
    id: 9,
    title: "Bewakoof × DC Comics",
    category: "Illustration",
    company: "Bewakoof",
    year: "2019",
    role: "Graphic Designer & Illustrator",
    description:
      "Licensed illustration series for DC Comics characters — serving as the primary design lead for licensing delivery and enabling 20% faster client sign-off cycles.",
    longDescription: [
      "The DC Comics licence was one of Bewakoof's most prestigious partnerships, and one of the most technically demanding from a design standpoint. DC's brand standards are rigorous — character proportions, colour accuracy, and composition rules are all strictly governed — and every submission goes through multiple rounds of licensor review.",
      "I became the dedicated point of contact for DC-related design, developing a deep familiarity with the character style guides and an efficient workflow for preparing and submitting artwork for approval. By streamlining the internal review process before submission, I was able to reduce the average approval cycle by 20%.",
      "The illustrations I created for this programme ranged from classic hero portraits to dynamic action compositions, all rendered in a style that bridged the official DC aesthetic with Bewakoof's casual, youth-oriented brand voice.",
    ],
    outcomes: [
      { value: "20%", label: "Faster approval cycles" },
      { value: "20+", label: "Licensed designs created" },
      { value: "Top 5", label: "Sales rankings achieved" },
      { value: "1", label: "Primary licensing contact" },
    ],
    skills: ["Illustration", "Character Design", "Print Design", "Licensed Artwork", "Adobe Illustrator"],
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    thumb: "https://images.unsplash.com/photo-1776774568714-13eef12a21a7?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1678951558353-3a85c36358bb?w=1200&h=800&fit=crop&auto=format",
    ],
    featured: false,
  },
];

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
