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

  it('Verifica a existência de dois inputs na tela de login', () => {
    const { debug } = renderWithRouterAndRedux(<App />);

    const loginInputs = screen.getAllByRole('textbox');

    expect(loginInputs).toHaveLength(2);
    expect(loginInputs[0]).toBeInTheDocument();
    expect(loginInputs[1]).toBeInTheDocument();
  });

  it('Verifica a existência de um botão com texto "Settings"', () => {
    const { debug } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: 'Settings' });

    expect(settingsButton).toBeInTheDocument();
  });
    
  it('Verifica se, ao clicar no botão "Settings", a página é redirecionada para "/settings"', () => {
    const { history, debug } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;

    const settingsButton = screen.getByRole('button', { name: 'Settings' });

    expect(pathname).toBe('/');
    expect(settingsButton).toBeInTheDocument();
    expect(settingsButton).not.toBeDisabled();

    userEvent.click(settingsButton);
    // debug();

    expect(history.location.pathname).toBe('/settings');
  });
      
  it('Verifica a existência de botão um botão com texto "Play"', () => {
    const { debug } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: 'Play' });
    
    expect(playButton).toBeInTheDocument();
  });

  it('Verifica se o botão "Play" está desabilitado enquanto os inputs estão vazios', () => {
    const { debug } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: 'Play' });

    expect(playButton).toBeDisabled();
  });

  it('Verifica se o botão "Play" está desabilitado enquanto apenas um input é preenchido', () => {
    const { debug } = renderWithRouterAndRedux(<App />);

    const loginInputs = screen.getAllByRole('textbox');
    const playButton = screen.getByRole('button', { name: 'Play' });

    expect(playButton).toBeDisabled();

    userEvent.type(loginInputs[0], 'nome do usuário');

    expect(playButton).toBeDisabled();
    // debug();
  });

  it('Verifica se o botão "Play" é habilitado quando ambos inputs são preenchidos', () => {
    const { debug } = renderWithRouterAndRedux(<App />);

    const loginInputs = screen.getAllByRole('textbox');
    const playButton = screen.getByRole('button', { name: 'Play' });

    expect(playButton).toBeDisabled();

    userEvent.type(loginInputs[0], 'nome do usuário');
    expect(playButton).toBeDisabled();

    userEvent.type(loginInputs[1], 'usuario@email.com');
    expect(playButton).not.toBeDisabled();

  });

  // it('Verifica se, ao clicar no botão "Play", a API Trivia é chamada para recuperar um token', () => {

  // });

  // it('Verifica se, ao clicar no botão "Play", o conteúdo digitado nos inputs é salvo no store da aplicação', () => {

  // });

  // it('Verifica se, ao clicar no botão "Play", a página é redirecionada para "/game"', () => {

  // });

});
