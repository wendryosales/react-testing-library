import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

describe('componente <Pokemon.js />', () => {
  it('é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    const name = screen.getByTestId('pokemon-name');
    const weight = screen
      .getByTestId('pokemon-weight', { name: /Average weight: 6.0 kg/i });
    const img = screen.getByRole('img');
    expect(weight).toBeDefined();
    expect(type).toHaveTextContent(/Electric/i);
    expect(name).toBeDefined();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const favIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favIcon.src).toBe('/star-icon.svg');
    expect(favIcon).toBeDefined();
  });
});
