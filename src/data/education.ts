export interface EducationEntry {
  school: string;
  location: string;
  degree: string;
  period: string;
  gpa?: string;
  courses: string[];
}

export const education: EducationEntry[] = [
  {
    school: 'Columbia University',
    location: 'New York, USA',
    degree: 'M.S. Computer Science — Robotics',
    period: '2024 – Present',
    courses: [
      'Computational Aspects of Robotics',
      'Machine Learning',
      'Analysis of Algorithms',
      'Artificial Intelligence',
      'Computer Vision: First Principles',
    ],
  },
  {
    school: 'Veermata Jijabai Technological Institute',
    location: 'Mumbai, India',
    degree: 'B.Tech — Textile Technology',
    period: '2019 – 2023',
    gpa: '3.95 / 4.0',
    courses: [
      'Computer Programming',
      'Linear Algebra',
      'Applied Mathematics',
      'Statistics',
      'Optimization & Decision Sciences',
      'Applied Physics',
    ],
  },
];
