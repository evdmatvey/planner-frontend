import { Color } from '@/shared/model/color.types';

export interface TasksInfo {
  count: number;
  executionTime: number;
}

export interface TasksInfoByGroups {
  all: TasksInfo;
  completed: TasksInfo;
  todo: TasksInfo;
}

export interface TasksAnalytics {
  date: string;
  tasks: TasksInfoByGroups;
}

export interface TagAnalytics {
  id: string;
  title: string;
  color: keyof typeof Color;
  tasks: TasksAnalytics[];
}
