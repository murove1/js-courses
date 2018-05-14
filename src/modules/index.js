import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import sort from './sort';
import answerSort from './answerSort';
import loader from './loader';
import auth from './auth';

export default combineReducers({
  user,
  search,
  sort,
  answerSort,
  loader,
  auth
});
