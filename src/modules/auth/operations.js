import { authActions } from './';
import { userActions } from '../user';
import Api from '../../api';

const signUp = ({ username, password, email, history }) => async dispatch => {
  try {
    dispatch(authActions.signUpStart());

    const res = await Api.signUp(username, password, email);

    localStorage.setItem('token', res.data.token);
    dispatch(authActions.signUpSuccess());
    dispatch(userActions.setUser(res.data.user));
    history.push('/');
  } catch (error) {
    dispatch(authActions.signUpError({ message: error.response.data.message }));
  }
};

const signIn = ({ email, password, history }) => async dispatch => {
  try {
    dispatch(authActions.signInStart());

    const res = await Api.signIn(email, password);

    localStorage.setItem('token', res.data.token);
    dispatch(authActions.signInSuccess());
    dispatch(userActions.setUser(res.data.user));
    history.push('/');
  } catch (error) {
    dispatch(authActions.signInError({ message: error.response.data.message }));
  }
};

const signOut = () => async dispatch => {
  localStorage.clear();
  dispatch(userActions.unsetUser());
};

export default {
  signUp,
  signIn,
  signOut
};
