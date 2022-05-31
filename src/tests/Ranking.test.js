import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
// import Game from '../pages/Game';
// import Feedback from '../pages/Feedback';
import App from '../App';

const defaultState = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
  }
}

const stateVersionOne = {
  player: {
    name:'Ronaldinho Gaúcho',
    gravatarEmail:'ronaldinho@bruxo.com',
    score:0,
  }
}

const storage = [
  {
  name: "Maria Isabella",
  picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
  score: 40,
  }
  ,
  {
  name: "Vinicius",
  picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
  score: 80,
  }
  ,
  {
  name: "Isadora",
  picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
  score: 30,
  }
  ,
  {
  name: "Raphael",
  picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
  score: 30,
  }
]

describe('Testa as funcionalidades da tela de Ranking', () => {
  it('Verifica se a página de ranking é renderizada na rota "/ranking"', () => {
    const {history} = renderWithRouterAndRedux(<App/>,defaultState,"/ranking");

    const {location:{pathname}} = history
    expect(pathname).toBe('/ranking');
    expect(pathname).not.toBe('/feedback');
    expect(pathname).not.toBe('/qualquer-coisa');
  });
  it('Verifica se há um título "Ranking"', () => {
    renderWithRouterAndRedux(<Ranking />);

    const titleRanking = screen.getByRole('heading', {level: 2, name: /ranking/i});
    expect(titleRanking).toBeInTheDocument();
  });

  it('Verifica se há um botão "Home"', () => {
    renderWithRouterAndRedux(<Ranking />);

    const buttonHome = screen.getByRole('button', {name: /home/i});
    expect(buttonHome).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });

  it('Verifica se ao clicar no botão "Home" a tela é redirecionada para a rota "/"', () => {
    const {history} = renderWithRouterAndRedux(<App/>,defaultState,"/ranking");

    const buttonHome = screen.getByRole('button', {name: /home/i});
    userEvent.click(buttonHome);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se os dados do jogador são renderizados corretamente "player 0"', () => {
    localStorage.setItem('ranking', JSON.stringify(storage));
    renderWithRouterAndRedux(<Ranking />);

    const playerName = screen.getByTestId('player-name-0');
    const playerScore = screen.getByTestId('player-score-0');

    expect(playerName && playerScore).toBeInTheDocument();
    expect(playerName.innerHTML).toBe('Vinicius');
    expect(playerScore.innerHTML).toBe('80');
  });

  it('Verifica se os dados do jogador são renderizados corretamente "player 1"', () => {
    localStorage.setItem('ranking', JSON.stringify(storage));
    renderWithRouterAndRedux(<Ranking />);

    const playerName = screen.getByTestId('player-name-1');
    const playerScore = screen.getByTestId('player-score-1');

    expect(playerName && playerScore).toBeInTheDocument();
    expect(playerName.innerHTML).toBe('Maria Isabella');
    expect(playerScore.innerHTML).toBe('40');
  });
})