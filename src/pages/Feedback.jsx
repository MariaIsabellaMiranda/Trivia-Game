import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../style/Feedback.css';

import { restoreStore } from '../Redux/Actions';

class Feedback extends React.Component {
  redirectToLogin = () => {
    const { history, scoreRestore } = this.props;
    scoreRestore();
    history.push('/');
  }

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <div className="feedback-container">
          <h2>Feedback</h2>
          {
            assertions >= MIN_ASSERTIONS ? (
              <p data-testid="feedback-text" className="feedback-text">Well Done!</p>
            ) : (
              <p
                data-testid="feedback-text"
                className="feedback-text"
              >
                Could be better...

              </p>
            )
          }
          <div className="result-container">
            <div className="placar">
              <h4>Score</h4>
              <p data-testid="feedback-total-score">{score}</p>
            </div>
            <div className="assertions">
              <h4>Assertions</h4>
              <p data-testid="feedback-total-question">{assertions}</p>
            </div>
          </div>
          <div className="button-container">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.redirectToLogin }
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.redirectToRanking }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  history: propTypes.shape().isRequired,
  score: propTypes.number.isRequired,
  scoreRestore: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  scoreRestore: () => dispatch(restoreStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
