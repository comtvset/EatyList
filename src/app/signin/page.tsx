import styles from '../page.module.css';
import { Form } from '@/components/form/providers/customProvider/Form';
import { Providers } from '@/components/form/providers/additionalProviders/Providers';
import Separator from '@/components/form/separator/Separator';
import { FormHeader } from '@/components/form/formHeader/FormHeader';
import { useTranslations } from 'next-intl';

export default function SingIn() {
  const t = useTranslations('Form');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <FormHeader header={t('titleFormSignIn')} />
        <div className={styles.providersContainer}>
          <Form />
          <Separator />
          <Providers />
        </div>
      </div>
    </main>
  );
}
