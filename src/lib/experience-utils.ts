import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { capitalize } from '@/lib/utils';

/**
 * Parse a month/year string (e.g., "01/2023") into a Date object.
 */
export function parseMonthYear(
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

/**
 * Format a date to Portuguese month/year format (e.g., "Janeiro de 2023")
 */
export function formatMonthYear(date: Date): string {
  return capitalize(format(date, "MMMM 'de' yyyy", { locale: ptBR }));
}

export type ExperienceDateType = 'work' | 'education';

interface GetDateTextOptions {
  startDate: string;
  endDate: string | null;
  type: ExperienceDateType;
}

/**
 * Get formatted date text for an experience entry
 */
export function getExperienceDateText({
  startDate,
  endDate,
  type,
}: GetDateTextOptions): string {
  const start = parseMonthYear(startDate, { endOfMonth: false });
  const end = endDate
    ? parseMonthYear(endDate, { endOfMonth: true })
    : new Date();

  const isFinished = endDate ? new Date() > end : false;

  const formattedStart = formatMonthYear(start);
  const formattedEnd = formatMonthYear(end);

  if (isFinished) {
    return `${formattedStart} - ${formattedEnd}`;
  }

  if (type === 'education') {
    return `Conclusão em ${formattedEnd.toLowerCase()}`;
  }

  return `Desde ${formattedStart.toLowerCase()}`;
}
