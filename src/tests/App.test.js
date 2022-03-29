import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const link1 = screen.getByRole('link', { name: /Home/i });
    expect(link1).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const link2 = screen.getByRole('link', { name: /About/i });
    expect(link2).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const link3 = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(link3).toBeInTheDocument();
  });
});
