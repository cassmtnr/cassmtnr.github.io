import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders text', () => {
    render(<App />);

    expect(screen.getByText('nope nope nope')).toBeVisible();
  });
});
