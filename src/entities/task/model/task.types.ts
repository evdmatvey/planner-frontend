import { Priority } from '@/entities/priority/model/priority.types';
import { Tag } from '@/entities/tag/@x/task';

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  isCompleted: boolean;
  tags: Tag[];
  updatedAt?: string;
  description?: string;
  priority?: Priority;
  executionTime?: number;
}
