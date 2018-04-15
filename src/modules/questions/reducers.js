import { questionsTypes } from './';

const defaultState = {
  count: 10,
  values: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case questionsTypes.GET_QUESTIONS:
      return {
        ...state,
        values: action.payload.questions
      };

    case questionsTypes.GET_MORE_QUESTIONS:
      return {
        ...state,
        count: state.count + 10
      };

    default:
      return state;
  }
};
