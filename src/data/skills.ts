export interface SkillCategory {
  title: string;
  icon: string; // Font Awesome-free — see SkillsGrid.astro for inline icon mapping
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'code',
    items: ['C++', 'Python', 'C', 'Embedded-C', 'MATLAB', 'JavaScript', 'HTML / CSS'],
  },
  {
    title: 'Robotics & Frameworks',
    icon: 'robot',
    items: ['ROS / ROS2', 'OpenCV', 'MoveIt', 'Darknet', 'NumPy', 'Scikit-Learn', 'PyTorch', 'Pandas'],
  },
  {
    title: 'Software & Tools',
    icon: 'tools',
    items: ['Gazebo', 'Coppeliasim', 'MATLAB / Simulink', 'Git', 'Linux', 'Shell Scripting', 'MySQL'],
  },
  {
    title: 'Core Domains',
    icon: 'brain',
    items: ['Motion Planning', 'SLAM', 'Perception', 'Control Systems', 'Sensor Fusion', 'Computer Vision', 'Machine Learning'],
  },
];
