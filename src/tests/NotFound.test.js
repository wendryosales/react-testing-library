import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('componente <NotFound.js />', () => {
  it('página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const content = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
    });
    expect(content).toBeDefined();
  });
  it('página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img.src).toEqual(url);
  });
});
