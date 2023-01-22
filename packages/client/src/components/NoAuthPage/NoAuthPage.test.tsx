import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { NoAuthPage } from './NoAuthPage';

/**
 * test if NoAuthPage component exists
 */
test('NoAuthPage component exists', () => {
  render(<NoAuthPage />);
  const noAuthPage = screen.getByTestId('NoAuthPage');
  expect(noAuthPage).toBeInTheDocument();
});

test('NoAuthPage has text You are not authorized', () => {
  render(<NoAuthPage />);
  const noAuthPage = screen.getByText(/You are not authorized/i);
  expect(noAuthPage).toBeInTheDocument();
});

test('NoAuthPage has button with class button', () => {
  const { container } = render(<NoAuthPage />);
  expect(container.firstChild).toHaveClass('button');
});
