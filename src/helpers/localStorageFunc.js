export function saveTokenToLocalStorage(gameToken) {
  localStorage.setItem('token', gameToken);
}

export function getTokenLocalStorage() {
  return localStorage.getItem('token');
}

export function removeTokenLocalStorage() {
  return localStorage.removeItem('token');
}
