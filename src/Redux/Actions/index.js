export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESTORE_STORE = 'RESTORE_STORE';

export const saveLoginInfo = (name, email) => ({ type: SAVE_LOGIN_INFO,
  payload: {
    name, email } });

export const updateAssertions = () => (
  { type: UPDATE_ASSERTIONS });

export const updateScore = (payload) => (
  { type: UPDATE_SCORE, payload });

export const restoreStore = () => (
  { type: RESTORE_STORE });
