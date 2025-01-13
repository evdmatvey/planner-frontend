import { type RefObject, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  clickCallback: () => void,
) => {
  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (
        ref.current &&
        !e.composedPath().includes(ref.current as EventTarget)
      ) {
        clickCallback();
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () =>
      document.body.removeEventListener('click', clickOutsideHandler);
  }, []);
};
