import { Tag } from '@/entities/tag/@x/task';

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  isCompleted: boolean;
  tags: Tag[];
  updatedAt?: string;
  description?: string;
  priority?: TaskPriority;
  executionTime?: number;
}
