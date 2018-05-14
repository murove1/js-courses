import { authTypes } from './';

const defaultState = {
  signedIn: false,
  isSigningUp: false,
  isSignUpError: null,
  isSigningIn: false,
  isSignInError: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case authTypes.SIGN_IN_START:
      return { ...state, isSigningIn: true };
    case authTypes.SIGN_IN_SUCCESS:
      return { ...state, isSigningIn: false, signedIn: true };
    case authTypes.SIGN_IN_ERROR:
      return {
        ...state,
        isSigningIn: false,
        isSignInError: action.payload.message
      };
    case authTypes.SIGN_UP_START:
      return { ...state, isSigningUp: true };
    case authTypes.SIGN_UP_SUCCESS:
      return { ...state, isSigningUp: false, signedIn: true };
    case authTypes.SIGN_UP_ERROR:
      return {
        ...state,
        isSigningUp: false,
        isSignUpError: action.payload.message
      };
    default:
      return state;
  }
};
