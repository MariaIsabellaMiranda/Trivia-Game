import React from 'react';
import { connect } from 'react-redux';
import player from '../Redux/Reducers/player';

class Game extends React.Component {
  render() {
    const { question } = this.props;
    const { response_code, results } = questions;
    return (
    <div>
      <h2>{ question.}</h2>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.player.question,
});

export default connect(mapStateToProps)(Game);
