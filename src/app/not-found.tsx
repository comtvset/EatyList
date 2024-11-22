'use client';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('NotFound/ErrorPages');

  return (
    <aside className={styles.main}>
      <h2>
        {t('notFound')} {pathname}
      </h2>
      <p style={{ margin: '20px' }}>{t('info')}</p>
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
    </aside>
  );
}
