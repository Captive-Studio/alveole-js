import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const DateFormats = {
  DatetimeFull: 'iiii d MMMM yyyy à HH:mm',
  Datetime: 'd MMMM yyyy à HH:mm',
  DatetimeShort: 'd MMMM à HH:mm',
  Date: 'd MMMM yyyy',
  DaySlashShort: 'eeee dd/MM/yy',
  DateSlash: 'dd/MM/yyyy',
  DateString: 'yyyy-MM-dd',
  DateFull: 'iiii d MMMM yyyy',
  DateFullAlt: 'iii d MMM yyyy',
  DateTimeString: "yyyy-MM-dd'T'HH:mm",
  Time: 'HH:mm',
  MonthString: 'yyyy-MM',
  MonthAndYear: 'MMMM yyyy',
} as const;
export type DateFormat = (typeof DateFormats)[keyof typeof DateFormats];

export function displayDate(
  date: string | Date | undefined,
  options?: { fallback?: string; format?: DateFormat; capitalize?: boolean },
): string {
  const defaultFormat = DateFormats.Date;
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!d || !isValid(d)) return options?.fallback ?? '';
  let response = format(d, options?.format ?? defaultFormat, { locale: fr });
  if (options?.capitalize) response = response.charAt(0).toUpperCase() + response.slice(1);
  return response;
}

export function isValidDate(value: unknown): value is string | Date {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    if (!trimmedValue) return false;
    const isoFormat = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?([+-]\d{2}:\d{2}|Z)?)?$/;
    const partialIsoFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    const standardDateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (isoFormat.test(trimmedValue)) return isValid(parseISO(trimmedValue));
    if (partialIsoFormat.test(trimmedValue)) return isValid(new Date(trimmedValue));
    if (standardDateFormat.test(trimmedValue)) return isValid(new Date(trimmedValue));
    return false;
  }
  if (value instanceof Date) return isValid(value);
  return false;
}
