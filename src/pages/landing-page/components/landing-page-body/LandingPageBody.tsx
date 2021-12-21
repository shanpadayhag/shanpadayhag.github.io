import React from "react";
import styled from "styled-components";

interface LandingPageBodyInterface { children?: JSX.Element|JSX.Element[] }

const LandingPageBodyContainer = styled.div`
  background: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  position: relative;
  
  h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
`;

const LandingPageBody = ({
 children
}: LandingPageBodyInterface) => (
  <LandingPageBodyContainer>
    {children}
  </LandingPageBodyContainer>
);

export default LandingPageBody;
