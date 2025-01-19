import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedPopupProps {
  isOpen: boolean;
  className: string;
  children: ReactNode;
}

export const AnimatedPopup = ({
  children,
  className,
  isOpen,
}: AnimatedPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={className}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};
