import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { StartPage } from './StartPage';

test('StartPage component exists', () => {
  render(<StartPage />);
  const startPage = screen.getByTestId('StartPage');
  expect(startPage).toBeInTheDocument();
});

test('StartPage component has class previewCanvas', () => {
  const { container } = render(<StartPage />);
  expect(container.firstChild).toHaveClass('previewCanvas');
});
