import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTokenToLocalStorage } from '../helpers/localStorageFunc';
import { saveLoginInfo } from '../Redux/Actions';

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
      <section>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="mail">
          <input
            id="mail"
            type="email"
            value={ mail }
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
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
          data-testid="btn-settings"
          onClick={ () => { history.push('/settings'); } }
        >
          Settings
        </button>
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
