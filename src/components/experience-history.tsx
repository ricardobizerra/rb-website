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

interface EducationGroup {
  institutionKey: keyof typeof data.universities;
  institutionData: (typeof data.universities)[keyof typeof data.universities];
  courses: (typeof data.educationExperience)[number][];
}

export function EducationExperienceHistory() {
  const experiences = data.educationExperience.slice().reverse();
  const groupedExperiences: EducationGroup[] = [];

  experiences.forEach((experience) => {
    const lastGroup = groupedExperiences[groupedExperiences.length - 1];

    if (lastGroup && lastGroup.institutionKey === experience.institution) {
      lastGroup.courses.push(experience);
    } else {
      groupedExperiences.push({
        institutionKey: experience.institution,
        institutionData: data.universities[experience.institution],
        courses: [experience],
      });
    }
  });

  return (
    <div className="flex flex-col gap-4">
      {groupedExperiences.map((group, groupIndex) => {
        const Icon = Icons[group.institutionKey];
        const { institutionData, courses } = group;

        // Calculate institution-level period (earliest start to latest end)
        const institutionStartDate = parseMonthYear(
          courses[courses.length - 1].startDate,
          { endOfMonth: false },
        );
        const lastCourse = courses[0];
        const institutionEndDate = lastCourse.endDate
          ? parseMonthYear(lastCourse.endDate, { endOfMonth: true })
          : new Date();
        const isInstitutionFinished = lastCourse.endDate
          ? new Date() > institutionEndDate
          : false;

        const formattedInstitutionStart = capitalize(
          format(institutionStartDate, "MMMM 'de' yyyy", { locale: ptBR }),
        );
        const formattedInstitutionEnd = capitalize(
          format(institutionEndDate, "MMMM 'de' yyyy", { locale: ptBR }),
        );
        const institutionDateText = isInstitutionFinished
          ? `${formattedInstitutionStart} - ${formattedInstitutionEnd}`
          : `Previsão de conclusão em ${formattedInstitutionEnd.toLowerCase()}`;

        return (
          <Card
            key={`${group.institutionKey}-${groupIndex}`}
            className={cn(
              cardVariants({ variant: institutionData.color }),
              'flex flex-col gap-0 overflow-hidden p-0',
            )}
          >
            {/* Header with Institution Info */}
            <div
              className={cn(
                'border-primary/10 bg-primary/5 flex items-center justify-between border-b px-4 py-3',
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-md p-1.5 shadow-sm transition-colors duration-300',
                    iconVariants({ variant: institutionData.color }),
                  )}
                >
                  <Icon className="size-5 fill-white [&:not(.lucide)>g]:fill-white [&:not(.lucide)>path]:fill-white" />
                </div>
                <h3 className="text-lg font-bold">
                  {institutionData.institution}
                </h3>
              </div>
              <span className="text-muted-foreground text-sm font-medium">
                {institutionDateText}
              </span>
            </div>

            <CardContent className="flex flex-col gap-0 p-0">
              {courses.map((course, courseIndex) => {
                const startDate = parseMonthYear(course.startDate, {
                  endOfMonth: false,
                });

                const endDate = course.endDate
                  ? parseMonthYear(course.endDate, { endOfMonth: true })
                  : new Date();

                const isFinished = course.endDate
                  ? new Date() > endDate
                  : false;

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
                  <div
                    key={`${course.institution}-${course.type}-${course.startDate}`}
                    className={cn(
                      'hover:bg-muted/50 flex flex-col gap-3 p-4 transition-colors',
                      courseIndex !== courses.length - 1 &&
                        'border-border/50 border-b',
                    )}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1">
                        <span
                          className={cn(
                            titleVariants({ variant: institutionData.color }),
                            'flex items-center gap-2',
                          )}
                        >
                          <h4 className="text-base font-bold">
                            {course.title}
                          </h4>
                          <Badge variant="default">{course.type}</Badge>
                        </span>
                      </div>

                      <span className="text-muted-foreground text-xs font-medium sm:text-sm">
                        {dateText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface ExperienceGroup {
  institutionKey: keyof typeof data.companies;
  institutionData: (typeof data.companies)[keyof typeof data.companies];
  roles: (typeof data.workExperience)[number][];
}

export function WorkExperienceHistory() {
  const experiences = data.workExperience.slice().reverse();
  const groupedExperiences: ExperienceGroup[] = [];

  experiences.forEach((experience) => {
    const lastGroup = groupedExperiences[groupedExperiences.length - 1];

    if (lastGroup && lastGroup.institutionKey === experience.institution) {
      lastGroup.roles.push(experience);
    } else {
      groupedExperiences.push({
        institutionKey: experience.institution,
        institutionData: data.companies[experience.institution],
        roles: [experience],
      });
    }
  });

  return (
    <div className="flex flex-col gap-4">
      {groupedExperiences.map((group, groupIndex) => {
        const Icon = Icons[group.institutionKey];
        const { institutionData, roles } = group;

        // Calculate company-level period (earliest start to latest end)
        const companyStartDate = parseMonthYear(
          roles[roles.length - 1].startDate,
          { endOfMonth: false },
        );
        const lastRole = roles[0];
        const companyEndDate = lastRole.endDate
          ? parseMonthYear(lastRole.endDate, { endOfMonth: true })
          : new Date();
        const isCompanyFinished = lastRole.endDate
          ? new Date() > companyEndDate
          : false;

        const formattedCompanyStart = capitalize(
          format(companyStartDate, "MMMM 'de' yyyy", { locale: ptBR }),
        );
        const formattedCompanyEnd = capitalize(
          format(companyEndDate, "MMMM 'de' yyyy", { locale: ptBR }),
        );
        const companyDateText = isCompanyFinished
          ? `${formattedCompanyStart} - ${formattedCompanyEnd}`
          : `Desde ${formattedCompanyStart.toLowerCase()}`;

        return (
          <Card
            key={`${group.institutionKey}-${groupIndex}`}
            className={cn(
              cardVariants({ variant: institutionData.color }),
              'flex flex-col gap-0 overflow-hidden p-0',
            )}
          >
            {/* Header with Institution Info */}
            <div
              className={cn(
                'border-primary/10 bg-primary/5 flex items-center gap-3 border-b px-4 py-3',
              )}
            >
              <div
                className={cn(
                  'rounded-md p-1.5 shadow-sm transition-colors duration-300',
                  iconVariants({ variant: institutionData.color }),
                )}
              >
                <Icon className="size-5 fill-white [&:not(.lucide)>g]:fill-white [&:not(.lucide)>path]:fill-white" />
              </div>
              <div className="flex w-full flex-col items-start gap-x-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold sm:text-lg">
                  {institutionData.institution}
                </h3>
                <span className="text-muted-foreground text-xs font-medium sm:text-sm">
                  {companyDateText}
                </span>
              </div>
            </div>

            <CardContent className="flex flex-col gap-0 p-0">
              {roles.map((work, roleIndex) => {
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
                  <div
                    key={`${work.institution}-${work.type}-${work.startDate}`}
                    className={cn(
                      'hover:bg-muted/50 flex flex-col gap-3 p-4 transition-colors',
                      roleIndex !== roles.length - 1 &&
                        'border-border/50 border-b',
                    )}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            titleVariants({ variant: institutionData.color }),
                          )}
                        >
                          <h4 className="text-base font-bold">{work.title}</h4>
                        </span>
                        <p className="text-muted-foreground text-sm font-medium">
                          {work.type}
                        </p>
                      </div>

                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {dateText}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {work.skills.map((skillId) => {
                        const SkillIcon = Icons[skillId as keyof typeof Icons];

                        return (
                          <Badge
                            key={`${work.institution}-${work.title}-${skillId}`}
                            variant="outline"
                            className="hover:bg-secondary/80 flex w-auto items-center gap-1.5 px-2 py-1 transition-all duration-300"
                          >
                            <SkillIcon width={14} height={14} />

                            <p className="text-foreground text-[10px] font-medium sm:text-xs">
                              {languages[skillId as keyof typeof languages]}
                            </p>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
      <Tabs defaultValue="work" className="space-y-2 sm:space-y-4">
        <TabsList className="mx-auto flex h-auto flex-wrap justify-center">
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
