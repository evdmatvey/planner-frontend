import { LogoutUser } from '@/features/logout-user';
import { UserProfileSummary } from '@/entities/user';
import { Drawer } from '@/shared/ui/Drawer';
import { useDashboardDrawer } from '../../model/useDashboardDrawer';
import { NavigationMenu } from '../NavigationMenu';
import { OpenDrawerButton } from '../OpenDrawerButton';
import styles from './DashboardDrawer.module.css';

export const DashboardDrawer = () => {
  const { isOpen, profile, openDrawerHandler, closeDrawerHandler } =
    useDashboardDrawer();

  return (
    <div className={styles.root}>
      <OpenDrawerButton openDrawerHandler={openDrawerHandler} />
      <Drawer isOpen={isOpen} closeDrawerHandler={closeDrawerHandler}>
        <div className={styles.content}>
          {profile && <UserProfileSummary profile={profile} size="large" />}
          <NavigationMenu selectMenuItemHandler={closeDrawerHandler} />
          <LogoutUser
            size="medium"
            className={styles.logout}
            onLogout={closeDrawerHandler}
          />
        </div>
      </Drawer>
    </div>
  );
};
