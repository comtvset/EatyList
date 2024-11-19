import { Provider } from '@/components/form/providers/additionalProviders/provider/Provider';
import { AuthProvider } from '@/contexts/authContext';
import { expect, it, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en.json';

describe('Providers Component', () => {
  it('should render buttons providers (Google, Facebook, GitHub)', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthProvider initialToken={null}>
          <Provider
            src={'/google.webp'}
            text={'example'}
            textColor={''}
            backgroundColor={''}
            border={''}
          />
        </AuthProvider>
      </NextIntlClientProvider>,
    );

    const google = screen.getByText('example');
    expect(google).toBeInTheDocument();
  });
});

//TODO: to finish test of Provider component
