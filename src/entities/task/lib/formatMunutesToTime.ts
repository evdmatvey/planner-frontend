export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourForms = ['час', 'часа', 'часов'];
  const minuteForms = ['минута', 'минуты', 'минут'];

  const getHourForm = (h: number): string => {
    if (h % 10 === 1 && h % 100 !== 11) return hourForms[0];
    if (h % 10 >= 2 && h % 10 <= 4 && (h % 100 < 12 || h % 100 > 14))
      return hourForms[1];
    return hourForms[2];
  };

  const getMinuteForm = (m: number): string => {
    if (m % 10 === 1 && m % 100 !== 11) return minuteForms[0];
    if (m % 10 >= 2 && m % 10 <= 4 && (m % 100 < 12 || m % 100 > 14))
      return minuteForms[1];
    return minuteForms[2];
  };

  const hourPart = hours > 0 ? `${hours} ${getHourForm(hours)}` : '';
  const minutePart =
    remainingMinutes > 0
      ? `${remainingMinutes} ${getMinuteForm(remainingMinutes)}`
      : '';

  if (hourPart && minutePart) {
    return `${hourPart} ${minutePart}`;
  } else if (hourPart) {
    return hourPart;
  } else {
    return minutePart;
  }
};
