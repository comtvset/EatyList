import styles from './Separator.module.scss';

export default function Separator() {
  return (
    <div className={styles.separatorContainer}>
      <div className={styles.line}></div>
      <span className={styles.text}>or</span>
      <div className={styles.line}></div>
    </div>
  );
}
