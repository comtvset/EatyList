import styles from './Loading.module.scss';

export const LoadingSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};
