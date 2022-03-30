import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const selectPokemon = () => ({
  name: screen.getByTestId('pokemon-name').textContent,
  type: screen.getByTestId('pokemon-type').textContent,
  averageWeight: screen.getByTestId('pokemon-weight').textContent,
});
const next = () => screen.getByRole('button', { name: /Próximo pokémon/i });

const testPkm = (pokemon) => {
  const pkmOnScreen = selectPokemon();
  expect(pkmOnScreen.name).toBe(pokemon.name);
  expect(pkmOnScreen.type).toBe(pokemon.type);
  expect(pkmOnScreen.averageWeight)
    .toBe(`Average weight: ${pokemon.averageWeight.value} kg`);
  userEvent.click(next());
};

describe('Teste o componente <Pokedex.js />', () => {
  it('página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(h2).toBeDefined();
  });
  it('é exibido o próximo Pokémon da lista caso o botão Próximo seja clicado.', () => {
    renderWithRouter(<App />);
    pokemons.forEach((current) => testPkm(current));
  });
  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    types.forEach((current, index) => {
      console.log(current);
      expect(screen.queryAllByTestId('pokemon-type-button')[index]).toBeDefined();
      expect(screen.queryAllByTestId('pokemon-type-button')[index]
        .textContent).toBe(current);
    });
  });
  it(' a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((current) => {
      const btnType = screen.getByRole('button', { name: current });
      userEvent.click(btnType);
      const pokemonClicked = pokemons
        .filter((pkmActual) => pkmActual.type === current);
      pokemonClicked.forEach((pkm) => testPkm(pkm));
    });
  });
  it('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    pokemons.forEach((pokemon) => testPkm(pokemon));
  });
});
