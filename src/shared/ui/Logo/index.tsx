import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.root}>
      <img src="/logo.svg" alt="Planner" />
      Planner
    </div>
  );
};
