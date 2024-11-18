import styles from '@/components/form/providers/additionalProviders/Providers.module.scss';
import { Provider } from './provider/Provider';
import { useTranslations } from 'next-intl';

export const Providers: React.FC = () => {
  const t = useTranslations('Form');

  return (
    <>
      <div role="providers" className={styles.container}>
        <Provider
          src="/google.webp"
          text={t('continueWithGoogle')}
          textColor="white"
          backgroundColor="#5496ec"
          border="1px solid #5496ec"
        />
        <Provider
          src="/facebook.webp"
          text={t('continueWithFacebook')}
          textColor="white"
          backgroundColor="#415a9a"
          border="1px solid #415a9a"
        />
        <Provider
          src="/github.webp"
          text={t('continueWithGitHub')}
          textColor="white"
          backgroundColor="black"
          border="1px solid black"
        />
      </div>
    </>
  );
};
