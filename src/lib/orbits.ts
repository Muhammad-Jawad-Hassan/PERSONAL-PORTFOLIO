export type MoonConfig = {
  id: string;
  label: string;
  hint: string;
  href: string;

  radius: number;
  speed: number;
  size: number;
  initialAngle: number;
  // inclination + axisRotation orient each orbit plane to a distinct screen path.
  inclination: number;
  axisRotation: number;

  edgeColor: string;
  iconSrc: string;
};

const MOON_SIZE = 0.2;
const MOON_RADIUS = 4.0;

const PI = Math.PI;

export const moons: MoonConfig[] = [
  {
    id: "about",
    label: "About",
    hint: "Background · Motto · Foundations · Off-Screen Life.",
    href: "/#about",
    radius: MOON_RADIUS,
    speed: 0.18,
    size: MOON_SIZE,
    initialAngle: 0,
    inclination: PI / 4,
    axisRotation: PI / 2,
    edgeColor: "#8B5CF6",
    iconSrc: "/models/rocket.svg",
  },
  {
    id: "credentials",
    label: "Credentials",
    hint: "Gold Medalist · Dean's List · 99th National Rank · BSCS, GCU.",
    href: "/#credentials",
    radius: MOON_RADIUS,
    speed: 0.15,
    size: MOON_SIZE,
    initialAngle: 0.52,
    inclination: PI / 6,
    axisRotation: PI / 3,
    edgeColor: "#FBBF24",
    iconSrc: "/models/trophy.svg",
  },
  {
    id: "projects",
    label: "Projects",
    hint: "Agentic Platforms · RAG Pipelines · Vision · Backends · GenAI.",
    href: "/#projects",
    radius: MOON_RADIUS,
    speed: 0.13,
    size: MOON_SIZE,
    initialAngle: 1.05,
    inclination: PI / 4,
    axisRotation: -PI / 2,
    edgeColor: "#00E5FF",
    iconSrc: "/models/code-xml.svg",
  },
  {
    id: "experience",
    label: "Experience",
    hint: "Devsinc · Nextbridge · AxcelerateAI.",
    href: "/#experience",
    radius: MOON_RADIUS,
    speed: 0.1,
    size: MOON_SIZE,
    initialAngle: 4.0,
    inclination: 0,
    axisRotation: 0,
    edgeColor: "#F97316",
    iconSrc: "/models/briefcase.svg",
  },
  {
    id: "skills",
    label: "Skills",
    hint: "AI/ML · Backend · Cloud · DevOps · Tooling.",
    href: "/#skills",
    radius: MOON_RADIUS,
    speed: 0.22,
    size: MOON_SIZE,
    initialAngle: 2.45,
    inclination: PI / 2,
    axisRotation: PI / 2,
    edgeColor: "#EC4899",
    iconSrc: "/models/layers.svg",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    hint: "On Record · What Peers, Leads, and Managers Said.",
    href: "/#testimonials",
    radius: MOON_RADIUS,
    speed: 0.16,
    size: MOON_SIZE,
    initialAngle: 5.3,
    inclination: PI / 3,
    axisRotation: 0,
    edgeColor: "#FACC15",
    iconSrc: "/models/quote.svg",
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Email · LinkedIn · GitHub · Hire Me.",
    href: "/#contact",
    radius: MOON_RADIUS,
    speed: 0.2,
    size: MOON_SIZE,
    initialAngle: 6.4,
    inclination: (3 * PI) / 8,
    axisRotation: -PI / 2,
    edgeColor: "#10B981",
    iconSrc: "/models/send.svg",
  },
];
