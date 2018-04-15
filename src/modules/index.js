import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import sort from './sort';
import answerSort from './answerSort';
import questions from './questions';
import loaders from './loaders';

export default combineReducers({
  user,
  search,
  sort,
  answerSort,
  questions,
  loaders
});
