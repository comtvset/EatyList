'use client';

import { ShowError } from '@/components/testComponent/showError';
import styles from '../page.module.css';
import { useTranslations } from 'next-intl';

export default function SingUp() {
  const t = useTranslations('MainPage');

  return (
    <main className={styles.main}>
      <h1>{t('title')}</h1>
      <ShowError />
    </main>
  );
}
