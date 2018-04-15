import { questionsTypes } from './';

const getQuestions = questions => ({
  type: questionsTypes.GET_QUESTIONS,
  payload: {
    questions
  }
});

const getMoreQuestions = () => ({
  type: questionsTypes.GET_MORE_QUESTIONS
});

export default { getQuestions, getMoreQuestions };
