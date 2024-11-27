import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface GetStartedProps {
  closeMenu: () => void;
  isMenuOpen: boolean;
}

export const GetStarted: React.FC<GetStartedProps> = ({ closeMenu, isMenuOpen }) => {
  const t = useTranslations('HomePage');

  return (
    <>
      <Link
        href={'signup'}
        className={`globalBlueButton ${isMenuOpen ? 'globalBlueButtonBurger' : ''}`}
        onClick={closeMenu}
      >
        {t('getStart')}
      </Link>
    </>
  );
};
