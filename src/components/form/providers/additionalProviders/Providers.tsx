'use client';

import styles from '@/components/form/providers/additionalProviders/Providers.module.scss';
import { Provider } from './provider/Provider';
import { useTranslations } from 'next-intl';

export const Providers: React.FC = () => {
  const t = useTranslations('Form');

  return (
    <>
      <div className={styles.container}>
        <Provider
          src="/google.png"
          text={t('continueWithGoogle')}
          textColor="white"
          backgroundColor="#5496ec"
          border="1px solid #5496ec"
          borderRight="1px solid #5496ec"
        />
        <Provider
          src="/facebook.png"
          text={t('continueWithFacebook')}
          textColor="white"
          backgroundColor="#415a9a"
          border="1px solid #415a9a"
          borderRight="1px solid #415a9a"
        />
        <Provider
          src="/apple.png"
          text={t('continueWithApple')}
          textColor="black"
          backgroundColor="#ffffff"
          border="1px solid black"
          borderRight="1px solid black"
        />
      </div>
    </>
  );
};
