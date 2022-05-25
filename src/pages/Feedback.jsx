import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <h2>Feedback Page</h2>
        {
          assertions.length >= MIN_ASSERTIONS ? (
            <p data-testid="feedback-text">Well Done!</p>
          ) : (
            <p data-testid="feedback-text">Could be better...</p>
          )
        }
        <h4>Placar Final</h4>
        <p data-testid="feedback-total-score">{score}</p>
        <h4>Acertos</h4>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToLogin }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  history: propTypes.shape().isRequired,
  score: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
