import clsx from 'clsx';
import { useState } from 'react';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
import { getTasksCompletedCountText } from '../../lib/get-tasks-completed-count-text';
import { useGetYearTasksActivities } from '../../model/useGetYearTasksActivities';
import {
  type DailyActivity,
  useGroupTaskActivitiesByWeek,
} from '../../model/useGroupTaskActivitiesByWeeks';
import styles from './ActivityCalendar.module.css';

interface TooltipState {
  x: number;
  y: number;
  date: string;
  tasksCount: number;
}

export const ActivityCalendar = () => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const { isCollapsed } = useDashboardSidebarStore();
  const calendarClasses = clsx(styles.calendar, {
    [styles.expended]: isCollapsed,
  });

  const { tasksActivities } = useGetYearTasksActivities();
  const { weeklyTasksActivities } =
    useGroupTaskActivitiesByWeek(tasksActivities);

  const colors = ['#372f47', '#46336b', '#422c6f', '#523b81', '#7f55d6'];

  const handleMouseEnter = (
    day: DailyActivity,
    event: React.MouseEvent<SVGRectElement>,
  ) => {
    setTooltip({
      x: event.clientX,
      y: event.clientY,
      date: day.date.format('DD.MM.YYYY'),
      tasksCount: day.tasksCount,
    });
  };

  return (
    <div className={calendarClasses}>
      <svg>
        {weeklyTasksActivities.map((week, i) => (
          <g transform={`translate(${i * 20}, 0)`} key={week.weekNumber}>
            {week.days.map(
              (day, i) =>
                day.tasksCount !== -1 && (
                  <rect
                    key={day.date.toString()}
                    width={14}
                    height={14}
                    x={0}
                    y={i * 20}
                    rx={3}
                    ry={3}
                    fill={colors[Math.min(day.tasksCount, 4)]}
                    data-date={day.date.toISOString()}
                    data-tasks={day.tasksCount}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={() => setTooltip(null)}
                  ></rect>
                ),
            )}
          </g>
        ))}
      </svg>
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: tooltip.x + 10,
            top: tooltip.y + 10,
          }}
        >
          <div className={styles.date}>{tooltip.date}</div>
          <div className={styles.tasks}>
            {getTasksCompletedCountText(tooltip.tasksCount)}
          </div>
        </div>
      )}
    </div>
  );
};
