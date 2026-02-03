'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { data } from '@/data';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

const cardVariants = cva('group', {
  variants: {
    variant: {
      default:
        'max-sm:border-indigo-700/50 sm:hover:border-indigo-700 sm:hover:bg-indigo-700/90',
      red: 'max-sm:border-red-700/50 sm:hover:border-red-700 sm:hover:bg-red-700/90',
      green:
        'max-sm:border-green-700/50 sm:hover:border-green-700 sm:hover:bg-green-700/90',
      blue: 'max-sm:border-blue-700/50 sm:hover:border-blue-700 sm:hover:bg-blue-700/90',
      yellow:
        'max-sm:border-yellow-700/50 sm:hover:border-yellow-700 sm:hover:bg-yellow-700/90',
      orange:
        'max-sm:border-orange-700/50 sm:hover:border-orange-700 sm:hover:bg-orange-700/90',
      purple:
        'max-sm:border-purple-700/50 sm:hover:border-purple-700 sm:hover:bg-purple-700/90',
      pink: 'max-sm:border-pink-700/50 sm:hover:border-pink-700 sm:hover:bg-pink-700/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const institutionVariants = cva('', {
  variants: {
    variant: {
      default: 'max-sm:border-indigo-700 max-sm:bg-indigo-700/90',
      red: 'max-sm:border-red-700 max-sm:bg-red-700/90',
      green: 'max-sm:border-green-700 max-sm:bg-green-700/90',
      blue: 'max-sm:border-blue-700 max-sm:bg-blue-700/90',
      yellow: 'max-sm:border-yellow-700 max-sm:bg-yellow-700/90',
      orange: 'max-sm:border-orange-700 max-sm:bg-orange-700/90',
      purple: 'max-sm:border-purple-700 max-sm:bg-purple-700/90',
      pink: 'max-sm:border-pink-700 max-sm:bg-pink-700/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'sm:bg-indigo-700/90',
      red: 'sm:bg-red-700/90',
      green: 'sm:bg-green-700/90',
      blue: 'sm:bg-blue-700/90',
      yellow: 'sm:bg-yellow-700/90',
      orange: 'sm:bg-orange-700/90',
      purple: 'sm:bg-purple-700/90',
      pink: 'sm:bg-pink-700/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

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
      <CardContent className="flex flex-col items-center gap-x-4 gap-y-0 overflow-hidden p-0 text-center sm:items-start sm:gap-y-2 sm:p-4">
        <div
          className={cn(
            'flex w-full flex-row items-center justify-center max-sm:p-2 sm:justify-between',
            institutionVariants({ variant: color }),
          )}
        >
          <div className="flex flex-row items-center gap-1 sm:gap-2">
            <div
              className={cn(
                'sm:border-primary/20 sm:rounded-lg sm:border sm:p-1',
                iconVariants({ variant: color }),
              )}
            >
              <Icon className="size-6 shrink-0 fill-white [&:not(.lucide)>g]:fill-white [&:not(.lucide)>path]:fill-white" />
            </div>
            <p className="sm:text-foreground text-xs font-semibold text-white group-hover:text-white sm:text-sm">
              {institution}
            </p>
          </div>
          <p className="text-muted-foreground hidden text-[10px] leading-tight group-hover:text-white/90 sm:text-xs lg:block">
            {dateText}
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 max-sm:py-2 sm:gap-0 sm:text-start">
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

  const startDate = parseMonthYear(lastCourse.startDate, { endOfMonth: false });
  const endDate = parseMonthYear(lastCourse.endDate, { endOfMonth: true });

  const isLastCourseFinished = new Date() > endDate;

  const dateText = isLastCourseFinished
    ? `${format(startDate, "MMMM 'de' yyyy", { locale: ptBR })} - ${format(endDate, "MMMM 'de' yyyy", { locale: ptBR })}`
    : `Conclusão em ${format(endDate, "MMMM 'de' yyyy", { locale: ptBR })}`;

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

  const startDate = parseMonthYear(lastRole.startDate, { endOfMonth: false });
  const endDate = lastRole.endDate
    ? parseMonthYear(lastRole.endDate, { endOfMonth: true })
    : new Date();

  const isLastRoleFinished = lastRole.endDate ? new Date() > endDate : false;

  const dateText = isLastRoleFinished
    ? `${format(startDate, "MMMM 'de' yyyy", { locale: ptBR })} - ${format(endDate, "MMMM 'de' yyyy", { locale: ptBR })}`
    : `Desde ${format(startDate, "MMMM 'de' yyyy", { locale: ptBR })}`;

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
