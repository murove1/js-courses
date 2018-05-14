import { compose, withHandlers, branch, renderComponent } from 'recompose';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { authOperations } from '../../modules/auth';
import { withInputs } from 'custom-hoc';
import Component from './Component';
import AppLoader from '../Loaders/AppLoader';

const mapStateToProps = state => ({
  isLoading: state.auth.isSigningUp,
  isSignUpError: state.auth.isSignUpError
});

const mapDispatchToProps = {
  signUp: authOperations.signUp
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),

  withInputs({
    username: { validate: value => value.length < 20 && value.length > 3 },
    email: { validate: value => value.length < 25 && value.length > 6 },
    password: { validate: value => value.length < 20 && value.length > 5 }
  }),

  branch(({ isLoading }) => isLoading, renderComponent(AppLoader)),

  withHandlers({
    onSubmit: props => () => {
      props.signUp(R.pick(['username', 'email', 'password', 'history'], props));
    }
  })
);

export default enhance(Component);
