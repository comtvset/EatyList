import { Alert } from '@/components/alert/Alert';
import { expect, it, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';

describe('Alert Component', () => {
  it('should render error alert', () => {
    render(
      <Alert
        status={{
          type: 'error',
          message: 'Unknown error occurred',
        }}
      />,
    );

    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toHaveTextContent('Unknown error occurred');
  });

  it('should render successful alert', () => {
    render(
      <Alert
        status={{
          type: 'successful',
          message: 'Hurray! Unknown success',
        }}
      />,
    );

    const successfulAlert = screen.getByRole('alert');
    expect(successfulAlert).toHaveTextContent('Hurray! Unknown success');
  });

  it('should not render alert when status null', () => {
    render(
      <Alert
        status={{
          type: null,
          message: null,
        }}
      />,
    );

    const missingAlert = screen.queryByRole('alert');
    expect(missingAlert).not.toBeInTheDocument();
  });
});
