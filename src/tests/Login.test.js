import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa as funcionalidades da tela de Login', () => {
  it('Verifica se a página de login é renderizada no endpoint "/"', () => {
    const { history, debug } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
    expect(pathname).not.toBe('/game');
    expect(pathname).not.toBe('/qualquer-coisa');

  });

  // it('Verifica a existência de dois inputs na tela de login', () => {

  // });

  // it('Verifica a existência de botão um botão com texto "Play"', () => {

  // });

  // it('Verifica a existência de um botão com texto "Settings"', () => {

  // });
  
  // it('Verifica se, ao clicar no botão "Settings", a página é redirecionada para "/settings"', () => {

  // });

  // it('Verifica se o botão "Play" está desabilitado enquanto os inputs estão vazios', () => {

  // });

  // it('Verifica se o botão "Play" está desabilitado enquanto apenas um input é preenchido', () => {

  // });

  // it('Verifica se o botão "Play" é habilitado quando ambos inputs são preenchidos', () => {

  // });

  // it('Verifica se, ao clicar no botão "Play", a API Trivia é chamada para recuperar um token', () => {

  // });

  // it('Verifica se, ao clicar no botão "Play", o conteúdo digitado nos inputs é salvo no store da aplicação', () => {

  // });

  // it('Verifica se, ao clicar no botão "Play", a página é redirecionada para "/game"', () => {

  // });

});
