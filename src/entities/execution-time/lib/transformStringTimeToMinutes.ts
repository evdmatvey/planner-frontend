export const transformStringTimeToMinutes = (timeString: string): number => {
  const hours = timeString.match(/(\d+)\s*час(?:а|ов)?/);
  const minutes = timeString.match(/(\d+)\s*мин(?:ута|ут)?/);

  return (
    (hours ? parseInt(hours[1], 10) * 60 : 0) +
    (minutes ? parseInt(minutes[1], 10) : 0)
  );
};
