'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const t = useTranslations('NotFound/ErrorPages');

  return (
    <button
      className="globalOrangeButton"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      }}
    >
      <span>{t('back')}</span>
    </button>
  );
}
