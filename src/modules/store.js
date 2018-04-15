import { createStore, applyMiddleware } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './';

const store = createStore(
  reducer,
  undefined,
  composeWithDevTools(autoRehydrate(), applyMiddleware(thunk))
);

persistStore(store, { whitelist: ['user'] });

export default store;
