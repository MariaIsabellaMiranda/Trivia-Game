import React from 'react';
import propTypes from 'prop-types';
import '../style/Game.css';
import {
  getTokenLocalStorage,
  removeTokenLocalStorage,
} from '../helpers/localStorageFunc';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      questionsAlternatives: [],
      code: '',
      questionResults: [],
      classNames: ['', ''],
    };
  }

  async componentDidMount() {
    const number05 = 0.5;
    const number1 = -1;
    const token = getTokenLocalStorage();
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const result = await response.json();
      this.setState({
        code: result.response_code,
        questionResults: result.results,
        questionsAlternatives: result.results
          .map(({ correct_answer: correct, incorrect_answers: incorrect }) => ([
            ...incorrect, correct,
          ].sort(() => ((Math.random() > number05) ? 1 : number1)))),
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleTokenInvalid = () => {
    const { history } = this.props;
    removeTokenLocalStorage();
    history.push('/');
  }

  handleClick = () => {
    this.changeButtonColor();
  }

  changeButtonColor = () => {
    this.setState({
      classNames: ['correct', 'wrong'],
    });
  }

  // nextQuestion = () => {
  //   const { indexQuestion } = this.state;
  //   const { question } = this.props;
  //   const { results } = question;
  //   if (indexQuestion !== results.length - 1) {
  //     this.setState((prevState) => ({
  //       indexQuestion: prevState.indexQuestion + 1,
  //     }));
  //   } else {
  //     history.push('/feedback');
  //   }
  // }

  render() {
    const {
      indexQuestion,
      questionsAlternatives,
      code, questionResults,
      classNames } = this.state;
    const number3 = 3;
    return (
      <>
        <Header />
        <div>
          { code === number3 ? (
            this.handleTokenInvalid()
          )
            : (
              <div>
                {questionResults.length > 0 && (
                  <div>
                    <h2
                      data-testid="question-category"
                    >
                      {questionResults[indexQuestion].category}

                    </h2>
                    <h3
                      data-testid="question-text"
                    >
                      {questionResults[indexQuestion].question}

                    </h3>
                    <section data-testid="answer-options">
                      { questionsAlternatives[indexQuestion].map((answers, index) => (
                        <button
                          className={
                            answers === questionResults[indexQuestion].correct_answer
                              ? classNames[0] : classNames[1]
                          }
                          type="button"
                          onClick={ this.handleClick }
                          data-testid={
                            answers === questionResults[indexQuestion].correct_answer
                              ? 'correct-answer' : `wrong-answer-${index}`
                          }
                          key={ index }
                        >
                          {answers}
                        </button>)) }

                    </section>
                  </div>
                )}
              </div>
            )}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Game;
