import Link from 'next/link';
import styles from '../category/category.module.scss';

interface CategoryProps {
  text: string;
  bgColor: string;
  id: string;
}

export default function Category({ text, bgColor, id }: CategoryProps) {
  return (
    <Link
      className={styles.superEllipse}
      style={{ '--bg-color': bgColor } as React.CSSProperties}
      href={`main/${id.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span>{text}</span>
    </Link>
  );
}
