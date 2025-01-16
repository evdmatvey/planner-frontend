import { useState } from 'react';
import { type TaskPriority } from './task.types';

type PriorityState = TaskPriority | undefined;
type SelectCallback = (priority: PriorityState) => void;

export const useSelectTaskPriorityState = (
  defaultPriority: PriorityState,
  selectCallback: SelectCallback,
) => {
  const [selectedPriority, setSelectedPriority] =
    useState<PriorityState>(defaultPriority);

  const selectPriorityHandler = (priority: TaskPriority) => {
    const newSelectedPriority =
      priority === selectedPriority ? undefined : priority;

    setSelectedPriority(newSelectedPriority);
    selectCallback(newSelectedPriority);
  };

  return { selectedPriority, selectPriorityHandler };
};
