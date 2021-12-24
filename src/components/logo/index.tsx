import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const LogoText = styled.h1`
  display: inline-block;
  color: ${props => props.theme.text};
  font-family: Montserrat, cursive;
  font-weight: normal;
  
  position: fixed;
  left: 2rem;
  top: 2rem;
  z-index: 3;

  @media only Screen and (max-width: 767px) {
    font-size: 24px;
    left: 1rem;
    top: 2rem;
  }

  @media only Screen and (max-width: 532px) {
    font-size: 20px;
  }
`;

const Logo = () => {
  return (
    <NavLink to={'/portfolio'}>
      <LogoText className={'disableSelect'}>
        LOGO
      </LogoText>
    </NavLink>
  )
}

export default Logo;
