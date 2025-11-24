import { languages } from './languages';

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectCategory = 'frontend' | 'backend' | 'ai';

export type ProjectType = 'individual' | 'group';

export type Project = {
  id: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  technologies: (keyof typeof languages)[];
  imageUrl?: string;
  githubLinks?: ProjectLink[];
  liveUrl?: string;
  projectType: ProjectType;
};

export const githubProjects: Project[] = [
  {
    id: 'financial-tracker',
    title: 'Rastreador Financeiro',
    description:
      'Aplicação full-stack para controle e análise de finanças pessoais e investimentos de renda fixa.',
    categories: ['frontend', 'backend'],
    technologies: ['typescript', 'nestjs', 'nextjs', 'postgresql', 'prisma'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Front-End',
        url: 'https://github.com/ricardobizerra/financial-tracker',
      },
      {
        label: 'Back-End',
        url: 'https://github.com/ricardobizerra/financial-tracker-api',
      },
    ],
  },
  {
    id: 'if702-grupo13-mp2',
    title: 'Previsão de Preço do Bitcoin com LSTM',
    description:
      'Implementação de um modelo LSTM (Long Short-Term Memory) para previsão de preços do Bitcoin.',
    categories: ['ai'],
    technologies: ['python', 'pandas', 'numpy'],
    projectType: 'group',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/if702-grupo13-mp2',
      },
    ],
  },
  {
    id: 'wgan-intrusion-detection',
    title: 'Detecção de Intrusão com ML',
    description:
      'Implementação de modelos como WGAN, LSTM, TCN e Self-Attention para detecção de intrusão em redes.',
    categories: ['ai'],
    technologies: ['python', 'pytorch', 'numpy', 'pandas'],
    projectType: 'group',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/WGAN-intrusion-detection',
      },
    ],
  },
  {
    id: 'nlw-ia',
    title: 'NLW IA - Geração de Vídeos',
    description:
      'Projeto da Next Level Week para geração de vídeos com IA, usando a API da OpenAI.',
    categories: ['frontend', 'backend', 'ai'],
    technologies: ['typescript', 'nextjs', 'nodejs'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Front-End',
        url: 'https://github.com/ricardobizerra/nlw-ia-front',
      },
      {
        label: 'Back-End',
        url: 'https://github.com/ricardobizerra/nlw-ia-back',
      },
    ],
  },
  {
    id: 'custom-mlp',
    title: 'Implementação de MLP do Zero',
    description:
      'Implementação personalizada de uma Rede Neural Multicamadas (MLP) em Python com NumPy.',
    categories: ['ai'],
    technologies: ['python', 'numpy'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/custom-mlp',
      },
    ],
  },
  {
    id: 'entrega-facil',
    title: 'Entrega Fácil',
    description:
      'Projeto para gerenciar entregas em locais sem endereço regular e, consequentemente, sem serviços de entrega tradicionais.',
    categories: ['frontend', 'backend'],
    technologies: ['typescript', 'react', 'nodejs', 'postgresql'],
    projectType: 'group',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/entrega-facil-app',
      },
    ],
  },
  {
    id: 'nlw-polls',
    title: 'Enquetes em Tempo Real',
    description:
      'Backend para sistema de enquetes em tempo real usando websockets.',
    categories: ['backend'],
    technologies: ['typescript', 'nodejs', 'prisma', 'redis'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/nlw-polls-server',
      },
    ],
  },
  {
    id: 'kanban-tarefas',
    title: 'Gerenciador de Tarefas Kanban',
    description: 'Quadro Kanban simples para gerenciamento de tarefas.',
    categories: ['frontend', 'backend'],
    technologies: ['typescript', 'react', 'nodejs', 'mongodb'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/kanban-tarefas',
      },
    ],
  },
  {
    id: 'treinamento-nodejs',
    title: 'Treinamento Node.js',
    description:
      'Treinamento sobre funções controladoras em uma aplicação Node.js.',
    categories: ['backend'],
    technologies: ['javascript', 'nodejs', 'express'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/treinamento-nodejs-pta-2023-2',
      },
    ],
  },
  {
    id: 'requisitacin',
    title: 'Requisita CIN',
    description:
      'Sistema para gerenciamento de requisições e demandas em um departamento universitário.',
    categories: ['frontend', 'backend'],
    technologies: ['javascript', 'react', 'nodejs', 'mongodb'],
    projectType: 'individual',
    githubLinks: [
      {
        label: 'Repositório',
        url: 'https://github.com/ricardobizerra/requisitacin',
      },
    ],
  },
];
