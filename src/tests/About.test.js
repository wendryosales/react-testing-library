import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('o componente <About.js />', () => {
  it('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeDefined();
  });

  it('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p = screen.getByText(/this application simulates a pokédex/i,
      /one can filter pokémons by type, and see more/i);

    expect(p).toBeDefined();
  });

  it('a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(url);
  });
});
