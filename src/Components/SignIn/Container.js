import { compose, withHandlers, branch, renderComponent } from 'recompose';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withInputs } from 'custom-hoc';
import { authOperations } from '../../modules/auth';
import Component from './Component';
import AppLoader from '../Loaders/AppLoader';

const mapStateToProps = state => ({
  isLoading: state.auth.isSigningIn,
  isSignInError: state.auth.isSignInError
});

const mapDispatchToProps = {
  signIn: authOperations.signIn
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),

  withInputs({
    email: { validate: value => value.length < 20 && value.length > 3 },
    password: { validate: value => value.length < 20 && value.length > 5 }
  }),

  branch(({ isLoading }) => isLoading, renderComponent(AppLoader)),

  withHandlers({
    onSubmit: props => () => {
      props.signIn(R.pick(['email', 'password', 'history'], props));
    }
  })
);

export default enhance(Component);
