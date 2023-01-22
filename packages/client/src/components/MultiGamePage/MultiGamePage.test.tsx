import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { MultiGamePage } from './MultiGamePage';

test('renders MultiGamePage component', () => {
  render(<MultiGamePage />);
  const MultiGamePageElement = screen.getByText(/MultiGamePage/i);
  expect(MultiGamePageElement).toBeInTheDocument();
});

test('multi game page has class is toHaveClass wrapper', () => {
  const { container } = render(<MultiGamePage />);
  expect(container.firstChild).toHaveClass('wrapper');
});
