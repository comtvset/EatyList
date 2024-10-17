'use client';

import styles from '@/components/langSelection/LangSelection.module.scss';
import { useState, useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import { useLocale } from 'next-intl';

export const LangSelection = () => {
  const currentLocale = useLocale();
  const [language, setLanguage] = useState(currentLocale);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    startTransition(() => {
      setUserLocale(event.target.value as Locale);
    });
  };

  return (
    <>
      <div className={styles.selectContainer}>
        <select value={language} onChange={handleSelect} id="lang-select" disabled={isPending}>
          <option value="en" data-id="en-option">
            English
          </option>
          <option value="es" data-id="es-option">
            Español
          </option>
          <option value="pl" data-id="pl-option">
            Polski
          </option>
        </select>
      </div>
    </>
  );
};
