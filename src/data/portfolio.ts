import { languages } from '@/data';

const personal = {
  name: 'Ricardo Bizerra',
  email: 'rblf@cin.ufpe.br',
  description: {
    prefix: 'Aspiring',
    suffix: 'Back-End Software Engineer',
  },
} as const;

const workExperience = [
  {
    id: 'citi',
    institution: 'CITi',
    color: 'green',
    roles: [
      {
        title: 'Desenvolvedor Full-Stack',
        type: 'Empresa Júnior',
        startDate: '01/2023',
        endDate: '06/2023',
      },
      {
        title: 'Gerente de Software',
        type: 'Empresa Júnior',
        startDate: '07/2023',
        endDate: '12/2023',
      },
    ],
  },
  {
    id: 'trackingTrade',
    institution: 'TrackingTrade',
    color: 'blue',
    roles: [
      {
        title: 'Desenvolvimento Front-End',
        type: 'Estágio',
        startDate: '01/2024',
        endDate: null,
      },
    ],
  },
] as const;

const educationExperience = [
  {
    id: 'senac',
    institution: 'Senac',
    color: 'orange',
    courses: [
      {
        title: 'Análise e Desenvolvimento de Sistemas',
        type: 'Tecnólogo',
        startDate: '06/2022',
        endDate: '06/2026',
      },
    ],
  },
  {
    id: 'ufpe',
    institution: 'UFPE',
    color: 'red',
    courses: [
      {
        title: 'Ciência da Computação',
        type: 'Graduação',
        startDate: '06/2022',
        endDate: '06/2026',
      },
    ],
  },
] as const;

type SkillKey = 'backend' | 'frontendMobile' | 'general';
type SkillValue = { title: string; languages: (keyof typeof languages)[] };
type Skills = Record<SkillKey, SkillValue>;

const skills: Skills = {
  backend: {
    title: 'Back-End',
    languages: [
      'nodejs',
      'express',
      'nestjs',
      'docker',
      'postgresql',
      'redis',
      'graphql',
    ],
  },
  frontendMobile: {
    title: 'Front-End + Mobile',
    languages: [
      'react',
      'nextjs',
      'tailwindcss',
      'shadcn',
      'reactnative',
      'expo',
    ],
  },
  general: {
    title: 'Geral',
    languages: ['javascript', 'typescript', 'python', 'go'],
  },
} as const;

const socialLinks = {
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/ricardobizerra/',
  },
  github: {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/ricardobizerra',
  },
  curriculo: {
    id: 'file',
    label: 'Currículo [PDF]',
    url: '/curriculo.pdf',
  },
} as const;

export const data = {
  personal,
  workExperience,
  educationExperience,
  skills,
  socialLinks,
};
