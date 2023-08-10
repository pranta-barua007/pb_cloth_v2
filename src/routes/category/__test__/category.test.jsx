import { screen } from '@testing-library/react';
import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test-utils';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      category: 'mens',
    }),
  };
});

describe('Category component tests', () => {
  test('It should render a Spinner if isLoading', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('It should render Categories if isLoading is false', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
              ],
            },
          ],
        },
      },
    });

    expect(screen.queryByTestId('spinner')).toBeNull();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
