import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback'
import App from '../App';

const stateDefault={
    player:{
        name:'',
        gravatarEmail:'',
        score:0,
        assertions:0,
    }
}
const stateVersionOne = {
    player:{
        name:'Ronaldinho Gaúcho',
        gravatarEmail:'ronaldinho@bruxo.com',
        score:8001,
        assertions:5,
    }
}

const stateVersionTwo = {
    player:{
        name:'Vinicius Júnior',
        gravatarEmail:'vinicim@bruxo.com',
        score:500,
        assertions:2,
    }
    
}

describe('Testa as funcionalidades da tela de feedback', () =>{
    it('Testa se a página de feedback e renderizada no endpoint "/feedback"',() =>{
        const {history} = renderWithRouterAndRedux(<App/>,stateDefault,"/feedback");
        const {location:{pathname}} = history

        expect(pathname).toBe('/feedback');
        expect(pathname).not.toBe('/');
        expect(pathname).not.toBe('/game');
    });
     it('Verifica se a página possui elementos header',() =>{
        renderWithRouterAndRedux(<Feedback />,stateVersionOne);
        const headerImg = screen.getByRole('img'); // chave name que vai estar no redux.
        const headerName= screen.getByRole('heading',{level:3,name:/Ronaldinho Gaúcho/i}); // chave name que vai no redux
        const headerScore= screen.getByRole('heading',{level:3,name:"8001"});
        
        expect(headerImg).toBeInTheDocument();
        expect(headerImg.alt).toBe('Ronaldinho Gaúcho');
        expect(headerName).toBeInTheDocument();
        expect(headerScore).toBeInTheDocument();       
    });     
     it('Verifica se tem um título "Feedback Page"',()=>{
        const {debug} = renderWithRouterAndRedux(<Feedback />);
        const feedbackTitle =screen.getByRole('heading',{level:2,name:/feedback page/i});
        expect(feedbackTitle).toBeInTheDocument();
        expect(feedbackTitle.innerHTML).not.toBe('game page');
    });

     it('Verifica se a mensagem é "Well Done!"quando o socre e igual ou maior que 3 ',()=>{
        const {debug} = renderWithRouterAndRedux(<Feedback />,stateVersionOne);
        const feedbackMessage = screen.getByText("Well Done!");
        expect(feedbackMessage).toBeInTheDocument();
    }); 

    it('Verifica se a mensagem é "Could be better..." quando o assertions é menor que 3',()=>{
        const {debug} = renderWithRouterAndRedux(<Feedback />,stateVersionTwo);
        const feedbackMessage = screen.getByText("Could be better...");
        expect(feedbackMessage).toBeInTheDocument();
        
    });

    it('Verifica se existe o botão "Play Again" ',()=>{
        const {debug}=renderWithRouterAndRedux(<Feedback />);
        const playAgainButton =screen.getByRole('button',{name:/Play Again/i});
        expect(playAgainButton).toBeInTheDocument();
    });

    it('Verifica se ao clicar no botão "Play Again" a página e redirecionada para "/"',() =>{
        const {debug,history}=renderWithRouterAndRedux(<App />,stateDefault,"/feedback");
        const playAgainButton =screen.getByRole('button',{name:/Play Again/i});
        expect(playAgainButton).toBeInTheDocument();
        userEvent.click(playAgainButton);
        expect(history.location.pathname).toBe("/");
    })

    it('Verifica se existe o botão "Ranking" ',()=>{
        const {debug}=renderWithRouterAndRedux(<Feedback />);
        const rankingButton =screen.getByRole('button',{name:/Ranking/i});
        expect(rankingButton).toBeInTheDocument();
    }); 
    
      it('Verifica se ao clicar botão "Ranking" a página e redirecionada para "/ranking" ',async()=>{
         const {debug,history}=renderWithRouterAndRedux(<App />,stateVersionOne,"/feedback");
        const rankingButton =screen.getByRole('button',{name:/Ranking/i});
        expect(rankingButton).toBeInTheDocument();
       
         userEvent.click(rankingButton);
        // mockLocalStorage.localStorage.getItem('ranking');
        await waitFor(() => {
            expect(history.location.pathname).toBe('/ranking');
          });
    }) 
})