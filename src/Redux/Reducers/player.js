const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  questions: {},
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_QUESTIONS':
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default player;
