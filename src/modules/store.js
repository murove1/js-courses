import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './';

const store = createStore(
  reducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunk), autoRehydrate())
);

persistStore(store, { whitelist: ['user'] });

export default store;
