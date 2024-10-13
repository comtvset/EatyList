import styles from '../page.module.css';
import { Form } from '@/components/form/providers/customProvider/Form';
import { Providers } from '@/components/form/providers/additionalProviders/Providers';
import Separator from '@/components/form/separator/Separator';
import { FormHeader } from '@/components/form/formHeader/FormHeader';

export default function SingIn() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <FormHeader header={'Sign In'} />
        <div className={styles.providersContainer}>
          <Form />
          <Separator />
          <Providers />
        </div>
      </div>
    </main>
  );
}
