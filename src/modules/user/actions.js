import { userTypes } from './';

// const signIn = user => ({
//   type: userTypes.SIGN_IN,
//   value: user
// });

// const signUp = user => ({
//   type: userTypes.SIGN_UP,
//   value: user
// });

// const signOut = user => ({
//   type: userTypes.SIGN_OUT
// });

const setUser = user => ({
  type: userTypes.SET_USER,
  payload: user
});

const unsetUser = () => ({
  type: userTypes.UNSET_USER,
});

// export default { signIn, signUp, signOut };
export default { setUser, unsetUser };