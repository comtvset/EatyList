import { expect, it, describe, jest } from '@jest/globals';
import * as NextNavigation from 'next/navigation';
import messages from '@/i18n/messages/en.json';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/contexts/authContext';
import { Form } from '@/components/form/providers/customProvider/Form';

describe('Form Component', () => {
  jest.spyOn(NextNavigation, 'usePathname').mockReturnValue('/signup');

  it('should render fields (email, confirm email, password, confirm password), submit', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthProvider initialToken={null}>
          <Form />
        </AuthProvider>
      </NextIntlClientProvider>,
    );

    const emailInput = screen.getByLabelText('Email*');
    expect(emailInput).toBeInTheDocument();

    const confirmEmail = screen.getByLabelText('Confirm email*');
    expect(confirmEmail).toBeInTheDocument();

    const password = screen.getByLabelText('Choose a password*');
    expect(password).toBeInTheDocument();

    const confirmPassword = screen.getByLabelText('Confirm password*');
    expect(confirmPassword).toBeInTheDocument();

    const submit = screen.getByRole('button', { name: 'Sign Up' });
    expect(submit).toHaveValue('Sign Up');
  });
});
