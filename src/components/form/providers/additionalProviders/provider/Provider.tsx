import Image from 'next/image';
import styles from '@/components/form/providers/additionalProviders/provider/Provider.module.scss';

interface ProviderProps {
  src: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  border: string;
  borderRight: string;
}
export const Provider: React.FC<ProviderProps> = ({
  src,
  text,
  textColor,
  backgroundColor,
  border,
}) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor, color: textColor, border: border }}
      className={styles.container}
    >
      <Image
        src={src}
        alt="img"
        width={30}
        height={30}
        style={{ borderRight: border }}
        className={styles.img}
      />
      <span className={styles.text}>{text}</span>
    </div>
  );
};
