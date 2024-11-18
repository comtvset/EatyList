import { FormHeader } from '@/components/form/formHeader/FormHeader';
import { expect, it, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';

describe('FormHeader Component', () => {
  it('should render form header', () => {
    render(<FormHeader header="Sign In / Sign Up" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Sign In');
    expect(heading).toHaveTextContent('Sign Up');
  });
});
