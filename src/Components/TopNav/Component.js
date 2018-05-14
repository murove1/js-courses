import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import ApikoLogo from '../ApikoLogo';
import LinkButton from '../Buttons/LinkButton';


const Nav = styled.nav`
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
`;

const NavMenu = styled.menu`
  margin: 0;
  padding: 0;
  display: flex;
  
  > ${LinkButton}:not(:last-child) {
    margin-right: 10px;
  }
`;


const Logo = styled.a`
  display: flex;
`.withComponent(Link);


const TopNav = ({ list }) => (
  <Nav>
    <Logo to="/">
      <ApikoLogo height={50} long />
    </Logo>

    <NavMenu>
      {list.map(({ label, ...props }) => (
        <LinkButton key={label} {...props}>
          {label}
        </LinkButton>
      ))}
    </NavMenu>
  </Nav>
);


TopNav.propTypes = {
  signOut: T.func.isRequired,
  user: T.object,
  list: T.array.isRequired,
};


export default TopNav;
