import React from 'react';
import styled from 'styled-components';
import Button from '../Buttons/Button/index';
import QuestionItem from '../QuestionItem/Component';
import StyledHeader from '../Common/StyledHeader';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LoadingText = styled.h1`
  font-size: 18px;
  text-align: center;
`;

const QuestionList = ({ questions, onLoadMore, isLoading }) => (
  <React.Fragment>
    <StyledHeader>Users ask: ({questions.length})</StyledHeader>

    <List>
      {questions.length > 0 ? (
        questions.map(question => (
          <QuestionItem key={question._id} question={question} />
        ))
      ) : (
        <li>No items found</li>
      )}
    </List>

    {isLoading ? (
      <LoadingText>Loading ...</LoadingText>
    ) : (
      <Button onClick={onLoadMore}>More</Button>
    )}
  </React.Fragment>
);

export default QuestionList;
