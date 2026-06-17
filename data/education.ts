export type Education = {
  institution: string;
  degree: string;
  detail: string;
  dates: string;
};

export const education: Education[] = [
  {
    institution: 'Korea Advanced Institute of Science and Technology (KAIST)',
    degree: 'M.S., Artificial Intelligence',
    detail: 'Advisor: Prof. Sung Ju Hwang',
    dates: 'Dec 2025',
  },
  {
    institution: 'Lehman College, CUNY',
    degree: 'B.S., Computer Science (Minor: Data Science)',
    detail: 'Summa Cum Laude',
    dates: 'Dec 2022',
  },
];
