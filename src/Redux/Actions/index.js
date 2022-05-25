export const changeQuestions = (code, results) => ({
  type: 'CHANGE_QUESTIONS',
  code,
  results,
});

export const getQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    dispatch(changeQuestions(result.response_code, result.results));
  } catch (e) {
    console.error(e);
  }
};
