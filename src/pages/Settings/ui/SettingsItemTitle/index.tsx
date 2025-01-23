import styles from './SettingsItemTitle.module.css';

interface SettingsItemTitleProps {
  text: string;
}

export const SettingsItemTitle = ({ text }: SettingsItemTitleProps) => {
  return <h2 className={styles.root}>{text}</h2>;
};
