import T from 'prop-types';
import { connect } from 'react-redux';
import { compose, getContext, withProps } from 'recompose';
import TopNavComponent from './Component';
import { authOperations } from '../../modules/auth';

const MENU_ITEMS = {
  DEFAULT: [
    { label: 'Wrong URL', to: '/wrong-url' },
    { label: 'Google', to: 'https://google.com', target: '_blank' },
  ],
  LOGGED_OUT: [
    { label: 'Sign In', to: '/signin' },
    { label: 'Sign Up', to: '/signup' },
  ],
};


const getItemsForUser = ({ signOut, user }) => [
  { label: `Hello, ${user.profile.fullName}`, to: '' },
  { label: 'Sing Out', to: '', onClick: () => signOut() },
];


const generateList = props => [].concat(
  MENU_ITEMS.DEFAULT,
  props.user ? getItemsForUser(props) : MENU_ITEMS.LOGGED_OUT
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  signOut: authOperations.signOut
};

export default compose(
  getContext({
    user: T.object,
    signOut: T.func,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    list: generateList(props),
  })),
)(TopNavComponent)
