export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';

export const saveLoginInfo = (name, email) => ({ type: SAVE_LOGIN_INFO,
  payload: {
    name, email } });

export const updateAssertions = () => (
  { type: UPDATE_ASSERTIONS });
