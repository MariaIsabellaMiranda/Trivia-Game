import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../style/Header.css';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div className="header">
        <div className="first-sector">
          <img
            className="player-avatar"
            data-testid="header-profile-picture"
            src={ url }
            alt={ name }
          />
          <div className="player-info">
            <span className="fake-labels">Player:</span>
            <h3 className="name-and-score" data-testid="header-player-name">{ name }</h3>
          </div>
        </div>
        <div className="player-info">
          <span className="fake-labels">Score:</span>
          <h3 className="name-and-score" data-testid="header-score">{ score }</h3>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Header);
