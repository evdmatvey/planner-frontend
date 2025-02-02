import { requesterWithAuth } from '@/shared/lib/requester';
import { TagAnalytics, TasksAnalytics } from '../model/analytics.types';

class AnalyticsService {
  private readonly _baseUrl = '/analytics';

  public async getTasksAnalytics() {
    const response = await requesterWithAuth.get<TasksAnalytics[]>(
      `${this._baseUrl}/tasks`,
    );

    return response.data;
  }

  public async getTagsAnalytics() {
    const response = await requesterWithAuth.get<TagAnalytics[]>(
      `${this._baseUrl}/tags`,
    );

    return response.data;
  }
}

export const analyticsService = new AnalyticsService();
