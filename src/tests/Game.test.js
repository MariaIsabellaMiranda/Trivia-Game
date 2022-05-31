import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import Feedback from '../pages/Feedback';
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

describe('Testa as funcionalidades da tela de Jogo', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
          "response_code":0,
          "results":[
             {
                "category":"Entertainment: Video Games",
                "type":"multiple",
                "difficulty":"easy",
                "question":"What is the first weapon you acquire in Half-Life?",
                "correct_answer":"A crowbar",
                "incorrect_answers":[
                   "A pistol",
                   "The H.E.V suit",
                   "Your fists"
                ]
             }
             ,

             {
                "category": "Geography",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Which country has the abbreviation &quot;CH&quot;?",
                "correct_answer": "Switzerland",
                "incorrect_answers":[
                  "China",
                  "Canada",
                  "No Country"
                ]
              }
          ] 
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Verifica se a página de login é renderizada no endpoint "/game"', () => {
    const {history} = renderWithRouterAndRedux(<App/>,defaultState,"/game");

    const {location:{pathname}} = history
    expect(pathname).toBe('/game');
    expect(pathname).not.toBe('/feedback');
    expect(pathname).not.toBe('/qualquer-coisa');
  });

  it('Verifica se a página possui elementos header',() =>{
    const {history} = renderWithRouterAndRedux(<App/>,stateVersionOne,"/game");
    
    const headerImg = screen.getByRole('img');
    const headerName= screen.getByRole('heading',{level:3,name:/Ronaldinho Gaúcho/i});
    const headerScore= screen.getByRole('heading',{level:3,name:"0"});

    expect(headerImg).toBeInTheDocument();
    expect(headerImg.alt).toBe('Ronaldinho Gaúcho');
    expect(headerName).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();       
  });   

  it('Verifica se está chamando a API', async() => {
    renderWithRouterAndRedux(<Game />);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao renderizar a categoria da questão é "Entertainment: Video Games"', async() => {
    renderWithRouterAndRedux(<Game />);

    const titleCategory = await screen.findByRole('heading', { level: 2, name: /Entertainment: Video Games/i });
    expect(titleCategory).toBeInTheDocument();
    expect(titleCategory.innerHTML).not.toBe('Entertainment: Musicals & Theatres')
  });

  it('Verifica se ao renderizar o título da questão é "What is the first weapon you acquire in Half-Life?"', async() => {
    renderWithRouterAndRedux(<Game />);

    const titleQuestion = await screen.findByRole('heading', { level: 3, name: /What is the first weapon you acquire in Half-Life?/i });

    expect(titleQuestion).toBeInTheDocument();
    expect(titleQuestion.innerHTML).not.toBe('Which of these musicals won the Tony Award for Best Musical?')
  });

  it('Verificar se ao renderizar existem quatro opções de resposta', async () => {
    renderWithRouterAndRedux(<Game />);
    const alternativeButtons = await screen.findAllByRole('button');
    expect(alternativeButtons).toHaveLength(4);
  });

  it('Verifica se existem uma opção correta e três incorretas', async () => {
    renderWithRouterAndRedux(<Game />);
    const correctAnswer = await screen.findAllByTestId(/correct-answer/i);
    const wrongAnswer = await screen.findAllByTestId(/wrong-answer/i);
    expect(correctAnswer).toHaveLength(1);
    expect(wrongAnswer).toHaveLength(3);
  })

  it('Verifica se ao renderizar as opções, elas não contêm classe', async () => {
    renderWithRouterAndRedux(<Game />);
    const alternativeButtons = await screen.findAllByRole('button');
    alternativeButtons.forEach((answer) => expect(answer.className).toBe(''));
  })

  it('Verifica se ao renderizar existem respostas habilitadas', async () => {
    renderWithRouterAndRedux(<Game />);
    const alternativeButtons = await screen.findAllByRole('button');
    alternativeButtons.forEach((button) => expect(button).not.toBeDisabled());
  });

  // it('Verificar se após 30 segundos as resposta estão desabilitadas', async () => {
  //   renderWithRouterAndRedux(<Game />);
  //   jest.useFakeTimers();
  //   jest.advanceTimersByTime(32000);
  //   const alternativeButtons = await screen.findAllByRole('button');

  //   alternativeButtons.forEach((button) => expect(button).toBeDisabled());
  // });

  it('Verifica se ao clicar em uma resposta, o botão next é renderizado', async () => {
    renderWithRouterAndRedux(<Game />);
    const alternativeButtons = await screen.findAllByRole('button');
    userEvent.click(alternativeButtons[0]);
    const nextButton = screen.getByRole('button', {name: /next/i});
    expect(nextButton).toBeInTheDocument();
  });

  it('Verifica se ao clicar na resposta correta, o score é mudado', async () => {
    renderWithRouterAndRedux(<Game />);
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const scoreValue = screen.getByTestId('header-score');
    expect(scoreValue.innerHTML).toBe("40"); //( 30 Timer + Easy(10 pontos) )
  });

  // it('Verifica se após uma partida com 5 perguntas o jogador é redirecionado para a tela de feedback', async () => {
  //   const {history, debug} = renderWithRouterAndRedux(<App/>,stateVersionOne,"/game");

  //     userEvent.click(await screen.findByTestId('correct-answer'));
  //     userEvent.click(screen.getByRole('button', {name: /next/i}));

  //     userEvent.click(await screen.findByTestId('correct-answer'));
  //     userEvent.click(screen.getByRole('button', {name: /next/i}));

  //     userEvent.click(await screen.findByTestId('correct-answer'));
  //     userEvent.click(screen.getByRole('button', {name: /next/i}));

  //     userEvent.click(await screen.findByTestId('correct-answer'));
  //     userEvent.click(screen.getByRole('button', {name: /next/i}));

  //     userEvent.click(await screen.findByTestId('correct-answer'));
  //     userEvent.click(screen.getByRole('button', {name: /next/i}));

  //     // expect(history.location.pathname).toBe('/feedback');
  // });
});