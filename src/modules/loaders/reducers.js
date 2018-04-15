import { loadersTypes } from './';

const defaultState = {
  FETCHING_QUESTIONS: false,
  GET_MORE_QUESTIONS: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case loadersTypes.SWITCH_LOADER:
      return {
        ...state,
        [action.name]: action.value
      };

    default:
      return state;
  }
};
