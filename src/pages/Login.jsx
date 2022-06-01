import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTokenToLocalStorage } from '../helpers/localStorageFunc';
import { saveLoginInfo } from '../Redux/Actions';
import '../style/Login.css';
import logo from './trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      mail: '',
    };
  }

  getGameTokenAndRedicect = async () => {
    const { history } = this.props;
    const APIResult = await fetch('https://opentdb.com/api_token.php?command=request');
    const ApiData = await APIResult.json();
    saveTokenToLocalStorage(ApiData.token);
    history.push('/game');
  }

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  validateButton = () => {
    const { name, mail } = this.state;
    return !(name.length !== 0 && mail.length !== 0);
  }

  render() {
    const { name, mail } = this.state;
    const { history, savePlayerInfo } = this.props;
    return (
      <section className="login-main-box">
        <section className="login-box">
          <img src={ logo } alt="logo trivia" />
          <label htmlFor="name">
            Nome
            <input
              id="name"
              className="login-input-name"
              type="text"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="mail">
            Email
            <input
              id="mail"
              className="login-input-email"
              type="email"
              value={ mail }
              data-testid="input-gravatar-email"
              onChange={ this.handleInputChange }
            />
          </label>
          <div className="login-button-box">
            <button
              type="button"
              className="login-play-button"
              data-testid="btn-play"
              disabled={ this.validateButton() }
              onClick={ () => {
                this.getGameTokenAndRedicect();
                savePlayerInfo(name, mail);
              } }
            >
              Play

            </button>
            <button
              type="button"
              className="login-settings-button"
              data-testid="btn-settings"
              onClick={ () => { history.push('/settings'); } }
            >
              Settings
            </button>
          </div>
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePlayerInfo: (name, email) => dispatch(saveLoginInfo(name, email)),
});

Login.propTypes = {
  history: propTypes.shape().isRequired,
  savePlayerInfo: propTypes.func.isRequired,
};

// export default Login;
export default connect(null, mapDispatchToProps)(Login);
