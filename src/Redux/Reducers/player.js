import { SAVE_LOGIN_INFO, UPDATE_ASSERTIONS, UPDATE_SCORE } from '../Actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case SAVE_LOGIN_INFO:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  case UPDATE_SCORE:
    return { ...state, score: (state.score + action.payload) };
  default:
    return state;
  }
};

export default player;
