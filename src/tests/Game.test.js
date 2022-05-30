import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';

const defaultState = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  }
}

describe('Testa as funcionalidades da tela de Jogo', () => {
  it('Verifica se a página de login é renderizada no endpoint "/game"', () => {
    const { history, debug } = renderWithRouterAndRedux(<Game />);

    expect(pathname).toBe('/game');
    expect(pathname).not.toBe('/feedback');
    expect(pathname).not.toBe('/qualquer-coisa');
  });
  it('Verifica se os itens do componente "Header" existem', () => {
    const { history, debug } = renderWithRouterAndRedux(<Game />);

    const imgHeader = screen.getByRole('img');
    const nameHeader = screen.getByRole('heading', {level: 2});
    const scoreHeader = screen.getByRole('heading', {level: 2});
  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
  it('', ()=> {

  });
});