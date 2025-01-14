import { Tag } from '@/entities/tag/@x/task';

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  executionTime?: number;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags: Tag[];
}
