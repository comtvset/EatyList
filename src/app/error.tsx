'use client';

import styles from '@/app/page.module.css';
import { useTranslations } from 'next-intl';
import BackButton from '@/components/buttons/BackButton';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('NotFound/ErrorPages');

  return (
    <div className={styles.main}>
      <h2 style={{ fontSize: '50px' }}>⚠️</h2>
      <h2 style={{ margin: '20px' }}>{t('wrong')}</h2>

      <div>
        <BackButton />
        <button className="globalOrangeButton" onClick={() => reset()}>
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
