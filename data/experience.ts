export type Experience = {
  company: string;
  logo: string; // path under /public/logos
  logo_mobile: string; // path under /public/logos for mobile-friendly logos
  dates: string;
  role?: string;
  narrative: string; // company-level narrative, NOT resume bullets
  highlights?: string[];
  url: string | null; // company website, or null if none
};

export const experience: Experience[] = [
  {
    company: 'Penta Group',
    logo: '/logos/penta.svg',
    logo_mobile: '/logos/penta_mobile.svg',
    dates: '2021 – 2024, 2026 – Present',
    role: 'Senior Data Scientist / Data Scientist',
    narrative:
      'Penta is a global strategy and communications consultancy where my work has moved from client-facing NLP and media-intelligence systems into company-wide AI tooling. Across both stints, the through line has been embedded engineering: understanding analyst workflows, finding the right technical shape for ambiguous needs, and shipping tools that hold up in live client delivery.',
    highlights: [
      'Built NLP and social-listening systems for media intelligence across social and traditional news data.',
      'Returned to design and ship internal AI tooling used by analysts across the company.',
      'Reworked notebook-era infrastructure into API-first services, worker execution, persistence, and observability.',
    ],
    // url: 'https://pentagroup.com/',
    url: null,
  },
  {
    company: 'KAIST MLAI Lab',
    logo: '/logos/kaist.svg',
    logo_mobile: '/logos/kaist_mobile.svg',
    dates: 'Feb 2024 – Dec 2025',
    role: 'Graduate Research Assistant',
    narrative:
      "At KAIST's MLAI Lab, I worked on efficient LLM reasoning and test-time compute. The work sharpened the research side of my AI practice: reading quickly, testing ideas rigorously, and turning model-behavior questions into concrete methods that can be evaluated against real reasoning workloads.",
    highlights: [
      'First-authored Sketch-of-Thought, an EMNLP 2025 paper on efficient LLM reasoning.',
      'Developed an inference-time method that reduced reasoning tokens by roughly 84% on average.',
      'Explored training-free methods alongside GRPO and supervised fine-tuning approaches.',
    ],
    // url: 'https://www.mlai-kaist.com',
    url: null,
  },
  {
    company: 'Lighthouse Analytics',
    logo: '/logos/freelance.svg',
    logo_mobile: '/logos/freelance_mobile.svg',
    dates: 'Jan 2025 – Present',
    role: 'AI Engineering Consultant',
    narrative:
      'Lighthouse Analytics is the name I use for independent AI engineering work. The main engagement was a production invoice-intelligence system for a small-business client, scoped from discovery with non-technical stakeholders through rollout. It used LLM-driven OCR, OpenAI structured outputs, and Pydantic schemas to turn messy vendor documents into dependable business data.',
    highlights: [
      'Processed roughly 3,000 invoices per month across 100+ vendor formats.',
      'Saved an estimated 2,000 working hours and $30,000+ in annual operating costs.',
      'Helped the client scale a high-volume back-office workflow without adding headcount.',
    ],
    url: null,
  },
  {
    company: 'The Wall Street Journal',
    logo: '/logos/wsj.svg',
    logo_mobile: '/logos/wsj_mobile.svg',
    dates: 'Aug 2021 – Dec 2021',
    role: 'Journo-Tech Fellow',
    narrative:
      "At The Wall Street Journal, I worked on applied machine learning for editorial analytics. The fellowship was an early exposure to building against a real product environment: using internal content data, preparing training sets from production databases, and framing model outputs around decisions an editorial team might actually care about.",
    highlights: [
      'Designed and trained a ML model to predict article performance based on its headline.',
      "Trained a model on 13,000+ metadata-rich articles from WSJ's content databases.",
      'Embeded with the News Insights team to develop data-driven solutions for Journalists.',
    ],
    // url: 'https://www.wsj.com',
    url: null,
  },
  {
    company: 'NASA Langley Research Center',
    logo: '/logos/nasa.svg',
    logo_mobile: '/logos/nasa_mobile.svg',
    dates: '2019 – 2021',
    role: 'Development Intern',
    narrative:
      'Across several internships at NASA Langley, I built AR and VR tools for researchers working with 3D data. The work combined software development, data visualization, and user research: talking with researchers, understanding how they inspected technical data, and turning those workflows into interactive Unity prototypes.',
    highlights: [
      "Led development of a VR heat-map visualization tool adopted by Langley's Engineering Design Studio.",
      'Interviewed 13 researchers to shape requirements and interaction design.',
      'Built Unity3D prototypes with integrated data processing, analysis, and visualization workflows.',
    ],
    // url: 'https://www.nasa.gov',
    url: null,
  },
  {
    company: 'York College, CUNY',
    logo: '/logos/york.svg',
    logo_mobile: '/logos/york_mobile.svg',
    dates: 'May 2022 – Oct 2022',
    role: 'Researcher',
    narrative:
      'At York College, I supported public-interest research on indigent burials by helping turn scattered public records into a structured research dataset. The project sat at the edge of data engineering and social research, with an emphasis on feasibility, source coverage, and making messy public information usable for analysis.',
    highlights: [
      'Designed an automated scraping and extraction pipeline for state and local records.',
      'Helped assess the feasibility of a national database across jurisdictions.',
      'Contributed analysis supporting a Population Association of America research abstract.',
    ],
    // url: 'https://www.york.cuny.edu/',
    url: null,
  },
];
