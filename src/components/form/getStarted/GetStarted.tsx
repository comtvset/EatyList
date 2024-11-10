import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const GetStarted = () => {
  const t = useTranslations('HomePage');

  return (
    <>
      <Link href={'signup'} className="globalBlueButton">
        {t('getStart')}
      </Link>
    </>
  );
};
