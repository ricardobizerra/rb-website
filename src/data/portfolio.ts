import { languages } from '@/data';

const personal = {
  name: 'Ricardo Bizerra',
  email: 'rblf@cin.ufpe.br',
  description: {
    prefix: 'Engenheiro de Software',
    suffix: 'Full-Stack',
  },
} as const;

type WorkExperience = {
  institution: keyof typeof companies;
  title: string;
  type: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills: (keyof typeof languages)[];
};

const companies = {
  citi: {
    institution: 'CITi',
    color: 'green',
  },
  trackingTrade: {
    institution: 'TrackingTrade',
    color: 'blue',
  },
} as const;

const workExperience: WorkExperience[] = [
  {
    institution: 'citi',
    title: 'Desenvolvedor Full-Stack',
    type: 'Empresa Júnior',
    startDate: '01/2023',
    endDate: '06/2023',
    description:
      'Desenvolvimento de uma plataforma de gerenciamento de projetos para a CITi.',
    skills: ['nestjs', 'docker', 'postgresql', 'nextjs', 'reactnative'],
  },
  {
    institution: 'citi',
    title: 'Gerente de Software',
    type: 'Empresa Júnior',
    startDate: '07/2023',
    endDate: '12/2023',
    description: 'Gerenciamento de projetos para a CITi.',
    skills: [
      'nodejs',
      'express',
      'docker',
      'postgresql',
      'nextjs',
      'reactnative',
    ],
  },
  {
    institution: 'trackingTrade',
    title: 'Desenvolvimento Front-End',
    type: 'Estágio',
    startDate: '01/2024',
    endDate: null,
    description:
      'Desenvolvimento de uma plataforma de gerenciamento de projetos para a TrackingTrade.',
    skills: ['react', 'nextjs', 'tailwindcss', 'shadcn', 'graphql'],
  },
] as const;

type EducationExperience = {
  institution: keyof typeof universities;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
};

const universities = {
  senac: {
    institution: 'Senac',
    color: 'orange',
  },
  ufpe: {
    institution: 'UFPE',
    color: 'red',
  },
} as const;

const educationExperience: EducationExperience[] = [
  {
    institution: 'senac',
    title: 'Análise e Desenvolvimento de Sistemas',
    type: 'Tecnólogo',
    startDate: '01/2022',
    endDate: '06/2024',
    description:
      'Desenvolvimento de uma plataforma de gerenciamento de projetos para a CITi.',
  },
  {
    institution: 'ufpe',
    title: 'Ciência da Computação',
    type: 'Graduação',
    startDate: '06/2022',
    endDate: '06/2026',
    description:
      'Desenvolvimento de uma plataforma de gerenciamento de projetos para a CITi.',
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
  companies,
  workExperience,
  universities,
  educationExperience,
  skills,
  socialLinks,
};
