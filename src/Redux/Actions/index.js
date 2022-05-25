export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';

export const saveLoginInfo = (name, email) => ({ type: SAVE_LOGIN_INFO,
  payload: {
    name, email } });
