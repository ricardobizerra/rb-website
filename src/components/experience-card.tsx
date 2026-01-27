import { Card, CardContent } from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { data } from '@/data';
import { Icons } from './icons';
import { Icon } from 'lucide-react';

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

const iconVariants = cva(
  'flex rounded-xl bg-gradient-to-b p-2 transition-colors duration-300',
  {
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
  },
);

const titleVariants = cva(
  'text-foreground font-semibold transition-colors duration-300',
  {
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

interface BaseExperienceCardProps {
  color: VariantProps<
    typeof cardVariants & typeof iconVariants & typeof titleVariants
  >['variant'];
  id: keyof typeof Icons;
  title: string;
  institution: string;
  type: string;
  dateText: string;
  sectionTitle?: string;
}

function BaseExperienceCard({
  color,
  id,
  title,
  institution,
  type,
  dateText,
  sectionTitle,
}: BaseExperienceCardProps) {
  const Icon = Icons[id];

  return (
    <div className="space-y-2">
      {sectionTitle && (
        <h3 className="text-xl font-semibold">{sectionTitle}</h3>
      )}
      <Card className={cardVariants({ variant: color })}>
        <CardContent className="flex items-center gap-4 px-4 py-2">
          <div className={iconVariants({ variant: color })}>
            <Icon width={32} height={32} className="flex-shrink-0" />
          </div>
          <div>
            <p className={titleVariants({ variant: color })}>{title}</p>
            <p className="text-muted-foreground text-sm font-medium">
              {institution} {' \u2022 '} {type}
            </p>
            <p className="text-muted-foreground/80 text-sm">{dateText}</p>
          </div>
        </CardContent>
      </Card>
    </div>
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
    : `Previsão de conclusão em ${format(endDate, "MMMM 'de' yyyy", { locale: ptBR })}`;

  return (
    <BaseExperienceCard
      color={lastInstitution.color}
      id={lastCourse.institution}
      title={lastCourse.title}
      institution={lastInstitution.institution}
      type={lastCourse.type}
      dateText={dateText}
      sectionTitle="Formação Atual"
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
      sectionTitle="Experiência Atual"
    />
  );
}
