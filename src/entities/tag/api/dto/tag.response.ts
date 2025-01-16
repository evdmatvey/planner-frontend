import { Tag } from '../../model/tag.types';

export interface TagResponse {
  tag: Tag;
}

export interface TagsResponse {
  tags: Tag[];
}

export interface CreateTagResponse {
  tag: Tag;
  message: string;
}

export type UpdateTagResponse = CreateTagResponse;

export type DeleteTagResponse = CreateTagResponse;
