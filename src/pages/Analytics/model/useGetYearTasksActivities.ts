import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { analyticsQueries } from '@/entities/analytics';
import { getDatesArray } from '@/shared/lib/get-dates-array';

export const useGetYearTasksActivities = () => {
  const { data: tasksAnalytics } = useQuery(analyticsQueries.task());

  const tasksActivities = useMemo(() => {
    const startDate = dayjs().startOf('year');
    const endDate = startDate.endOf('year');

    const analyticsMap = new Map(
      tasksAnalytics?.map((item) => [
        dayjs(item.date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        item.tasks.all.count,
      ]) || [],
    );

    return getDatesArray(startDate, endDate).map((date) => ({
      date,
      tasksCount: analyticsMap.get(date.format('YYYY-MM-DD')) || 0,
    }));
  }, [tasksAnalytics]);

  return { tasksActivities };
};
