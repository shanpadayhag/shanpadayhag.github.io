import React from "react";
import styled from "styled-components";

const LogoText = styled.h1`
  display: inline-block;
  color: ${props => props.theme.text};
  font-family: Montserrat, cursive;
  font-weight: normal;
  
  position: fixed;
  left: 2rem;
  top: 2rem;
  z-index: 3;
`;

const Logo = () => {
  return (
    <LogoText>
      LOGO
    </LogoText>
  )
}

export default Logo;