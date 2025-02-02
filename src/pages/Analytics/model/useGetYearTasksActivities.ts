import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { analyticsQueries } from '@/entities/analytics';
import { getDatesArray } from '@/shared/lib/get-dates-array';
import { getDateFromString } from '@/shared/lib/getDateFromString';

export const useGetYearTasksActivities = () => {
  const { data: tasksAnalytics } = useQuery(analyticsQueries.task());

  const tasksActivities = useMemo(() => {
    const startDate = dayjs().startOf('year');
    const endDate = startDate.endOf('year');

    const analyticsMap = new Map(
      tasksAnalytics?.map((item) => [
        dayjs(getDateFromString(item.date)).format('YYYY-MM-DD'),
        item.tasks.completed.count,
      ]) || [],
    );

    return getDatesArray(startDate, endDate).map((date) => ({
      date,
      tasksCount: analyticsMap.get(date.format('YYYY-MM-DD')) || 0,
    }));
  }, [tasksAnalytics]);

  return { tasksActivities };
};
