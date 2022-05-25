import { SAVE_LOGIN_INFO } from '../Actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_INFO:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  default:
    return state;
  }
};

export default player;
