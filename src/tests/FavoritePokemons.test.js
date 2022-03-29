import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('componente <FavoritePokemons.js />', () => {
  it('"No favorite pokemon found",caso a pessoa não tenha pokémons favoritos.', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePokemons);
    const content = screen.getByText(/No favorite pokemon found/i);
    expect(content).toBeDefined();
  });
  it('é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkbox);
    const img = screen.getByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(img).toBeDefined();
  });
});
