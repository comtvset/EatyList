import { Providers } from '@/components/form/providers/additionalProviders/Providers';
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
          <Providers />
        </AuthProvider>
      </NextIntlClientProvider>,
    );

    const google = screen.getByText('Continue with Google');
    expect(google).toBeInTheDocument();

    const facebook = screen.getByText('Continue with Facebook');
    expect(facebook).toBeInTheDocument();

    const github = screen.getByText('Continue with GitHub');
    expect(github).toBeInTheDocument();
  });
});
