import { useState } from 'react';
import { type Priority } from './priority.types';

type PriorityState = Priority | undefined;
type SelectCallback = (priority: PriorityState) => void;

export const useSelectPriority = (
  defaultPriority: PriorityState,
  selectCallback: SelectCallback,
) => {
  const [selectedPriority, setSelectedPriority] =
    useState<PriorityState>(defaultPriority);

  const selectPriorityHandler = (priority: Priority) => {
    const newSelectedPriority =
      priority === selectedPriority ? undefined : priority;

    setSelectedPriority(newSelectedPriority);
    selectCallback(newSelectedPriority);
  };

  return { selectedPriority, selectPriorityHandler };
};
