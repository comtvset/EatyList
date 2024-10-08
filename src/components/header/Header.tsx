import Link from 'next/link';
import style from '@/components/header/Header.module.scss';
import { Gochi_Hand } from 'next/font/google';
import Lang from '@/assets/languages.svg';
import { GetStarted } from '../getStarted/GetStarted';

const localFont = Gochi_Hand({
  weight: '400',
  subsets: ['latin'],
});

export const Header: React.FC = () => {
  return (
    <header className={style.container}>
      <Link className={localFont.className} href={'/'} style={{ fontSize: '3.2rem' }}>
        EatyList
      </Link>
      <div className={style.nav}>
        <Lang className={style.languages} width="25" height="25" />
        <Link href={'signin'} className={style.signIn}>
          Sign In
        </Link>
        <GetStarted />
      </div>
    </header>
  );
};
