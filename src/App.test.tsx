import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders text', () => {
    render(<App />);

    expect(
      screen.getByText(
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur perspiciatis consequatur debitis beatae, adipisci aliquid laudantium et eos nobis deleniti fuga nulla totam autem, mollitia error. Voluptatem facere impedit quisquam!'
      )
    ).toBeVisible();
  });
});
