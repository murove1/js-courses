import { connect } from 'react-redux';
import { searchActions } from '../../modules/search';
import { sortActions } from '../../modules/sort';
import Component from './Component';

const mapStateToProps = state => ({
  user: state.user,
  search: state.search,
  sortBy: state.sort,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchValue: value => dispatch(searchActions.setSearch(value)),
  clearSearchValue: () => dispatch(searchActions.clearSearch()),
  setSorting: e => dispatch(sortActions.setSort(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);