export interface Hackathon {
  event: string;
  result: 'Winner' | 'Runner-up';
  date: string;
  bullets: string[];
  tags: string[];
  link?: string;
}

export const hackathons: Hackathon[] = [
  {
    event: 'Columbia × AWS Bedrock Hackathon',
    result: 'Winner',
    date: 'Nov 2025',
    link: 'https://github.com/Tejal-19/cfo-vision-buddy',
    bullets: [
      'Modeled a serverless end-to-end data lifecycle platform on AWS Bedrock, Lambda, and API Gateway supporting enterprise data acquisition, transformation, and governed access.',
      'Developed event-driven microservices orchestrating LLM agents for financial insights, applying data quality frameworks and structured validation to reduce hallucinations across analytical pipelines.',
    ],
    tags: ['AWS Bedrock', 'Lambda', 'API Gateway', 'LLM Agents'],
  },
  {
    event: 'Snapdragon Multiverse Hackathon (Qualcomm × Columbia)',
    result: 'Runner-up',
    date: 'Jan 2026',
    bullets: [
      'Implemented an on-device inference pipeline optimized for Snapdragon X Elite using Kotlin and Python for real-time workout pose tracking via MediaPipe.',
      'Modeled an edge-to-cloud AI workflow integrating Claude and GPT-4 to generate contextual feedback on exercise form.',
    ],
    tags: ['Kotlin', 'Python', 'MediaPipe', 'Snapdragon X Elite', 'Claude', 'GPT-4'],
  },
];
