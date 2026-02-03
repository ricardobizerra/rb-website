import { Card, CardContent } from '@/components/ui/card';
import { cva } from 'class-variance-authority';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { data, languages } from '@/data';
import { Icons } from './icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { capitalize, cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from './section';

const cardVariants = cva(
  'group border-primary/20 hover:shadow-navy-hover animate-scale-in transition-all duration-300 w-full p-2 flex flex-col gap-4',
  {
    variants: {
      variant: {
        default: 'hover:border-primary/50',
        red: 'hover:dark:border-red-500/50 hover:border-red-700/50',
        green: 'hover:dark:border-green-500/50 hover:border-green-700/50',
        blue: 'hover:dark:border-blue-500/50 hover:border-blue-700/50',
        yellow: 'hover:dark:border-yellow-500/50 hover:border-yellow-700/50',
        orange: 'hover:dark:border-orange-500/50 hover:border-orange-700/50',
        purple: 'hover:dark:border-purple-500/50 hover:border-purple-700/50',
        pink: 'hover:dark:border-pink-500/50 hover:border-pink-700/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const iconVariants = cva(
  'flex rounded bg-gradient-to-b p-1 transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'bg-indigo-700/90',
        red: 'bg-red-700/90',
        green: 'bg-green-700/90',
        blue: 'bg-blue-700/90',
        yellow: 'bg-yellow-700/90',
        orange: 'bg-orange-700/90',
        purple: 'bg-purple-700/90',
        pink: 'bg-pink-700/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const titleVariants = cva(
  'text-foreground font-semibold transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'group-hover:text-primary',
        red: 'group-hover:dark:text-red-500 group-hover:text-red-700',
        green: 'group-hover:dark:text-green-500 group-hover:text-green-700',
        blue: 'group-hover:dark:text-blue-500 group-hover:text-blue-700',
        yellow: 'group-hover:dark:text-yellow-500 group-hover:text-yellow-700',
        orange: 'group-hover:dark:text-orange-500 group-hover:text-orange-700',
        purple: 'group-hover:dark:text-purple-500 group-hover:text-purple-700',
        pink: 'group-hover:dark:text-pink-500 group-hover:text-pink-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const badgeVariants = cva(
  'transition-colors duration-300 font-medium group-hover:text-white',
  {
    variants: {
      variant: {
        red: 'group-hover:border-red-700 group-hover:bg-red-700',
        green: 'group-hover:border-green-700 group-hover:bg-green-700',
        blue: 'group-hover:border-blue-700 group-hover:bg-blue-700',
        yellow: 'group-hover:border-yellow-700 group-hover:bg-yellow-700',
        orange: 'group-hover:border-orange-700 group-hover:bg-orange-700',
        purple: 'group-hover:border-purple-700 group-hover:bg-purple-700',
        pink: 'group-hover:border-pink-700 group-hover:bg-pink-700',
      },
    },
  },
);

function parseMonthYear(
  dateStr: string,
  options: { endOfMonth: boolean },
): Date {
  const [monthStr, yearStr] = dateStr.split('/');
  const month = parseInt(monthStr, 10) - 1;
  const year = parseInt(yearStr, 10);

  if (options.endOfMonth) {
    return new Date(year, month + 1, 0, 0, 0, 0, 0);
  }

  return new Date(year, month, 1, 0, 0, 0, 0);
}

export function EducationExperienceHistory() {
  return (
    <div className="flex flex-col gap-2">
      {data.educationExperience
        .slice()
        .reverse()
        .map((course) => {
          const Icon = Icons[course.institution];

          const institution = data.universities[course.institution];

          const startDate = parseMonthYear(course.startDate, {
            endOfMonth: false,
          });

          const endDate = course.endDate
            ? parseMonthYear(course.endDate, {
                endOfMonth: true,
              })
            : new Date();

          const isFinished = course.endDate ? new Date() > endDate : false;

          const formattedStartDate = capitalize(
            format(startDate, "MMMM 'de' yyyy", {
              locale: ptBR,
            }),
          );

          const formattedEndDate = capitalize(
            format(endDate, "MMMM 'de' yyyy", { locale: ptBR }),
          );

          const dateText = isFinished
            ? `${formattedStartDate} - ${formattedEndDate}`
            : `Previsão de conclusão em ${formattedEndDate.toLowerCase()}`;

          return (
            <Card
              key={`${course.institution}-${course.type}-${course.startDate}`}
              className={cardVariants({ variant: institution.color })}
            >
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span
                    className={cn(
                      titleVariants({ variant: institution.color }),
                      'flex items-center gap-2',
                    )}
                  >
                    <h3 className="font-bold">{course.title}</h3>
                    <Badge
                      variant="default"
                      className={badgeVariants({ variant: institution.color })}
                    >
                      {course.type}
                    </Badge>
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    {dateText}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    className={cn(
                      'size-6 shrink-0 fill-white [&:not(.lucide)>g]:fill-white [&:not(.lucide)>path]:fill-white',
                      iconVariants({ variant: institution.color }),
                    )}
                  />
                  <p className="text-sm font-medium">
                    {institution.institution}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}

export function WorkExperienceHistory() {
  return (
    <div className="flex flex-col gap-2">
      {data.workExperience
        .slice()
        .reverse()
        .map((work) => {
          const Icon = Icons[work.institution];

          const institution = data.companies[work.institution];

          const startDate = parseMonthYear(work.startDate, {
            endOfMonth: false,
          });

          const endDate = work.endDate
            ? parseMonthYear(work.endDate, { endOfMonth: true })
            : new Date();

          const isFinished = work.endDate ? new Date() > endDate : false;

          const formattedStartDate = capitalize(
            format(startDate, "MMMM 'de' yyyy", {
              locale: ptBR,
            }),
          );

          const formattedEndDate = capitalize(
            format(endDate, "MMMM 'de' yyyy", { locale: ptBR }),
          );

          const dateText = isFinished
            ? `${formattedStartDate} - ${formattedEndDate}`
            : `Desde ${formattedStartDate.toLowerCase()}`;

          return (
            <Card
              key={`${work.institution}-${work.type}-${work.startDate}`}
              className={cardVariants({ variant: institution.color })}
            >
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span
                    className={cn(
                      titleVariants({ variant: institution.color }),
                      'flex items-center gap-2',
                    )}
                  >
                    <h3 className="font-bold">{work.title}</h3>
                    <Badge
                      variant="default"
                      className={badgeVariants({ variant: institution.color })}
                    >
                      {work.type}
                    </Badge>
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    {dateText}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    className={cn(
                      'size-6 shrink-0 fill-white [&:not(.lucide)>g]:fill-white [&:not(.lucide)>path]:fill-white',
                      iconVariants({ variant: institution.color }),
                    )}
                  />
                  <p className="text-sm font-medium">
                    {institution.institution}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {work.skills.map((skillId) => {
                    const SkillIcon = Icons[skillId as keyof typeof Icons];

                    return (
                      <Badge
                        key={`${work.institution}-${work.title}-${skillId}`}
                        variant="outline"
                        className="flex w-auto items-center px-2 py-1 transition-all duration-300 hover:scale-105"
                      >
                        <SkillIcon width={16} height={16} />

                        <p className="text-foreground text-xs font-medium">
                          {languages[skillId as keyof typeof languages]}
                        </p>
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}

export function ExperienceHistory() {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Experiência</SectionTitle>
        <SectionDescription>
          Minha jornada profissional e acadêmica
        </SectionDescription>
      </SectionHeader>
      <Tabs defaultValue="work" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="work">Profissional</TabsTrigger>
          <TabsTrigger value="education">Acadêmica</TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <WorkExperienceHistory />
        </TabsContent>
        <TabsContent value="education">
          <EducationExperienceHistory />
        </TabsContent>
      </Tabs>
    </Section>
  );
}
