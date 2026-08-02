// Central content source for the digital rulebook.
// Wording, headings, and organization are preserved from the original
// Prototype Quest booklet. Splitting content across leaves keeps every
// page readable on a phone screen without overcrowding.

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "eyebrow"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "divider" };

export interface BookPageData {
  /** Unique id, used for search indexing and deep links */
  id: string;
  /** Chapter this page belongs to */
  chapterId: string;
  /** Small tag shown in the page's running header */
  kicker: string;
  blocks: ContentBlock[];
}

export interface Chapter {
  id: string;
  label: string;
  /** First page id belonging to this chapter, used by the Contents drawer */
  firstPageId: string;
}

export const chapters: Chapter[] = [
  { id: "cover", label: "Cover", firstPageId: "cover" },
  { id: "welcome", label: "Welcome", firstPageId: "welcome" },
  { id: "team", label: "Team Formation", firstPageId: "team" },
  { id: "problem", label: "Problem Statement", firstPageId: "problem" },
  { id: "rules", label: "Rules", firstPageId: "rules-1" },
  {
    id: "qualified-students",
    label: "Qualified Students",
    firstPageId: "qualified-s5-bca-a-b",
  },
];

const qualifiedStudentPages: BookPageData[] = [
  {
    id: "qualified-s5-bca-a-b",
    chapterId: "qualified-students",
    kicker: "Qualified Students",
    blocks: [
      { type: "heading", text: "S5 BCA A" },
      {
        type: "list",
        items: [
          "FEBIN",
          "AVANI K S",
          "FIDHA FARZEEN",
          "ALAN BINOY",
          "HANIYA",
          "CHAITHANYA SUNIL",
          "AISWARYA V M",
          "FATHIMATHU SANA",
          "AMITH",
          "ANAY K ANIL",
          "ADITHYA KRISHNAN K M",
          "SUBJITH T S",
          "SIBIN",
          "DEVADUTT",
          
        ],
      },
      { type: "heading", text: "S5 BCA B" },
      {
        type: "list",
        items: [
          "AROMAL E S",
          "MUHAMMED FAZIL K S",
          "PRANAV PRAKASHAN",
          "DOMINIC",
          "ABIN",
          "ARJUN",
          "ARAVIND",
          
        ],
      },
    ],
  },
  {
    id: "qualified-s5-bca-c-bsc-cs",
    chapterId: "qualified-students",
    kicker: "Qualified Students",
    blocks: [
      { type: "heading", text: "S5 BCA C" },
      {
        type: "list",
        items: [
          "FIDHA",
          "BAYITHA",
          "SINIYA",
          "PAVANA",
          "SANJANA",
          "CHRISTO",
          "NEERAJ",
          "SARAVAN",
          "SREELESH",
          "CHRISTINO MESSI",
          "AZMIL",
        ],
      },
      { type: "heading", text: "S5 BSC CS" },
      {
        type: "list",
        items: ["ADHUL K R", "ASTON", "JERALD", "ASWIN ADITHIAN"],
      },
    ],
  },
  {
    id: "qualified-s5-bsc-ai-it",
    chapterId: "qualified-students",
    kicker: "Qualified Students",
    blocks: [
      { type: "heading", text: "S5 BSC AI" },
      {
        type: "list",
        items: ["DERIN", "DENIL", "SREELAKSHMI", "ABHINAV", "ALFINA", "ADITHYAN"],
      },
      { type: "heading", text: "S5 BSC IT" },
      {
        type: "list",
        items: ["FAZILA", "BIDHA", "SAFNA", "NAZIL"],
      },
    ],
  },
  {
    id: "qualified-s3-bca-a-b",
    chapterId: "qualified-students",
    kicker: "Qualified Students",
    blocks: [
      { type: "heading", text: "S3 BCA A" },
      {
        type: "list",
        items: [
          "GOPIKA",
          "ANEESHA",
          "DEVIPRIYA",
          "PRARTHANA",
          "SHARON",
          "SARANG",
          "ALSABITH",
          "NIHAL",
          "ANANDHAKRISHNAN",
        ],
      },
      { type: "heading", text: "S3 BCA B" },
      {
        type: "list",
        items: ["IRFANA", "RIZNA", "AYSHA", "AMRITHA", "ADARSH T S", "AADHIL", "VISHNU"],
      },
    ],
  },
  {
    id: "qualified-s3-bca-c-d",
    chapterId: "qualified-students",
    kicker: "Qualified Students",
    blocks: [
      { type: "heading", text: "S3 BCA C" },
      {
        type: "list",
        items: [
          "FATHIMA AHLAM",
          "DEVIKA M S",
          "ADHYA",
          "ALEESHA",
          "NAGARJUN",
          "GAUTHAM",
          "FARHA",
          "NAZNEEN",
          "DIYA FATHIMA",
          "ANGEL",
        ],
      },
      { type: "heading", text: "S3 BCA D" },
      {
        type: "list",
        items: [
          "ALAN ANTONY",
          "SAHAL",
          "ASHIN",
          "NASMAL",
          "GANASHYAM",
          "NISHAN",
          "SHAMIL",
          "SABARI",
          "THOWFEEK",
        ],
      },
    ],
  },
  {
    id: "qualified-s3-bsc-cs-ai-it",
    chapterId: "qualified-students",
    kicker: "Qualified Students",
    blocks: [
      { type: "heading", text: "S3 BSC CS" },
      {
        type: "list",
        items: ["AYSHA", "RAHANA", "SAFIYA", "GREESHMA", "SANIYA", "KRISHNAVENI", "KARTHIKA"],
      },
      { type: "heading", text: "S3 BSC AI" },
      {
        type: "list",
        items: ["MILHAN P A", "PRAJWIN", "SNIYA", "KEERTHANA", "SREEHARI"],
      },
      { type: "heading", text: "S3 BSC IT" },
      {
        type: "list",
        items: ["ARYADEV", "ANEES", "BLESSAN SHAJI"],
      },
    ],
  },
];

