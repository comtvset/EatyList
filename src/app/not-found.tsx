'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import styles from '@/app/page.module.css';
import BackButton from '@/components/buttons/BackButton';

export default function NotFound() {
  const pathname = usePathname();
  const t = useTranslations('NotFound/ErrorPages');

  return (
    <aside className={styles.main}>
      <h2 className={styles.notFoundTitle}>
        {t('notFound')} {pathname}
      </h2>
      <p style={{ margin: '20px' }}>{t('info')}</p>
      <BackButton />
    </aside>
  );
}
