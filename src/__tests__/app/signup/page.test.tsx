import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en.json';
import { AuthProvider } from '@/contexts/authContext';
import SingUp from '@/app/signup/page';

describe('SignUp Component', () => {
  it('should render heading, form, separator, providers', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthProvider initialToken={null}>
          <SingUp />
        </AuthProvider>
      </NextIntlClientProvider>,
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Sign Up');

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();

    const providers = screen.getByRole('providers');
    expect(providers).toBeInTheDocument();
  });
});
