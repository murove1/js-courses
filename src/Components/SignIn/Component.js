import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import FormWrapper from '../FormWrapper/Component';
import Form from '../Form/Component';
import StyledHeader from '../Common/StyledHeader';
import TextInput from '../TextInput/Component';
import Button from '../Buttons/Button/index';

const ForgotLink = styled.a`
  display: inline-flex;
  align-self: center;
  padding: 10px;
`.withComponent(Link);

const ErrorContainer = styled.div`
  background-color: #ff0000;
  border: 2px solid #000000;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
`;

const SignIn = ({ email, password, submitReady, onChange, onSubmit, isSignInError }) => (
  <FormWrapper>
    <Form onSubmit={onSubmit}>
      <StyledHeader>Sign In</StyledHeader>

      {isSignInError && <ErrorContainer>{isSignInError}</ErrorContainer>}

      <TextInput
        autoFocus
        value={email}
        name="email"
        placeholder="email"
        onChange={onChange('email')}
      />

      <TextInput
        value={password}
        name="password"
        type="password"
        placeholder="Password"
        onChange={onChange('password')}
      />

      <ForgotLink to="/restore-password">Forgot password?</ForgotLink>

      <Button primary type="submit" disabled={!submitReady}>
        Sign In
      </Button>
    </Form>
  </FormWrapper>
);

export default SignIn;
