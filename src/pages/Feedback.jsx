import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
