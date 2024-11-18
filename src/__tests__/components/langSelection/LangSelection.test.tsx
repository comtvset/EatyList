import { LangSelection } from '@/components/langSelection/LangSelection';
import { expect, it, describe, jest } from '@jest/globals';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en.json';
import { setUserLocale } from '@/services/locale';

jest.mock('@/services/locale', () => ({
  setUserLocale: jest.fn(),
  getUserLocale: jest.fn(),
}));

describe('LangSelection Component', () => {
  it('should render languge selection', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LangSelection />
      </NextIntlClientProvider>,
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    const options = within(selectElement).getAllByRole('option');
    expect(options).toHaveLength(3);

    expect(options[0]).toHaveTextContent('English');
    expect(options[1]).toHaveTextContent('Español');
    expect(options[2]).toHaveTextContent('Polski');
  });

  it('should call setUserLocale when language is changed', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LangSelection />
      </NextIntlClientProvider>,
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: 'pl' } });

    await waitFor(() => {
      expect(setUserLocale).toHaveBeenCalledTimes(1);
      expect(setUserLocale).toHaveBeenCalledWith('pl');
    });
  });
});
