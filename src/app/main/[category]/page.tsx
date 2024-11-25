import BackButton from '@/components/buttons/BackButton';
import styles from '../../page.module.css';

export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;

  return (
    <div className={styles.main}>
      Category: {category}
      <BackButton />
    </div>
  );
}
