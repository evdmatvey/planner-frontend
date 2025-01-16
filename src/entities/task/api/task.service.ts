import { requesterWithAuth } from '@/shared/lib/requester';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  TaskResponse,
  TasksResponse,
  ToggleCompleteTaskResponse,
  UpdateTaskResponse,
} from './dto/task.response';
import { UpdateTaskDto } from './dto/update-task.dto';

class TaskService {
  private readonly _baseUrl = '/tasks';

  public async getAll() {
    const response = await requesterWithAuth.get<TasksResponse>(this._baseUrl);

    return response.data.tasks;
  }

  public async getOne(id: string) {
    const response = await requesterWithAuth.get<TaskResponse>(
      `${this._baseUrl}/${id}`,
    );

    return response.data.task;
  }

  public async create(dto: CreateTaskDto) {
    const response = await requesterWithAuth.post<CreateTaskResponse>(
      this._baseUrl,
      dto,
    );

    return response.data;
  }

  public async update(id: string, dto: UpdateTaskDto) {
    const response = await requesterWithAuth.put<UpdateTaskResponse>(
      `${this._baseUrl}/${id}`,
      dto,
    );

    return response.data;
  }

  public async toggleComplete(id: string) {
    const response = await requesterWithAuth.patch<ToggleCompleteTaskResponse>(
      `${this._baseUrl}/${id}`,
    );

    return response.data;
  }

  public async delete(id: string) {
    const response = await requesterWithAuth.delete<DeleteTaskResponse>(
      `${this._baseUrl}/${id}`,
    );

    return response.data;
  }
}

export const taskService = new TaskService();
