import { Task } from '../../model/task.types';

export interface TaskResponse {
  task: Task;
}

export interface TasksResponse {
  tasks: Task[];
}

export interface CreateTaskResponse {
  task: Task;
  message: string;
}

export type UpdateTaskResponse = CreateTaskResponse;

export type DeleteTaskResponse = CreateTaskResponse;

export type ToggleCompleteTaskResponse = CreateTaskResponse;
