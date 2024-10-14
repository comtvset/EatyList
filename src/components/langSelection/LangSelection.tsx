'use client';

import styles from '@/components/langSelection/LangSelection.module.scss';
import { useState } from 'react';

export const LangSelection = () => {
  const [language, setLanguage] = useState('English');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <div className={styles.selectContainer}>
        <select value={language} onChange={handleSelect} id="lang-select">
          <option value="en" data-id="en-option">
            English
          </option>
          <option value="es" data-id="pl-option">
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
