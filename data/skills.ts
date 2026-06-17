export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: 'Language Models',
    items: [
      'RAG', 'Agents & tool use', 'MCP', 'Prompt & context engineering', 'Structured outputs'
    ],
  },
  {
    label: 'Applied AI',
    items: [
      'Fine-tuning (SFT, GRPO)', 'Inference optimization', 'Anthropic & OpenAI SDKs',
    ],
  },
  {
    label: 'ML & Data',
    items: [
      'PyTorch', 'NLP', 'scikit-learn', 'pandas', 'NumPy', 'SQL'
    ],
  },
  {
    label: 'Engineering',
    items: [
      'Python', 'TypeScript', 'FastAPI', 'React', 'PostgreSQL', 'REST APIs', 'Git'
    ],
  },
  {
    label: 'Cloud & Infra',
    items: [
      'AWS (ECS, EC2, S3, SageMaker)', 'Docker', 'CI/CD (CodePipeline, CodeBuild)', 'Linux'
    ],
  },
];
