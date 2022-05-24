export const changeQuestions = (questions) => ({
  type: 'CHANGE_QUESTIONS',
  questions,
});

export const getQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    dispatch(changeQuestions(result));
  } catch (e) {
    console.error(e);
  }
};
