export function saveTokenToLocalStorage(gameToken) {
  localStorage.setItem('token', gameToken);
}

export function getTokenLocalStorage() {
  return localStorage.getItem('token');
}

export function removeTokenLocalStorage() {
  return localStorage.removeItem('token');
}

export function saveRankingToLocalStorage(player) {
  const oldValue = JSON.parse(localStorage.getItem('ranking'));
  if (!oldValue) {
    localStorage.setItem('ranking', JSON.stringify([player]));
  } else {
    localStorage.setItem('ranking', JSON.stringify([...oldValue, player]));
  }
}
