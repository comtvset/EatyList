import styles from '@/components/form/formHeader/FormHeader.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const FormHeader = ({ header }: { header: string }) => {
  const t = useTranslations('Form');

  let question = '';
  let link = '';
  let href = '';

  if (header === t('titleFormSignUp')) {
    question = t('haveAccount?');
    link = t('titleFormSignIn');
    href = 'signin';
  } else {
    question = t('doNotHaveAccount?');
    link = t('titleFormSignUp');
    href = 'signup';
  }

  return (
    <>
      <div className={styles.formHeaderContainer}>
        <h2 className={styles.header}>{header}</h2>
        <div>
          {question}{' '}
          <Link className={styles.link} href={href}>
            {link}
          </Link>
        </div>
      </div>
    </>
  );
};
