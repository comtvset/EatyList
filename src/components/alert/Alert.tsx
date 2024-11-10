import styles from '@/components/alert/Alert.module.scss';
import { AlertStatus } from '@/contexts/alertContext';

export const Alert = ({ status }: { status: AlertStatus }) => {
  const alertStyles = {
    error: styles.error,
    successful: styles.successful,
  };

  const { type } = status;

  if (type && status.message) {
    return <div className={`${styles.container} ${alertStyles[type]}`}>{status.message}</div>;
  }

  return null;
};
