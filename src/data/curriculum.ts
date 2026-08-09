export const GRADES = [9, 10, 11, 12] as const;
export type Grade = (typeof GRADES)[number];

export interface Subject {
  name: string;
  icon: string;
  color: string;
}

export interface Stream {
  id: "natural" | "social";
  name: string;
  description: string;
  subjects: Subject[];
}

export const STREAMS: Stream[] = [
  {
    id: "natural",
    name: "Natural Science",
    description: "For students pursuing medicine, engineering & technology tracks.",
    subjects: [
      { name: "Mathematics", icon: "Sigma", color: "from-blue-400 to-blue-600" },
      { name: "Physics", icon: "Atom", color: "from-purple-400 to-purple-600" },
      { name: "Chemistry", icon: "FlaskConical", color: "from-emerald-400 to-emerald-600" },
      { name: "Biology", icon: "Dna", color: "from-rose-400 to-rose-600" },
    ],
  },
  {
    id: "social",
    name: "Social Science",
    description: "For students pursuing law, public administration & business tracks.",
    subjects: [
      { name: "Geography", icon: "Globe2", color: "from-teal-400 to-teal-600" },
      { name: "History", icon: "ScrollText", color: "from-amber-400 to-amber-600" },
      { name: "Economics", icon: "TrendingUp", color: "from-cyan-400 to-cyan-600" },
    ],
  },
];

export const GRADE_LABELS: Record<Grade, string> = {
  9: "Grade 9",
  10: "Grade 10",
  11: "Grade 11",
  12: "Grade 12 · Matric",
};
