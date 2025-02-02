import { ChartOptions } from 'chart.js';

export const pieChartOptions: ChartOptions<'pie'> = {
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
