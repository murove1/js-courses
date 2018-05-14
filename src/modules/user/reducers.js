import { userTypes } from './';

const defaultState = null;

// export default (state = defaultState, action) => {
//   switch (action.type) {
//     case userTypes.SIGN_IN:
//       return action.value;
//     case userTypes.SIGN_OUT:
//       return defaultState;
//     default:
//       return state;
//   }
// };

export default (state = defaultState, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return action.payload;
    case userTypes.UNSET_USER:
      return defaultState;
    default:
      return state;
  }
};