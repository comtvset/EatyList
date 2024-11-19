import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from '@/components/header/Header';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en.json';
import { AuthContext } from '@/contexts/authContext';
import { AlertContext } from '@/contexts/alertContext';

jest.mock('@/contexts/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  AuthContext: {
    Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  },
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render logo, language, signin, signup (token: null)', () => {
    const mockVerify = jest.fn();
    const mockSetIsAuthenticated = jest.fn();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthContext.Provider
          value={{
            verify: mockVerify as jest.Mock<() => Promise<void>>,
            isAuthenticated: false,
            setIsAuthenticated: mockSetIsAuthenticated,
          }}
        >
          <Header />
        </AuthContext.Provider>
      </NextIntlClientProvider>,
    );

    const logo = screen.getByRole('logo');
    const selectElement = screen.getByRole('combobox');
    const signin = screen.getByRole('link', { name: 'Sign In' });
    const signup = screen.getByRole('link', { name: 'Get Started' });

    expect(logo).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(signin).toBeInTheDocument();
    expect(signup).toBeInTheDocument();
  });

  it('should render signout (token: true)', async () => {
    const mockVerify = jest.fn();
    const mockSetIsAuthenticated = jest.fn();
    const mockCatchAlert = jest.fn();

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthContext.Provider
          value={{
            verify: mockVerify as jest.Mock<() => Promise<void>>,
            isAuthenticated: true,
            setIsAuthenticated: mockSetIsAuthenticated,
          }}
        >
          <AlertContext.Provider value={{ catchAlert: mockCatchAlert }}>
            <Header />
          </AlertContext.Provider>
        </AuthContext.Provider>
      </NextIntlClientProvider>,
    );

    const signOutButton = screen.getByRole('link', { name: 'Sign Out' });
    expect(signOutButton).toBeInTheDocument();

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(mockCatchAlert).toHaveBeenCalledWith({
        type: 'error',
        message: 'removeToken: Error',
      });
    });

    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false);
    });
  });
});
