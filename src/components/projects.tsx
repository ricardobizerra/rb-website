'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { githubProjects, ProjectCategory } from '@/data/projects';
import { languages } from '@/data';
import Image from 'next/image';
import { ExternalLink, User } from 'lucide-react';
import { Icons } from './icons';
import { TechBadge } from './tech-badge';

import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from './section';

type ProjectCategoryTab = 'all' | ProjectCategory;

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    categories: string[];
    technologies: (keyof typeof languages)[];
    imageUrl?: string;
    githubLinks?: { label: string; url: string }[];
    liveUrl?: string;
    projectType: 'individual' | 'group';
  };
};

function ProjectImage({
  title,
  imageUrl,
}: {
  title: ProjectCardProps['project']['title'];
  imageUrl: ProjectCardProps['project']['imageUrl'];
}) {
  if (!imageUrl) return <></>;

  return (
    <div className="relative h-36 w-full">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="rounded-t-lg object-cover"
      />
    </div>
  );
}

function ProjectTypeBadge({
  projectType,
}: {
  projectType: ProjectCardProps['project']['projectType'];
}) {
  return (
    <div className="flex w-full items-center gap-1 rounded-none text-xs font-semibold capitalize">
      {projectType === 'group' ? (
        <div className="flex items-center">
          <User className="h-3.5 w-3.5" />
          <User className="-ml-1.75 h-3.5 w-3.5" />
          <User className="-ml-1.75 h-3.5 w-3.5" />
        </div>
      ) : (
        <User className="h-3.5 w-3.5" />
      )}
      {projectType === 'group' ? 'Em Grupo' : 'Individual'}
    </div>
  );
}

function ProjectTechList({
  technologies,
}: {
  technologies: ProjectCardProps['project']['technologies'];
}) {
  return (
    <div className="flex flex-wrap justify-start gap-1.5">
      {technologies.map((tech) => (
        <TechBadge
          key={tech}
          skillId={tech}
          className="text-muted-foreground hover:scale-105"
        />
      ))}
    </div>
  );
}

function ProjectGithubLinks({
  githubLinks,
}: {
  githubLinks: ProjectCardProps['project']['githubLinks'];
}) {
  if (!githubLinks?.length) return <></>;

  return (
    <div className="flex w-full gap-1">
      {githubLinks?.map((link) => (
        <Button
          key={link.url}
          variant="secondary"
          size="sm"
          asChild
          className="flex-1"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <Icons.github width={20} height={20} />
            {link.label}
          </a>
        </Button>
      ))}
    </div>
  );
}

function ProjectLiveUrl({
  liveUrl,
}: {
  liveUrl: ProjectCardProps['project']['liveUrl'];
}) {
  if (!liveUrl) return <></>;

  return (
    <Button size="sm" asChild className="flex-1">
      <a href={liveUrl} target="_blank" rel="noopener noreferrer">
        Ver projeto
        <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full gap-0 overflow-hidden">
      <ProjectImage title={project.title} imageUrl={project.imageUrl} />

      <CardContent className="flex flex-col gap-4 p-4 pt-4 sm:p-6 sm:pt-6">
        <CardHeader className="p-0">
          <ProjectTypeBadge projectType={project.projectType} />
          <CardTitle className="text-base sm:text-lg">
            {project.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </CardHeader>

        <ProjectTechList technologies={project.technologies} />

        <CardFooter className="flex w-full flex-wrap gap-2 px-0">
          <ProjectGithubLinks githubLinks={project.githubLinks} />
          <ProjectLiveUrl liveUrl={project.liveUrl} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

function ProjectsCarousel({
  projects,
}: {
  projects: ProjectCardProps['project'][];
}) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No projects found in this category.
        </p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem
            key={project.id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <ProjectCard project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = React.useState<ProjectCategoryTab>('all');

  const filteredProjects =
    activeTab === 'all'
      ? githubProjects
      : githubProjects.filter((project) =>
          project.categories.includes(activeTab),
        );

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Projetos</SectionTitle>
        <SectionDescription>
          Uma seleção de meus projetos recentes
        </SectionDescription>
      </SectionHeader>

      <Tabs
        defaultValue="all"
        className="w-full space-y-2"
        onValueChange={(value) => {
          setActiveTab(value as ProjectCategoryTab);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-x-2 gap-y-1 sm:flex-row">
          <span className="text-muted-foreground font-semibold">
            Filtre por
          </span>
          <TabsList className="h-auto flex-wrap justify-center">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="backend">Back-End</TabsTrigger>
            <TabsTrigger value="frontend">Front-End</TabsTrigger>
            <TabsTrigger value="ai">AI/ML</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <ProjectsCarousel projects={filteredProjects} />
        </TabsContent>
      </Tabs>
    </Section>
  );
}
