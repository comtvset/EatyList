import React, { useContext } from 'react';
import { AlertContext } from '@/contexts/alertContext';
import { useTranslations } from 'next-intl';

export const ShowError = () => {
  const { catchAlert } = useContext(AlertContext);
  const t_err = useTranslations('Errors');

  const handleError = async () => {
    catchAlert({ type: 'error', message: t_err('unknown_err_spec') });
  };

  const handleSuccessful = async () => {
    catchAlert({ type: 'successful', message: t_err('unknown_suc_spec') });
  };

  return (
    <>
      <button className="globalBlueButton" style={{ margin: '1px' }} onClick={handleError}>
        {t_err('showError')}
      </button>
      <button className="globalBlueButton" style={{ margin: '1px' }} onClick={handleSuccessful}>
        {t_err('showSuccess')}
      </button>
    </>
  );
};