export const pages: BookPageData[] = [
  {
    id: "welcome",
    chapterId: "welcome",
    kicker: "A Note To You",
    blocks: [
      { type: "eyebrow", text: "Dear Students," },
      {
        type: "paragraph",
        text:
          "Congratulations to all the students whose names appear in the attached lists! You have successfully qualified for Prototype Quest. Your innovative designs and creative thinking have earned you a place in the next stage.",
      },
      {
        type: "paragraph",
        text:
          "Kindly find the attached qualified students list in this book.",
      },
      {
        type: "paragraph",
        text: "Now it's time to transform your ideas into a working prototype!",
      },
    ],
  },
  {
    id: "team",
    chapterId: "team",
    kicker: "Chapter One",
    blocks: [
      { type: "heading", text: "Team Formation" },
      {
        type: "list",
        items: [
          "Form a team of 4–6 members.",
          "Team members must be selected only from your class.",
          "Register your team with your class mentor.",
          "Every member must have a clearly defined role (e.g., Team Lead, UI/UX Designer, Frontend Developer, Backend Developer, Presenter, Documentation).",
        ],
      },
    ],
  },
  {
    id: "problem",
    chapterId: "problem",
    kicker: "Chapter Two",
    blocks: [
      { type: "heading", text: "Problem Statement" },
      {
        type: "paragraph",
        text:
          "Teams may choose any socially relevant problem and find a solution from one of the following domains:",
      },
      {
        type: "list",
        items: [
          "Education",
          "Healthcare",
          "Environment & Sustainability",
          "Transportation & Mobility",
          "E-Commerce & Local Business",
          "Cybersecurity & Digital Safety",
          "Smart City & Community Services",
        ],
      },
    ],
  },
  {
    id: "rules-1",
    chapterId: "rules",
    kicker: "Chapter Three",
    blocks: [
      { type: "heading", text: "Event Rules" },
      {
        type: "list",
        items: [
          "Phase 1: Teams will have 6 hours to design and build a functional prototype.",
          "Phase 2: Qualified teams will present and demonstrate their prototype before the evaluation panel.",
          "Teams that do not produce a working prototype during Phase 1 will not be eligible for Phase 2.",
          "Every team member must actively contribute to the project.",
          "Problem statement must be delivered to the event in charge before the event.",
          
        ],
      },
    ],
  },
  {
    id: "rules-2",
    chapterId: "rules",
    kicker: "Chapter Three",
    blocks: [
      {
        type: "list",
        items: [
          "Team members list should be submitted before August 15.",
        ],
      },
      { type: "divider" },
      {
        type: "paragraph",
        text:
          "We look forward to seeing your creativity, innovation, and teamwork in action.",
      },
      {
        type: "paragraph",
        text:
          "Best wishes to all participating teams! Build innovative solutions that create a positive impact.",
      },
    ],
  },
  ...qualifiedStudentPages,
];

export const eventMeta = {
  college: "Nirmala College of Arts and Science",
  location: "Mellor, Calicut",
  department: "Department of Computer Science Presents",
  title: "Prototype Quest",
  date: "August 2026",
  coverImage: "/assets/prototype-quest-cover.png",
};

/** Flattens a page's blocks into plain text, used for search indexing. */
export function pageToPlainText(page: BookPageData): string {
  return page.blocks
    .map((b) => {
      if (b.type === "list") return b.items.join(" ");
      if (b.type === "divider") return "";
      return b.text;
    })
    .join(" ");
}
