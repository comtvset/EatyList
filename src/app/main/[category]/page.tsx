import BackButton from '@/components/buttons/BackButton';
import styles from '../../page.module.css';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className={styles.main}>
          Category: {category}
          <BackButton />
        </div>
      </Suspense>
    </>
  );
}
