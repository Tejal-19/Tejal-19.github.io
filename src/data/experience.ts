// Plain typed array rather than a content collection: entries here don't
// get their own page, so a collection (built for many independent files)
// would be more machinery than the data needs.
export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'IIT Bombay — Systems & Control Lab',
    role: 'Research Assistant',
    period: 'May 2024 – Present',
    location: 'Mumbai, India',
    bullets: [
      'Working on the navigation module of the autonomous underwater vehicle.',
      'Developed dynamic mapping using octomapping to classify static and dynamic obstacles with 90% accuracy, enhancing planning efficiency.',
      'Developing the 3D planning and control module to navigate to goal points in optimal time.',
    ],
    tags: ['ROS', 'Gazebo', 'C++', 'Python', 'Darknet', 'Computer Vision'],
  },
  {
    company: 'IIT Bombay — Systems & Control Lab',
    role: 'Research Intern',
    period: 'May – Aug 2024',
    location: 'Mumbai, India',
    bullets: [
      'Literature review on clustering/sorting algorithms and N-dimensional data structures for benchmarking datasets.',
      'Built a vector algebra-based simulation tool achieving 99.9% reduction in processing time (4–5 hours → 0.02 seconds).',
      'Implemented K-D tree data structures for efficient high-dimensional data storage and retrieval.',
    ],
    tags: ['C++', 'Python'],
  },
  {
    company: 'Miko.ai',
    role: 'Robotics Engineer',
    period: 'Jul 2023 – Apr 2024',
    location: 'Mumbai, India',
    bullets: [
      'Motion planning and feature development for robust, obstacle-free robot motion accounting for robot dynamics.',
      'Sensor fusion and calibration for use-case-specific adaptation.',
      'Implementation and calibration of PID controller considering mechanical dynamics.',
    ],
    tags: ['C++', 'Embedded-C', 'Python', 'MATLAB'],
  },
  {
    company: 'Orangewood Labs',
    role: 'Robotics Intern',
    period: 'Jul – Oct 2021',
    location: 'Remote, India',
    bullets: [
      'Developed a 3D pose estimation algorithm to enhance trajectory planning for a robotic arm.',
      'Trained object detection models using the Darknet framework.',
    ],
    tags: ['ROS', 'Gazebo', 'C++', 'Python', 'Darknet'],
  },
  {
    company: 'Airpix',
    role: 'Systems Intern',
    period: 'Apr – Jul 2021',
    location: 'Remote, India',
    bullets: [
      'Researched No-Permission-No-Takeoff (NPNT) protocol for drone operations in India.',
      'Developed NPNT-compliant drones using Ardupilot software on Pixhawk controller.',
    ],
    tags: ['Pixhawk', 'Ardupilot', 'Python', 'C++', 'Fusion360'],
  },
  {
    company: 'MITACS — Globalink Research Internship',
    role: 'Research Intern',
    period: 'May – Aug 2022',
    location: 'Montreal, Canada',
    bullets: [
      'Worked on UAV deployment, clustering, and stabilization algorithms.',
      'Developed a pre-takeoff UAV clustering algorithm that decreased clustering time by ~20s and significantly improved efficiency vs. conventional methods.',
    ],
    tags: ['MATLAB', 'Gazebo', 'Simulink'],
  },
  {
    company: 'State Environment Department, Maharashtra',
    role: 'Research Intern',
    period: 'Oct 2020 – Apr 2021',
    location: 'Mumbai, India',
    bullets: [
      'Devised a K-Means + PCA algorithm to cluster key information and detect changes in satellite imagery over time.',
      'Developed a ML model to assess vegetation loss from time-series remote sensing data.',
    ],
    tags: ['MATLAB', 'Python', 'ML'],
  },
];
