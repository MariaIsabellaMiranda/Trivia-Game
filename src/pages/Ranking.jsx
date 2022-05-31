import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { restoreStore } from '../Redux/Actions';
import '../style/Ranking.css';

class Ranking extends React.Component {
  sortRanking = (play) => {
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
  }

  redirectToLogin = () => {
    const { history, restoreStoreForNewGame } = this.props;
    restoreStoreForNewGame();
    history.push('/');
  }

  render() {
    const players = JSON.parse(localStorage.getItem('ranking')) || [];
    this.sortRanking(players);
    return (
      <div>
        <div className="container-ranking">
          <h2 data-testid="ranking-title">Ranking</h2>
          <div className="content-ranking">
            {
              players.map(({ name, score, picture }, index) => (
                <div key={ index } className="player">
                  <img src={ picture } alt={ name } />
                  <h4 data-testid={ `player-name-${index}` }>{name}</h4>
                  <div className="ranking-div-player">
                    <h5>Score:</h5>
                    <h4 data-testid={ `player-score-${index}` }>{score}</h4>
                  </div>
                </div>
              ))
            }
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.redirectToLogin }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  restoreStoreForNewGame: () => dispatch(restoreStore()),
});

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
  restoreStoreForNewGame: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
