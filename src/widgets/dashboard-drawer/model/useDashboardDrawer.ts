import { useState } from 'react';
import { useGetProfile } from '@/entities/user';

export const useDashboardDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: profile } = useGetProfile();

  const openDrawerHandler = () => setIsOpen(true);
  const closeDrawerHandler = () => setIsOpen(false);

  return { isOpen, profile, openDrawerHandler, closeDrawerHandler };
};
