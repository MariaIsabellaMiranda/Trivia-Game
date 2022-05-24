import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src="" alt="" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});
Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, null)(Header);
