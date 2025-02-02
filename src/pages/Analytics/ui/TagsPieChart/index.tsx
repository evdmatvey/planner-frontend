import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { type TagAnalytics } from '@/entities/analytics';
import { pieChartOptions } from '@/shared/config/charts/pie-chart.config';
import { reduceTasksInfoByGroup } from '../../lib/reduce-tasks-info-by-group';
import { chartColors } from '../../model/chart-colors.data';
import styles from './TagsPieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TagsPieChartProps {
  tagsAnalytics: TagAnalytics[];
}

export const TagsPieChart = ({ tagsAnalytics }: TagsPieChartProps) => {
  const data: ChartData<'pie'> = {
    labels: tagsAnalytics?.map((tag) => tag.title),
    datasets: [
      {
        label: 'Кол-во задач',
        data:
          tagsAnalytics?.map(
            (tag) => reduceTasksInfoByGroup(tag.tasks, 'all').count,
          ) || [],
        backgroundColor: tagsAnalytics?.map(
          (tag) => chartColors[tag.color].backgroundColor,
        ),
        borderColor: tagsAnalytics?.map(
          (tag) => chartColors[tag.color].borderColor,
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.root}>
      <Pie data={data} options={pieChartOptions} />
    </div>
  );
};
