'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { data } from '@/data';
import { Icons } from './icons';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'group border-primary/20 hover:shadow-navy-hover animate-scale-in transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'hover:border-primary/50',
        red: 'hover:border-red-500/50',
        green: 'hover:border-green-500/50',
        blue: 'hover:border-blue-500/50',
        yellow: 'hover:border-yellow-500/50',
        orange: 'hover:border-orange-500/50',
        purple: 'hover:border-purple-500/50',
        pink: 'hover:border-pink-500/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default:
        'from-primary to-primary group-hover:from-primary group-hover:to-primary',
      red: 'from-red-500 to-red-800 group-hover:from-red-700 group-hover:to-red-950',
      green:
        'from-green-500 to-green-800 group-hover:from-green-700 group-hover:to-green-950',
      blue: 'from-blue-500 to-blue-800 group-hover:from-blue-700 group-hover:to-blue-950',
      yellow:
        'from-yellow-500 to-yellow-800 group-hover:from-yellow-700 group-hover:to-yellow-950',
      orange:
        'from-orange-500 to-orange-800 group-hover:from-orange-700 group-hover:to-orange-950',
      purple:
        'from-purple-500 to-purple-800 group-hover:from-purple-700 group-hover:to-purple-950',
      pink: 'from-pink-500 to-pink-800 group-hover:from-pink-700 group-hover:to-pink-950',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const titleVariants = cva('', {
  variants: {
    variant: {
      default: 'group-hover:text-primary',
      red: 'group-hover:text-red-500',
      green: 'group-hover:text-green-500',
      blue: 'group-hover:text-blue-500',
      yellow: 'group-hover:text-yellow-500',
      orange: 'group-hover:text-orange-500',
      purple: 'group-hover:text-purple-500',
      pink: 'group-hover:text-pink-500',
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
  color: VariantProps<
    typeof cardVariants & typeof iconVariants & typeof titleVariants
  >['variant'];
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
  const isMobile = useIsMobile(640);
  const Icon = Icons[id];

  return (
    <Card className={cardVariants({ variant: color })}>
      <CardContent className="flex flex-col items-center gap-x-4 gap-y-2 p-2 text-center sm:flex-row sm:p-4">
        <div className="flex flex-row items-center gap-1 sm:flex-col">
          <div
            className={cn(
              'rounded bg-linear-to-b transition-colors duration-300 sm:rounded-md sm:p-1 md:rounded-lg',
              { [iconVariants({ variant: color })]: !isMobile },
            )}
          >
            <Icon
              width={isMobile ? 24 : 32}
              height={isMobile ? 24 : 32}
              className="shrink-0"
            />
          </div>
          <p className="text-muted-foreground text-xs font-semibold">
            {institution}
          </p>
        </div>

        <div className="from-border to-border h-px w-full bg-linear-to-b sm:h-full sm:w-px" />

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:text-start">
          <p
            className={cn(
              'text-foreground xs:text-base text-sm leading-tight font-bold transition-colors duration-300 sm:text-lg',
              titleVariants({ variant: color }),
            )}
          >
            {title}
          </p>
          <p className="text-muted-foreground/90 text-[11px] font-semibold sm:text-xs">
            {type}
          </p>
          <p className="text-muted-foreground text-[10px] sm:text-xs">
            {dateText}
          </p>
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
