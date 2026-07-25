export type Achievement = {
  id: string;
  title: string;
  description: string;
  emphasis?: string;
};

export const achievements: Achievement[] = [
  {
    id: "gold-medalist",
    title: "University Gold Medalist",
    emphasis: "Roll of Honor",
    description:
      "Awarded for the highest academic standing in the BSCS graduating class — recognizing exceptional dedication and mastery of course material.",
  },
  {
    id: "shining-star",
    title: "2x Quarterly Shining Star Award",
    emphasis: "Devsinc",
    description:
      "Recognized twice for outstanding quarterly performance at Devsinc, awarded for consistent delivery and impact across major AI initiatives.",
  },
  {
    id: "deans-list",
    title: "Dean's Honor List",
    emphasis: "Government College University",
    description:
      "Recognized for consistently superior academic performance throughout university — a sustained commitment to excellence.",
  },
  {
    id: "national-rank",
    title: "99th Percentile · National IT Examination",
    emphasis: "Government of Pakistan",
    description:
      "Top-percentile rank in a highly competitive national IT examination — strong technical proficiency against a wide talent pool.",
  },
];

export const courses = [
  { name: "Deep Learning Specialization", provider: "DeepLearning.AI" },
  { name: "TensorFlow Developer Specialization", provider: "DeepLearning.AI" },
  { name: "Machine Learning Specialization", provider: "DeepLearning.AI" },
  {
    name: "Mathematics for Machine Learning and Data Science",
    provider: "DeepLearning.AI",
  },
] as const;

export const education = {
  degree: "Bachelor's in Computer Science (BSCS)",
  institution: "Government College University",
  location: "Lahore, Pakistan",
  start: "10/2017",
  end: "08/2021",
  cgpa: "3.73",
  honor: "Gold Medalist",
} as const;
