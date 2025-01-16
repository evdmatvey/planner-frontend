import { Tag } from '@/entities/tag/@x/task';
import { TaskPriority } from '../../model/task.types';

export interface CreateTaskDto {
  title: string;
  description?: string;
  createdAt?: string;
  executionTime?: number;
  priority?: TaskPriority;
  tags?: Tag[];
}
