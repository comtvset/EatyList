import { Provider } from '@/components/form/providers/additionalProviders/provider/Provider';
import { AuthContext, AuthProvider } from '@/contexts/authContext';
import { expect, it, describe, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en.json';
import { AlertContext } from '@/contexts/alertContext';

describe('Provider Component', () => {
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

  it('should be alert with error "Provider not found"', async () => {
    const mockVerify = jest.fn();
    const mockSetIsAuthenticated = jest.fn();
    const mockCatchAlert = jest.fn();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthContext.Provider
          value={{
            verify: mockVerify as jest.Mock<() => Promise<void>>,
            isAuthenticated: false,
            setIsAuthenticated: mockSetIsAuthenticated,
          }}
        >
          <AlertContext.Provider value={{ catchAlert: mockCatchAlert }}>
            <Provider
              src={'/google.webp'}
              text={'Continue with Example'}
              textColor={''}
              backgroundColor={''}
              border={''}
            />
          </AlertContext.Provider>
        </AuthContext.Provider>
      </NextIntlClientProvider>,
    );

    const googleButton = screen.getByText('Continue with Example');
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(mockCatchAlert).toHaveBeenCalledWith({
        type: 'error',
        message: 'Provider not found',
      });
    });
  });
});

//TODO: problems with mocked firebase/auth... to return later
