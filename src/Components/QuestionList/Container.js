import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  withProps,
  withHandlers
} from 'recompose';
import * as R from 'ramda';

import AppLoader from '../Loaders/AppLoader';
import Component from './Component';
import { questionsOperations } from '../../modules/questions';

const matchBy = R.curry((search, string) =>
  new RegExp(`${search}`, 'gi').test(string)
);

const filterByTitle = search =>
  R.filter(R.compose(matchBy(search), R.prop('title')));

const DIRECTION = {
  title: R.ascend,
  createdAt: R.descend
};

const sortWith = sortBy => R.sortWith([DIRECTION[sortBy](R.prop(sortBy))]);

const prepareQuestions = ({ questions, search, count, sortBy }) =>
  R.compose(
    R.take(count),
    sortWith(sortBy),
    filterByTitle(search.replace(/[\\[\]<>+{}]/g, ''))
  )(questions);

const mapStateToProps = state => ({
  search: state.search,
  sortBy: state.sort,
  questions: state.questions.values,
  count: state.questions.count,
  isFetching: state.loaders.FETCHING_QUESTIONS,
  isLoading: state.loaders.GET_MORE_QUESTIONS
});

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    onLoadMore: ({ count, dispatch }) => () => {
      dispatch(questionsOperations.getMoreQuestions());
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.dispatch(questionsOperations.fetchQuestions());
    }
  }),
  branch(({ isFetching }) => isFetching, renderComponent(AppLoader)),
  withProps(props => ({ questions: prepareQuestions(props) }))
);

export default enhance(Component);

// WITHOUT RECOMPOSE
// export default connect(state => ({ search: state.search }))(Component)
