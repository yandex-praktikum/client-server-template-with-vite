import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProfilePage } from './ProfilePage';

test('renders ProfilePage component', () => {
  render(<ProfilePage />);
  const ProfilePageElement = screen.getByText(/ProfilePage/i);
  expect(ProfilePageElement).toBeInTheDocument();
});

test('if button is presented in ProfilePage component', () => {
  render(<ProfilePage />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('if Avatar component has property color equal "info"', () => {
  render(<ProfilePage />);
  const avatarElement = screen.getByRole('img');
  expect(avatarElement).toHaveAttribute('color', 'info');
});

