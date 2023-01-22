
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Header from './Header';

test('renders Header component', () => {
  render(<Header />);
  const headerElement = screen.getByText(/ChicagoSnake/i);
  expect(headerElement).toBeInTheDocument();
});

test('if button is presented in Header component', () => {
  render(<Header />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
