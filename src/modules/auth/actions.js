import { authTypes } from './';

const signInStart = () => ({
  type: authTypes.SIGN_IN_START
});

const signInSuccess = () => ({
  type: authTypes.SIGN_IN_SUCCESS
});

const signInError = ({ message }) => ({
  type: authTypes.SIGN_IN_ERROR,
  payload: {
    message
  }
});

const signUpStart = () => ({
  type: authTypes.SIGN_UP_START
});

const signUpSuccess = () => ({
  type: authTypes.SIGN_UP_SUCCESS
});

const signUpError = ({ message }) => ({
  type: authTypes.SIGN_UP_ERROR,
  payload: {
    message
  }
});

const signOut = () => ({
  type: authTypes.SIGN_OUT
});

export default {
  signInStart,
  signInSuccess,
  signInError,
  signUpStart,
  signUpSuccess,
  signUpError,
  signOut
};
