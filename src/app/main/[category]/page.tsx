import BackButton from '@/components/buttons/BackButton';
import styles from '../../page.module.css';

export const dynamicParams = false;
const categories = ['pasta', 'potato', 'rice', 'meat', 'fish', 'potatopancakes', 'salad', 'soup'];

export function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;

  return (
    <div className={styles.main}>
      Category: {category}
      <BackButton />
    </div>
  );
}
