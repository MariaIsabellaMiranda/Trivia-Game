import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../style/Game.css';
import {
  getTokenLocalStorage,
  removeTokenLocalStorage,
  saveRankingToLocalStorage,
} from '../helpers/localStorageFunc';
import Header from '../components/Header';
import { updateAssertions, updateScore } from '../Redux/Actions';

const basicBtn = 'basic-button';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      questionsAlternatives: [],
      code: '',
      questionResults: [],
      classNames: [basicBtn, basicBtn],
      isDisabled: false,
      timer: 30,
      timeRanOut: false,
      renderButtonNext: false,
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
    this.timer();
  }

  handleTokenInvalid = () => {
    const { history } = this.props;
    removeTokenLocalStorage();
    history.push('/');
  }

  timerFunction = () => {
    this.setState((prevState) => {
      if (prevState.timer === 0) {
        return ({ isDisabled: true, timeRanOut: true });
      }
      return ({ timer: prevState.timer - 1 });
    });
  }

  timer = () => {
    const oneSec = 1000;
    const gameTimer = setInterval(this.timerFunction, oneSec);
    this.setState({ intervalID: gameTimer });
  }

  stopTimer = () => {
    const { intervalID } = this.state;
    clearInterval(intervalID);
  }

  scoreCalculator=(difficulty) => {
    const extra = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const { timer } = this.state;
    const { scoreUp } = this.props;
    let score = 0;
    if (difficulty === 'hard') {
      score = timer * hard + extra;
    } else if (difficulty === 'medium') {
      score = timer * medium + extra;
    } else {
      score = timer * easy + extra;
    }
    scoreUp(score);
  }

  handleClick = ({ target }) => {
    this.changeButtonColor();
    this.rightAnswer(target);
    this.stopTimer();
    this.setState({ renderButtonNext: true });
  }

  rightAnswer = (target) => {
    const { assertionUp } = this.props;
    if (target.getAttribute('data-testid') === 'correct-answer') {
      assertionUp();
      this.stopTimer();
      const { questionResults, indexQuestion } = this.state;
      this.scoreCalculator(questionResults[indexQuestion].difficulty);
    }
    this.setState({ isDisabled: true });
  }

  changeButtonColor = () => {
    this.setState({
      classNames: ['correct', 'wrong'],
    });
  }

  nextQuestion = () => {
    const { indexQuestion, questionResults } = this.state;
    const { history } = this.props;
    if (indexQuestion !== questionResults.length - 1) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
        renderButtonNext: false,
        classNames: [basicBtn, basicBtn],
        isDisabled: false,
        timer: 30,
      }));
      this.timer();
    } else {
      const { name, score, email } = this.props;
      const hash = md5(email).toString();
      const url = `https://www.gravatar.com/avatar/${hash}`;
      const playerObject = {
        index: 0,
        name,
        score,
        picture: url,
      };
      saveRankingToLocalStorage(playerObject);
      history.push('/feedback');
    }
  }

  render() {
    const {
      indexQuestion, questionsAlternatives, code, questionResults, classNames,
      isDisabled, timer, timeRanOut, renderButtonNext,
    } = this.state;
    const number3 = 3;
    return (
      <>
        <Header />
        { timeRanOut && this.stopTimer() }
        <div className="game-background">
          { code === number3 ? (
            this.handleTokenInvalid()
          )
            : (
              <div>
                {questionResults.length > 0 && (
                  <div className="game-container">
                    <div data-testid="timer" className="timer-clock">{ timer }</div>
                    <div className="question-info">
                      <h2
                        data-testid="question-category"
                        className="qtn-category"
                      >
                        {questionResults[indexQuestion].category}

                      </h2>
                      <h3
                        data-testid="question-text"
                        className="qtn-text"
                      >
                        {questionResults[indexQuestion].question}

                      </h3>
                    </div>
                    <section
                      data-testid="answer-options"
                      className="game-button-container"
                    >
                      { questionsAlternatives[indexQuestion].map((answers, index) => (
                        <button
                          className={
                            answers === questionResults[indexQuestion].correct_answer
                              ? classNames[0] : classNames[1]
                          }
                          type="button"
                          disabled={ isDisabled }
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
                    {renderButtonNext
                          && (
                            <button
                              type="button"
                              data-testid="btn-next"
                              className="next-button"
                              onClick={ this.nextQuestion }
                            >
                              Next

                            </button>
                          )}
                  </div>
                )}
              </div>
            )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  assertionUp: () => dispatch(updateAssertions()),
  scoreUp: (score) => dispatch(updateScore(score)),
});

Game.propTypes = {
  history: propTypes.shape().isRequired,
  assertionUp: propTypes.func.isRequired,
  scoreUp: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
