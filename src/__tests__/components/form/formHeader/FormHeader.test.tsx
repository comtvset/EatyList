import { FormHeader } from '@/components/form/formHeader/FormHeader';
import { expect, it, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en.json';

describe('FormHeader Component', () => {
  it('should render form header', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FormHeader header="Sign In / Sign Up" />
      </NextIntlClientProvider>,
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Sign In');
    expect(heading).toHaveTextContent('Sign Up');
  });
});
