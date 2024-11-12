'use client';

import Image from 'next/image';
import styles from '@/components/form/providers/additionalProviders/provider/Provider.module.scss';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';
import { AlertContext } from '@/contexts/alertContext';
import { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ProviderProps {
  src: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  border: string;
  borderRight: string;
}

export const Provider: React.FC<ProviderProps> = ({
  src,
  text,
  textColor,
  backgroundColor,
  border,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { verify } = useAuth();
  const { catchAlert } = useContext(AlertContext);
  const t_err = useTranslations('Errors');

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    let provider;

    if (text.includes('Google')) {
      provider = new GoogleAuthProvider();
    }
    if (text.includes('Facebook')) {
      provider = new FacebookAuthProvider();
    }
    if (text.includes('GitHub')) {
      provider = new GithubAuthProvider();
    }

    if (!provider) {
      catchAlert({ type: 'error', message: t_err('noProvider') });
      setIsLoading(false);
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken();

      if (idToken) {
        const response = await fetch('/api/authenticateGoogle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        });

        const data = await response.json();

        verify();

        if (data.message) {
          catchAlert({ type: 'successful', message: data.message });
        } else {
          catchAlert({ type: 'error', message: data.message });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Firebase: Error (auth/account-exists-with-different-credential).') {
          catchAlert({
            type: 'error',
            message: t_err('auth/account-exists-with-different-credential'),
          });
        } else if (err.message === 'Firebase: Error (auth/cancelled-popup-request).') {
          catchAlert({
            type: 'error',
            message: t_err('auth/cancelled-popup-request'),
          });
        } else if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
          catchAlert({
            type: 'error',
            message: t_err('auth/popup-closed-by-user'),
          });
        } else {
          catchAlert({
            type: 'error',
            message: err.message,
          });
        }
      } else {
        catchAlert({ type: 'error', message: t_err('unknown_err') });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: backgroundColor, color: textColor, border: border }}
      className={styles.container}
      onClick={handleClick}
    >
      <Image
        src={src}
        alt="img"
        width={100}
        height={100}
        style={{ borderRight: border }}
        className={styles.img}
        placeholder="blur"
        priority={true}
      />
      <span className={styles.text}>{text}</span>
    </div>
  );
};
