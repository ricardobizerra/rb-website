'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import { data } from '@/data';
import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { getExperienceDateText } from '@/lib/experience-utils';
import { svgFillWhite } from '@/lib/svg-utils';
import { iconVariants } from '@/components/experience/variants';

/**
 * Card variants specific to experience-card (compact summary card with hover fill)
 */
const cardVariants = cva('group', {
  variants: {
    variant: {
      default: 'hover:border-indigo-700 hover:bg-indigo-700/90',
      red: 'hover:border-red-700 hover:bg-red-700/90',
      green: 'hover:border-green-700 hover:bg-green-700/90',
      blue: 'hover:border-blue-700 hover:bg-blue-700/90',
      yellow: 'hover:border-yellow-700 hover:bg-yellow-700/90',
      orange: 'hover:border-orange-700 hover:bg-orange-700/90',
      purple: 'hover:border-purple-700 hover:bg-purple-700/90',
      pink: 'hover:border-pink-700 hover:bg-pink-700/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface BaseExperienceCardProps {
  color: VariantProps<typeof cardVariants>['variant'];
  id: keyof typeof Icons;
  title: string;
  institution: string;
  type: string;
  dateText: string;
}

function BaseExperienceCard({
  color,
  id,
  title,
  institution,
  type,
  dateText,
}: BaseExperienceCardProps) {
  const Icon = Icons[id];

  return (
    <Card
      className={cn(
        'border-primary/20 hover:shadow-navy-hover animate-scale-in overflow-hidden transition-all duration-300',
        cardVariants({ variant: color }),
      )}
    >
      <CardContent className="flex flex-col items-center gap-x-4 gap-y-2 overflow-hidden p-2 text-center sm:items-start sm:p-4">
        <div className="flex w-full flex-row items-center justify-center sm:justify-between">
          <div className="flex flex-row items-center gap-1 sm:gap-2">
            <div
              className={cn(
                'sm:border-primary/20 sm:rounded-lg sm:border sm:p-1',
                iconVariants({ variant: color }),
              )}
            >
              <Icon className={cn('size-5 shrink-0 sm:size-6', svgFillWhite)} />
            </div>
            <p className="text-xs font-semibold group-hover:text-white sm:text-sm">
              {institution}
            </p>
          </div>
          <p className="text-muted-foreground hidden text-[10px] leading-tight group-hover:text-white/90 sm:text-xs lg:block">
            {dateText}
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-0 sm:text-start">
          <p className="text-foreground xs:text-base text-sm leading-tight font-bold group-hover:text-white sm:text-lg">
            {title}
          </p>

          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs font-semibold group-hover:text-white/90">
              {type}
            </p>
            <p className="text-muted-foreground text-[10px] leading-tight group-hover:text-white/90 sm:text-xs lg:hidden">
              {dateText}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EducationExperienceCard() {
  const lastCourse =
    data.educationExperience[data.educationExperience.length - 1];

  const lastInstitution = data.universities[lastCourse.institution];

  const dateText = getExperienceDateText({
    startDate: lastCourse.startDate,
    endDate: lastCourse.endDate,
    type: 'education',
  });

  return (
    <BaseExperienceCard
      color={lastInstitution.color}
      id={lastCourse.institution}
      title={lastCourse.title}
      institution={lastInstitution.institution}
      type={lastCourse.type}
      dateText={dateText}
    />
  );
}

export function WorkExperienceCard() {
  const lastRole = data.workExperience[data.workExperience.length - 1];

  const lastInstitution = data.companies[lastRole.institution];

  const dateText = getExperienceDateText({
    startDate: lastRole.startDate,
    endDate: lastRole.endDate,
    type: 'work',
  });

  return (
    <BaseExperienceCard
      color={lastInstitution.color}
      id={lastRole.institution}
      title={lastRole.title}
      institution={lastInstitution.institution}
      type={lastRole.type}
      dateText={dateText}
    />
  );
}
