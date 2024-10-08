import style from '@/components/getStarted/GetStarted.module.scss';
import Link from 'next/link';

export const GetStarted = () => {
  return (
    <>
      <Link href={'signup'} className={style.getStart}>
        {'Get Started'}
      </Link>
    </>
  );
};
