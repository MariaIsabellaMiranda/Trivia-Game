import React from 'react';
import propTypes from 'prop-types';
// import player from '../Redux/Reducers/player';

class Ranking extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     rankingPlayers: [],
  //     sorted: true,
  //   };
  // }

  renderQualquer = (play) => {
    const moveLeft = -1;
    const moveRight = 1;
    play.sort((a, b) => {
      if (Number(a.score) > Number(b.score)) {
        return moveLeft;
      } if (Number(a.score) < Number(b.score)) {
        return moveRight;
      }
      return 0;
    });
    return play;
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.renderQualquer(players);
    // const { rankingPlayers, sorted } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {
          players.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <h4 data-testid={ `player-name-${index}` }>{name}</h4>
              <h4 data-testid={ `player-score-${index}` }>{score}</h4>
              <img src={ picture } alt={ name } />
            </div>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectToLogin }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Ranking;
