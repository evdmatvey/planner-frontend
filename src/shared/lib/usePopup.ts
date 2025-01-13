import { type RefObject, useState } from 'react';
import { useOutsideClick } from './useClickOutside';

export const usePopup = (ref: RefObject<HTMLElement>) => {
  const [isOpen, setOpen] = useState(false);

  const togglePopupHandler = () => setOpen((prev) => !prev);

  useOutsideClick(ref, () => setOpen(false));

  return { isOpen, togglePopupHandler };
};
