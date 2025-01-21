import styles from './GroupTitle.module.css';

interface GroupTitleProps {
  title: string;
  elementsCount: number;
}

export const GroupTitle = ({ title, elementsCount }: GroupTitleProps) => {
  const wrappedElementsCount = `(${elementsCount})`;

  return (
    <div className={styles.root}>
      {title} {elementsCount > 0 && wrappedElementsCount}
    </div>
  );
};
