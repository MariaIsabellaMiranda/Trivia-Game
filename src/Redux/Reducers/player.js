const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  responseCode: 0,
  questionResults: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_QUESTIONS':
    return {
      ...state,
      responseCode: action.code,
      questionResults: action.results,
    };
  default:
    return state;
  }
};

export default player;
