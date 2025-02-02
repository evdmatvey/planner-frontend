import { useQuery } from '@tanstack/react-query';
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { analyticsQueries } from '@/entities/analytics';
import { reduceTasksInfoByGroup } from '../../lib/reduce-tasks-info-by-group';
import { chartColors } from '../../model/chart-colors.data';
import styles from './TagsChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'pie'> = {
  plugins: {
    legend: {
      position: 'bottom',
      align: 'center',
    },
    tooltip: {
      enabled: true,
    },
  },
};

export const TagsPieChart = () => {
  const { data: tagAnalytics } = useQuery(analyticsQueries.tag());

  const data: ChartData<'pie'> = {
    labels: tagAnalytics?.map((tag) => tag.title),
    datasets: [
      {
        label: 'Кол-во задач',
        data:
          tagAnalytics?.map(
            (tag) => reduceTasksInfoByGroup(tag.tasks, 'all').count,
          ) || [],
        backgroundColor: tagAnalytics?.map(
          (tag) => chartColors[tag.color].backgroundColor,
        ),
        borderColor: tagAnalytics?.map(
          (tag) => chartColors[tag.color].borderColor,
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.root}>
      <Pie data={data} options={options} />
    </div>
  );
};
