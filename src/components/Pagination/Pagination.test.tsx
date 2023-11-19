import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Pagination } from '.';
import { renderWithProviders } from '../../utils/test-utils';

const meta = {
  current_rows: 12,
  total_rows: 12850,
  rows_remaining: 12838,
  total_pages: 1070,
  pages_remaining: 1070,
  next_page: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=12&offset=12&fname=',
  next_page_offset: 12,
};

const isFetching = false;

describe('Pagination', () => {
  test('Page number displays correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination meta={meta} isFetching={isFetching} />
      </BrowserRouter>
    );

    const getCurrentPage = await screen.findByText('1');
    expect(getCurrentPage).toBeInTheDocument();
  });

  test('Button click', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination meta={meta} isFetching={isFetching} />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});
