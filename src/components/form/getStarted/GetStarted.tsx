import styles from '@/components/form/getStarted/GetStarted.module.scss';
import Link from 'next/link';

export const GetStarted = () => {
  return (
    <>
      <Link href={'signup'} className={styles.getStart}>
        {'Get Started'}
      </Link>
    </>
  );
};
