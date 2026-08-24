export type Project = {
  title: string;
  description: string;
  problem: string;
  features: string[];
  technologies: string[];
  category: "Full Stack" | "Frontend" | "Java" | "AI/ML";
  github?: string;
  demo?: string;
  accent: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  organization: string;
  description: string;
  tags: string[];
};