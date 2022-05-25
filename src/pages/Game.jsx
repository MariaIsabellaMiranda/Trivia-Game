import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  getTokenLocalStorage,
  removeTokenLocalStorage,
} from '../helpers/localStorageFunc';
import { getQuestions } from '../Redux/Actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
    };
  }

  componentDidMount() {
    const { fetchApiQuestions } = this.props;
    const token = getTokenLocalStorage();
    console.log(token);
    fetchApiQuestions(token);
  }

  handleTokenInvalid = () => {
    const { history } = this.props;
    removeTokenLocalStorage();
    history.push('/');
  }

  updateQuestion = () => {
    const { indexQuestion } = this.state;
    const { question } = this.props;
    const { results } = question;
    if (indexQuestion !== results.length - 1) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
      }));
    } else {
      this.setState({ indexQuestion: 0 });
    }
  }

  render() {
    const { indexQuestion } = this.state;
    const { question } = this.props;
    const { results } = question;
    const number3 = 3;
    return (
      <div>
        { question.response_code === number3 ? (
          this.handleTokenInvalid()
        )
          : (
            <div>
              {results && (
                <div>
                  <h2
                    data-testid="question-category"
                  >
                    {results[indexQuestion].category}

                  </h2>
                  <h3 data-testid="question-text">{results[indexQuestion].question}</h3>
                  <section data-testid="answer-options">
                    <button
                      type="button"
                      data-testid="correct-answer"
                      onClick={ this.updateQuestion }
                    >
                      {results[indexQuestion].correct_answer}

                    </button>
                    { results[indexQuestion].incorrect_answers
                      .map((answers, index) => (
                        <button
                          type="button"
                          data-testid={ `wrong-answer-${index}` }
                          key={ index }
                          onClick={ this.updateQuestion }
                        >
                          {answers}
                        </button>)) }

                  </section>
                </div>
              )}
            </div>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  fetchApiQuestions: propTypes.func.isRequired,
  question: propTypes.shape().isRequired,
  history: propTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  question: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiQuestions: (token) => dispatch(getQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
