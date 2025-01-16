import { useState } from 'react';
import { type Tag } from './tag.types';

type OnChangeCallback = (tags: Tag[]) => void;

export const useTagsPopupState = (
  defaultTags: Tag[],
  onChangeCallBack: OnChangeCallback,
) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags);

  const addTagHandler = (tag: Tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) return;

    const newTags = [...selectedTags, tag];

    setSelectedTags(newTags);
    onChangeCallBack(newTags);
  };

  const removeTagHandler = (tagId: string) => {
    const newTags = selectedTags.filter((tag) => tag.id !== tagId);

    setSelectedTags(newTags);
    onChangeCallBack(newTags);
  };

  return { selectedTags, addTagHandler, removeTagHandler };
};
