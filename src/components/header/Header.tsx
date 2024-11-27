'use client';

import Link from 'next/link';
import styles from '@/components/header/Header.module.scss';
import { Gochi_Hand } from 'next/font/google';
import { GetStarted } from '../form/getStarted/GetStarted';
import { LangSelection } from '../langSelection/LangSelection';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { removeToken } from '@/services/removeToken';
import { AlertContext } from '@/contexts/alertContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

const localFont = Gochi_Hand({
  weight: '400',
  subsets: ['latin'],
});

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('HomePage');
  const t_err = useTranslations('Errors');

  const { verify, isAuthenticated, setIsAuthenticated } = useAuth();
  const { catchAlert } = useContext(AlertContext);

  const handleSignOut = async () => {
    try {
      signOut(auth);
      await removeToken();
    } catch (err) {
      if (err instanceof Error) {
        catchAlert({ type: 'error', message: `removeToken: ${err.name}` });
      } else {
        catchAlert({ type: 'error', message: t_err('unknown_err') });
      }
    }
    setIsAuthenticated(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <header className={styles.container}>
      <Link
        className={localFont.className}
        href={'/'}
        style={{ fontSize: '3.2rem' }}
        role={'logo'}
        onClick={closeMenu}
      >
        EatyList
      </Link>

      <div className={styles.burger} onClick={toggleMenu}>
        <span className={isMenuOpen ? styles.burgerOpen : ''}></span>
        <span className={isMenuOpen ? styles.burgerOpen : ''}></span>
        <span className={isMenuOpen ? styles.burgerOpen : ''}></span>
      </div>

      <div className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <LangSelection />
        {isAuthenticated ? (
          <Link
            href={'/'}
            className={`globalBlueButton ${isMenuOpen ? 'globalBlueButtonBurger' : ''}`}
            onClick={handleSignOut}
          >
            {t('signout')}
          </Link>
        ) : (
          <>
            <Link href={'signin'} className={styles.signIn} onClick={closeMenu}>
              {t('signin')}
            </Link>
            <GetStarted closeMenu={closeMenu} isMenuOpen={isMenuOpen} />
          </>
        )}
      </div>
    </header>
  );
};
