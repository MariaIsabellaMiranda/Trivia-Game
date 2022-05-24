import React from 'react';
// import logo from './trivia.png';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <div>App</div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </>
    );
  }
}

export default App;
