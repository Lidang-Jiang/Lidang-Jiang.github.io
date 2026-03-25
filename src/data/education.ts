export interface Education {
  school: {
    en: string;
    zh: string;
  };
  degree?: {
    en: string;
    zh: string;
  };
  major?: {
    en: string;
    zh: string;
  };
  department?: {
    en: string;
    zh: string;
  };
  period: string;
  highlights?: {
    en: string[];
    zh: string[];
  };
}

export const education: Education[] = [
  {
    school: {
      en: "Sichuan University",
      zh: "四川大学",
    },
    degree: {
      en: "Master's Degree",
      zh: "硕士",
    },
    major: {
      en: "Materials and Chemical Engineering",
      zh: "材料与化工",
    },
    department: {
      en: "School of Chemical Engineering",
      zh: "化学工程学院",
    },
    period: "2021.09 - 2024.07",
    highlights: {
      en: [
        "2021-2022 University Second-Class Academic Scholarship",
        "2022-2023 University Second-Class Academic Scholarship",
        "2023-2024 University Second-Class Academic Scholarship",
      ],
      zh: [
        "2021-2022 学年 校级二等学业奖学金",
        "2022-2023 学年 校级二等学业奖学金",
        "2023-2024 学年 校级二等学业奖学金",
      ],
    },
  },
  {
    school: {
      en: "Jinzhong University",
      zh: "晋中学院",
    },
    degree: {
      en: "Bachelor's Degree",
      zh: "本科",
    },
    major: {
      en: "Applied Chemistry",
      zh: "应用化学",
    },
    department: {
      en: "School of Chemistry and Chemical Engineering",
      zh: "化学化工学院",
    },
    period: "2014.09 - 2018.07",
  },
  {
    school: {
      en: "Tongshan No.1 Senior High School",
      zh: "通山县第一中学",
    },
    period: "2011.09 - 2014.07",
  },
];
