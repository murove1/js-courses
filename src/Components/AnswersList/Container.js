import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
  withProps
} from 'recompose';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../../utils';

import AppLoader from '../Loaders/AppLoader';
import Component from './Component';

const sortWith = sortParams => R.sortWith([R.descend(sortParams)]);

const divideVotes = R.pipe(
  R.groupBy(R.prop('answerId')),
  R.mapObjIndexed(
    R.pipe(
      R.groupBy(
        R.ifElse(
          R.prop('isPositive'),
          R.always('positive'),
          R.always('negative')
        )
      ),
      R.mapObjIndexed(R.length)
    )
  )
);

const prepareAnswers = ({ answers, votes, sortBy }) => {
  const vote = divideVotes(votes);

  switch (sortBy) {
    case 'best':
      return sortWith(({ _id }) => (vote[_id] && vote[_id].positive) || 0)(
        answers
      );

    case 'worst':
      return sortWith(({ _id }) => (vote[_id] && vote[_id].negative) || 0)(
        answers
      );

    default:
      return sortWith(R.prop(sortBy))(answers);
  }
};

const mapStateToProps = state => ({
  user: state.user,
  sortBy: state.answerSort
});

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers({ answers: [], users: [], votes: [], isFetching: true }),

  withRouter,

  lifecycle({
    componentWillMount() {
      this.interval = db.pooling(async () => {
        const questionId = this.props.match.params.questionId;

        let answers = await db.answers.find();
        answers = answers.filter(answer => answer.questionId === questionId);

        let votes = await db.votes.find();
        const answerIds = answers.map(a => a._id);
        votes = votes.filter(vote => answerIds.includes(vote.answerId));

        const users = await db.users.find();

        this.setState({ answers, votes, users, isFetching: false });
      });
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  }),

  branch(({ isFetching }) => isFetching, renderComponent(AppLoader)),

  withProps(props => ({ answers: prepareAnswers(props) })),

  withHandlers({
    onVote: ({ user }) => (answerId, isPositive) => {
      if (user) {
        db.votes.insert({
          answerId,
          isPositive,
          createdAt: new Date(),
          createdById: user._id
        });
      }
    }
  })
);

export default enhance(Component);
