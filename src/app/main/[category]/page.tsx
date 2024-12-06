import BackButton from '@/components/buttons/BackButton';
import styles from '../../page.module.css';
import { Suspense } from 'react';
import Loading from '@/app/loading';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;

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
