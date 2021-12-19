import React from 'react';
import styled from "styled-components";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import GithubIcon from "../../assets/icons/GitHubIcon";
import TwitterIcon from "../../assets/icons/TwitterIcon";

const LandingPageBody = styled.div`
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

const PaddingContainer = styled.div`
  padding: 2rem;
`;

const LandingPage = () => {
  return <LandingPageBody>
    <PaddingContainer>
      This is the landing page.
      <FacebookIcon />
      <GithubIcon />
      <TwitterIcon />
    </PaddingContainer>
  </LandingPageBody>
}

export default LandingPage;
