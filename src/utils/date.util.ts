import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
export const DISPLAY_DATE_FORMAT = 'MMM D, YYYY';
export const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';

export const formatDate = (date: string | Date): string => {
   return dayjs(date).format(DATE_FORMAT);
};

export const formatDateTime = (date: string | Date): string => {
   return dayjs(date).format(DATE_TIME_FORMAT);
};

export const parseDate = (dateStr: string): dayjs.Dayjs => {
   return dayjs(dateStr);
};

export const compareDates = (dateA: string, dateB: string): number => {
   return dayjs(dateA).valueOf() - dayjs(dateB).valueOf();
};

export const isValidDate = (dateStr: string): boolean => {
   return dayjs(dateStr).isValid();
};

export const formatDisplayDate = (date: string): string => {
   return dayjs(date).format(DISPLAY_DATE_FORMAT);
};

export const formatFilterDate = (date: dayjs.Dayjs): string => {
   return date.format(API_DATE_FORMAT);
};

export const isDateInRange = (date: string, from?: string, to?: string): boolean => {
   const dateObj = dayjs(date);
   if (from && dateObj.isBefore(dayjs(from))) return false;
   if (to && dateObj.isAfter(dayjs(to))) return false;
   return true;
};
