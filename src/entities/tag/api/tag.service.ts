import { requesterWithAuth } from '@/shared/lib/requester';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  CreateTagResponse,
  DeleteTagResponse,
  TagResponse,
  TagsResponse,
  UpdateTagResponse,
} from './dto/tag.response';
import { UpdateTagDto } from './dto/update-tag.dto';

class TagService {
  private readonly _baseUrl = '/tags';

  public async getAll() {
    const response = await requesterWithAuth.get<TagsResponse>(this._baseUrl);

    return response.data.tags;
  }

  public async getOne(id: string) {
    const response = await requesterWithAuth.get<TagResponse>(
      `${this._baseUrl}/${id}`,
    );

    return response.data.tag;
  }

  public async create(dto: CreateTagDto) {
    const response = await requesterWithAuth.post<CreateTagResponse>(
      this._baseUrl,
      dto,
    );

    return response.data;
  }

  public async update(id: string, dto: UpdateTagDto) {
    const response = await requesterWithAuth.put<UpdateTagResponse>(
      `${this._baseUrl}/${id}`,
      dto,
    );

    return response.data;
  }

  public async delete(id: string) {
    const response = await requesterWithAuth.delete<DeleteTagResponse>(
      `${this._baseUrl}/${id}`,
    );

    return response.data;
  }
}

export const tagService = new TagService();
