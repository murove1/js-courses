import React from 'react';
import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  withStateHandlers
} from 'recompose';
import { Redirect, withRouter } from 'react-router';
import { db } from '../../utils';
import AppLoader from '../Loaders/AppLoader';
import Component from './Component';
import { answerSortActions } from '../../modules/answerSort';

const mapDispatchToProps = dispatch => ({
  setAnswerSorting: ({ target: { value } }) => {
    dispatch(answerSortActions.setAnswerSort(value));
  }
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  withStateHandlers({ question: {}, author: {}, isFetching: true }),

  withRouter,

  branch(
    ({ match }) => match.params.questionId,
    lifecycle({
      async componentWillMount() {
        const questionId = this.props.match.params.questionId;

        const question = await db.questions.findOne(questionId);
        let author;
        if (question) {
          author = await db.users.findOne(question.createdById);
        }

        this.setState({ question, author, isFetching: false });
      }
    })
  ),

  branch(({ isFetching }) => isFetching, renderComponent(AppLoader)),
  branch(
    ({ question }) => !question,
    renderComponent(() => <Redirect to="/not-found" />)
  )
);

export default enhance(Component);
