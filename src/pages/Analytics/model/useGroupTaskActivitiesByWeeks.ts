import { Dayjs } from 'dayjs';

export interface DailyActivity {
  date: Dayjs;
  tasksCount: number;
}

export const useGroupTaskActivitiesByWeek = (
  tasksActivities: DailyActivity[],
) => {
  const firstDayOfYear = tasksActivities[0].date;
  const daysGapFirstWeek = firstDayOfYear.day() - 1;

  const gapDays = Array.from({ length: daysGapFirstWeek }, (_, i) => {
    return {
      date: firstDayOfYear.add(-(daysGapFirstWeek - i), 'day'),
      tasksCount: -1,
    };
  });

  const tasksActivitiesWithGap = [...gapDays, ...tasksActivities];
  const weeksCount = Math.ceil(tasksActivitiesWithGap.length / 7);

  const weeklyTasksActivities = Array.from({ length: weeksCount }, (_, i) => {
    return {
      weekNumber: i,
      days: tasksActivitiesWithGap.slice(i * 7, (i + 1) * 7),
    };
  });

  return { weeklyTasksActivities };
};
