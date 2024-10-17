import { useTranslations } from 'next-intl';
import styles from './Separator.module.scss';

export default function Separator() {
  const t = useTranslations('Form');

  return (
    <div className={styles.separatorContainer}>
      <div className={styles.line}></div>
      <span className={styles.text}>{t('or')}</span>
      <div className={styles.line}></div>
    </div>
  );
}
