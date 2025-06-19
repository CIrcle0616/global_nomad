import { parse } from 'date-fns';
import { ko } from 'date-fns/locale';

export function parseKoreanDateString(koreanDate: string): Date | null {
  try {
    const parsedDate = parse(koreanDate, 'yyyy. M. d. a h:mm:ss', new Date(), { locale: ko });

    if (isNaN(parsedDate.getTime())) return null;
    return parsedDate;
  } catch {
    return null;
  }
}
