import { getUserLocale } from '@/services/locale';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`@/i18n/messages/${locale}.json`)).default,
  };
});
