'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { githubProjects, ProjectCategory } from '@/data/projects';
import { languages } from '@/data';
import Image from 'next/image';
import { ExternalLink, User, Users } from 'lucide-react';
import { Icons } from './icons';

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

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="gap-0 overflow-hidden">
      {project.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="rounded-t-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <Badge
        variant={project.projectType === 'group' ? 'default' : 'secondary'}
        className="gap-1.5 capitalize w-full rounded-none"
      >
        {project.projectType === 'group' ? (
          <Users className="h-3.5 w-3.5" />
        ) : (
          <User className="h-3.5 w-3.5" />
        )}
        {project.projectType === 'group' ? 'Em Grupo' : 'Individual'}
      </Badge>
      <CardContent className="flex flex-col gap-4 p-6 pt-4">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </CardHeader>
        <div className="flex flex-wrap justify-center gap-2">
          {project.technologies.map((tech) => {
            const SkillIcon = Icons[tech];
            return (
              <Badge
                key={tech}
                variant="outline"
                className="flex w-[calc(50%-4px)] items-center px-2 py-1 transition-all duration-300 hover:scale-105"
              >
                <SkillIcon width={16} height={16} />
                {languages[tech]}
              </Badge>
            );
          })}
        </div>
        <CardFooter className="mt-auto flex w-full flex-wrap gap-2 px-0">
          {project.githubLinks?.length && (
            <div className="flex w-full flex-nowrap gap-1">
              {project.githubLinks?.map((link) => (
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
          )}
          {project.liveUrl && (
            <Button size="sm" asChild className="flex-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export function ProjectsSection() {
  const [activeTab, setActiveTab] = React.useState<'all' | ProjectCategory>(
    'all',
  );

  const filteredProjects =
    activeTab === 'all'
      ? githubProjects
      : githubProjects.filter((project) =>
          project.categories.includes(activeTab),
        );

  return (
    <section className="w-full space-y-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl leading-none">
            Projetos
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Uma seleção de meus projetos recentes
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => {
          setActiveTab(value as 'all' | ProjectCategory);
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-muted-foreground font-semibold">
            Filtre por
          </span>
          <TabsList className="h-auto flex-wrap justify-center">
            <TabsTrigger value="all">Todos os projetos</TabsTrigger>
            <TabsTrigger value="backend">Back-End</TabsTrigger>
            <TabsTrigger value="frontend">Front-End</TabsTrigger>
            <TabsTrigger value="ai">AI/ML</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
