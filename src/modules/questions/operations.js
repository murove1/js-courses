import { questionsActions } from './';
import { loadersActions } from '../loaders';
import { db } from '../../utils';

const fetchQuestions = () => {
  return async dispatch => {
    try {
      dispatch(loadersActions.switchLoader('FETCHING_QUESTIONS', true));

      const questions = await db.questions.find();

      dispatch(questionsActions.getQuestions(questions));

      dispatch(loadersActions.switchLoader('FETCHING_QUESTIONS', false));
    } catch (error) {
      dispatch(loadersActions.switchLoader('FETCHING_QUESTIONS', false));
      console.log(error);
    }
  };
};

const getMoreQuestions = () => {
  return dispatch => {
    dispatch(loadersActions.switchLoader('GET_MORE_QUESTIONS', true));

    dispatch(questionsActions.getMoreQuestions());

    dispatch(loadersActions.switchLoader('GET_MORE_QUESTIONS', false));
  };
};

export default { fetchQuestions, getMoreQuestions };
