import Link from 'next/link';
import styles from '@/components/header/Header.module.scss';
import { Gochi_Hand } from 'next/font/google';
import { GetStarted } from '../form/getStarted/GetStarted';
import { LangSelection } from '../langSelection/LangSelection';
import { useTranslations } from 'next-intl';

const localFont = Gochi_Hand({
  weight: '400',
  subsets: ['latin'],
});

export const Header: React.FC = () => {
  const t = useTranslations('HomePage');

  return (
    <header className={styles.container}>
      <Link className={localFont.className} href={'/'} style={{ fontSize: '3.2rem' }}>
        EatyList
      </Link>
      <div className={styles.nav}>
        <LangSelection />
        <Link href={'signin'} className={styles.signIn}>
          {t('signin')}
        </Link>
        <GetStarted />
      </div>
    </header>
  );
};
