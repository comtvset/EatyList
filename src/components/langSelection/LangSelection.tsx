'use client';

import styles from '@/components/langSelection/LangSelection.module.scss';
import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import { useLocale } from 'next-intl';

export const LangSelection = () => {
  const currentLocale = useLocale();
  const [language, setLanguage] = useState(currentLocale);
  const [isPending, setIsPending] = useState(false);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value as Locale;

    setLanguage(selectedLocale);
    setIsPending(true);

    try {
      await setUserLocale(selectedLocale);
    } catch (error) {
      console.error('Error updating locale:', error);
    } finally {
      setIsPending(false);
    }
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
