import styles from '@/components/form/getStarted/GetStarted.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const GetStarted = () => {
  const t = useTranslations('HomePage');

  return (
    <>
      <Link href={'signup'} className={styles.getStart}>
        {t('getStart')}
      </Link>
    </>
  );
};
