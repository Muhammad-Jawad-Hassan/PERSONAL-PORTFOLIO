export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

/**
 * Placeholder testimonials. Replace with real quotes when collected.
 * Tone: specific, brief, credible — what a peer/lead would actually say.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Jawad ships what he promises. We hand him a vague AI requirement and get back a production system that survives the demo.",
    author: "Saad Iqbal",
    role: "Engineering Lead",
    company: "Devsinc",
  },
  {
    id: "t2",
    quote:
      "Rare combination of academic rigor and shipping discipline. He turned our messy RAG prototype into something we trust in front of clients.",
    author: "Hira Khan",
    role: "Senior Engineer",
    company: "Devsinc",
  },
  {
    id: "t3",
    quote:
      "He treats edge cases like the main event. Our pellet detection pipeline went from 'demo' to 'deployed' under his ownership.",
    author: "Ali Raza",
    role: "Product Manager",
    company: "AxcelerateAI",
  },
  {
    id: "t4",
    quote:
      "Knows when to over-engineer and when not to. That's the rare skill, and most engineers learn it five years too late.",
    author: "Faisal Mehmood",
    role: "Senior Data Scientist",
    company: "Nextbridge",
  },
  {
    id: "t5",
    quote:
      "Wrote tests for an AI system. Read that twice. The pipelines that come out of his side of the codebase don't break.",
    author: "Usman Tariq",
    role: "Tech Lead",
    company: "Devsinc",
  },
  {
    id: "t6",
    quote:
      "If you want someone who reads the paper AND the docs AND the source — that's Jawad. He shows up to standups already three layers deep.",
    author: "Bilal Ahmad",
    role: "Engineering Manager",
    company: "Devsinc",
  },
];
