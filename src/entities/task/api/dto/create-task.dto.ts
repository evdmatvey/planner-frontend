import { Priority } from '@/entities/priority/model/priority.types';
import { Tag } from '@/entities/tag/@x/task';

export interface CreateTaskDto {
  title: string;
  description?: string;
  createdAt?: string;
  executionTime?: number;
  priority?: Priority;
  tags?: Tag[];
}
