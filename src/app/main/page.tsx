'use client';

import Category from '@/components/category/category';
import styles from '../page.module.css';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';

export default function SingUp() {
  const t = useTranslations('MainPage');
  const { user } = useAuth();

  return (
    <>
      <p className={styles.user} title={user}>
        ∷ {user}
      </p>
      <main className={styles.main}>
        <div className={styles.categories}>
          <Category text={t('pasta')} bgColor={'#e02d20'} id={'pasta'} />
          <Category text={t('potato')} bgColor={'#b6b900'} id={'potato'} />
          <Category text={t('rice')} bgColor={'#7e7e7e'} id={'rice'} />
          <Category text={t('meat')} bgColor={'#9b5318'} id={'meat'} />
          <Category text={t('fish')} bgColor={'#18729b'} id={'fish'} />
          <Category text={t('potatoPancakes')} bgColor={'#d36409'} id={'potatopancakes'} />
          <Category text={t('salad')} bgColor={'#2e9b18'} id={'salad'} />
          <Category text={t('soup')} bgColor={'#a86807'} id={'soup'} />
        </div>
      </main>
    </>
  );
}
