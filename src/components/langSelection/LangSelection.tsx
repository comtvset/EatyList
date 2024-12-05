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
    console.log('Selected language:', event.target.value);
    setLanguage(event.target.value);
    startTransition(() => {
      try {
        console.log('Setting user locale to', event.target.value);
        setUserLocale(event.target.value as Locale);
      } catch (error) {
        console.error('Error setting user locale:', error);
      }
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
