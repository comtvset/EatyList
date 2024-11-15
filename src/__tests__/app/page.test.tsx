import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { describe, expect, it } from '@jest/globals';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  HomePage: {
    title: 'Welcome page',
  },
};

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Home />
      </NextIntlClientProvider>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
