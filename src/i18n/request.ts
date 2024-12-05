import { getUserLocale } from '@/services/locale';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  console.log('Locale from cookies:', locale);
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  console.log('Messages:', messages);

  return {
    locale,
    messages: messages,
  };
});
