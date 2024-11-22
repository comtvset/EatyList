'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';
import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const t = useTranslations('NotFound/ErrorPages');

  return (
    <div className={styles.main}>
      <h2 style={{ fontSize: '50px' }}>⚠️</h2>
      <h2 style={{ margin: '20px' }}>{t('wrong')}</h2>

      <div>
        <button
          className="globalOrangeButton"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push('/');
            }
          }}
        >
          <span>{t('back')}</span>
        </button>
        <button className="globalOrangeButton" onClick={() => reset()}>
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
