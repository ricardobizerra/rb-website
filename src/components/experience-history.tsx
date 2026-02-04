import { Card, CardContent } from '@/components/ui/card';
import { cva } from 'class-variance-authority';
import { data } from '@/data';
import { Icons } from './icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';
import { TechBadge } from './tech-badge';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from './section';
import { parseMonthYear, formatMonthYear } from '@/lib/experience-utils';
import { svgFillWhite } from '@/lib/svg-utils';
import {
  iconVariants,
  titleVariants,
  ColorVariant,
} from '@/components/experience/variants';
import { ReactNode } from 'react';

/**
 * Card variants specific to experience-history (border highlight on hover)
 */
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

// ============================================================================
// Shared Types and Base Component
// ============================================================================

interface ExperienceItem {
  institution: string;
  title: string;
  type: string;
  startDate: string;
  endDate?: string | null;
}

interface InstitutionData {
  institution: string;
  color: ColorVariant;
}

interface BaseExperienceHistoryGroupProps<T extends ExperienceItem> {
  iconKey: keyof typeof Icons;
  institutionData: InstitutionData;
  items: T[];
  groupDateText: string;
  experienceType: 'education' | 'work';
  renderItemExtra?: (item: T) => ReactNode;
}

function BaseExperienceHistoryGroup<T extends ExperienceItem>({
  iconKey,
  institutionData,
  items,
  groupDateText,
  experienceType,
  renderItemExtra,
}: BaseExperienceHistoryGroupProps<T>) {
  const Icon = Icons[iconKey];

  return (
    <Card
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
          <Icon className={cn('size-5', svgFillWhite)} />
        </div>
        <div className="flex w-full flex-col items-start gap-x-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-bold sm:text-lg">
            {institutionData.institution}
          </h3>
          <span className="text-muted-foreground text-xs font-medium sm:text-sm">
            {groupDateText}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-col gap-0 p-0">
        {items.map((item, itemIndex) => {
          const startDate = parseMonthYear(item.startDate, {
            endOfMonth: false,
          });

          const endDate = item.endDate
            ? parseMonthYear(item.endDate, { endOfMonth: true })
            : new Date();

          const isFinished = item.endDate ? new Date() > endDate : false;

          const formattedStartDate = formatMonthYear(startDate);
          const formattedEndDate = formatMonthYear(endDate);

          const dateText =
            experienceType === 'education'
              ? isFinished
                ? `${formattedStartDate} - ${formattedEndDate}`
                : `Conclusão em ${formattedEndDate.toLowerCase()}`
              : isFinished
                ? `${formattedStartDate} - ${formattedEndDate}`
                : `Desde ${formattedStartDate.toLowerCase()}`;

          return (
            <div
              key={`${item.institution}-${item.type}-${item.startDate}`}
              className={cn(
                'hover:bg-muted/50 flex flex-col gap-3 p-4 transition-colors',
                itemIndex !== items.length - 1 && 'border-border/50 border-b',
              )}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col">
                  <span
                    className={cn(
                      titleVariants({ variant: institutionData.color }),
                    )}
                  >
                    <h4 className="text-base font-bold">{item.title}</h4>
                  </span>
                  <p className="text-muted-foreground text-sm font-medium">
                    {item.type}
                  </p>
                </div>

                {items.length > 1 && (
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    {dateText}
                  </span>
                )}
              </div>

              {renderItemExtra?.(item)}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Education Experience History
// ============================================================================

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
        const { courses } = group;

        // Calculate institution-level period
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

        const formattedStart = formatMonthYear(institutionStartDate);
        const formattedEnd = formatMonthYear(institutionEndDate);
        const groupDateText = isInstitutionFinished
          ? `${formattedStart} - ${formattedEnd}`
          : `Conclusão em ${formattedEnd.toLowerCase()}`;

        return (
          <BaseExperienceHistoryGroup
            key={`${group.institutionKey}-${groupIndex}`}
            iconKey={group.institutionKey}
            institutionData={group.institutionData}
            items={courses}
            groupDateText={groupDateText}
            experienceType="education"
          />
        );
      })}
    </div>
  );
}

// ============================================================================
// Work Experience History
// ============================================================================

type WorkExperience = (typeof data.workExperience)[number];

interface WorkGroup {
  institutionKey: keyof typeof data.companies;
  institutionData: (typeof data.companies)[keyof typeof data.companies];
  roles: WorkExperience[];
}

export function WorkExperienceHistory() {
  const experiences = data.workExperience.slice().reverse();
  const groupedExperiences: WorkGroup[] = [];

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
        const { roles } = group;

        // Calculate company-level period
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

        const formattedStart = formatMonthYear(companyStartDate);
        const formattedEnd = formatMonthYear(companyEndDate);
        const groupDateText = isCompanyFinished
          ? `${formattedStart} - ${formattedEnd}`
          : `Desde ${formattedStart.toLowerCase()}`;

        return (
          <BaseExperienceHistoryGroup<WorkExperience>
            key={`${group.institutionKey}-${groupIndex}`}
            iconKey={group.institutionKey}
            institutionData={group.institutionData}
            items={roles}
            groupDateText={groupDateText}
            experienceType="work"
            renderItemExtra={(work) => (
              <div className="flex flex-wrap items-center gap-2">
                {work.skills.map((skillId) => (
                  <TechBadge
                    key={`${work.institution}-${work.title}-${skillId}`}
                    skillId={skillId}
                  />
                ))}
              </div>
            )}
          />
        );
      })}
    </div>
  );
}

// ============================================================================
// Main Experience History Component
// ============================================================================

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
