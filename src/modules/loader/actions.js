import { questionTypes } from './';
import { db } from '../../utils';

const setLoader = (name, value) => ({
  type: questionTypes.SET_LOADER,
  name,
  value
});

const createQuestion = (document, history) => dispatch => {
  dispatch(setLoader(questionTypes.CREATE_QUESTION, true));

  setTimeout(() => {
    // emulating server work
    db.questions.insert(document);
    history.push('/');
    dispatch(setLoader(questionTypes.CREATE_QUESTION, false));
  }, 1000);
};

export default { setLoader, createQuestion };
