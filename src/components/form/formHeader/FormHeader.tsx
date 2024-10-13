import styles from '@/components/form/formHeader/FormHeader.module.scss';

export const FormHeader = ({ header }: { header: string }) => {
  return (
    <>
      <h2 className={styles.header}>{header}</h2>
    </>
  );
};
