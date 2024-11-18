import { jest } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
