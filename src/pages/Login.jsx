import React from 'react';
import Header from '../components/Header';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      mail: '',
    };
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
    return (
      <section>
        <Header />
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
        >
          Play

        </button>
      </section>
    );
  }
}

export default Login;
