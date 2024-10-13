import styles from '@/components/form/providers/additionalProviders/Providers.module.scss';
import { Provider } from './provider/Provider';

export const Providers: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Provider
          src="/google.png"
          text="Continue with Google"
          textColor="white"
          backgroundColor="#5496ec"
          border="1px solid #5496ec"
          borderRight="1px solid #5496ec"
        />
        <Provider
          src="/facebook.png"
          text="Continue with Facebook"
          textColor="white"
          backgroundColor="#415a9a"
          border="1px solid #415a9a"
          borderRight="1px solid #415a9a"
        />
        <Provider
          src="/apple.png"
          text="Continue with Apple"
          textColor="black"
          backgroundColor="#ffffff"
          border="1px solid black"
          borderRight="1px solid black"
        />
      </div>
    </>
  );
};
