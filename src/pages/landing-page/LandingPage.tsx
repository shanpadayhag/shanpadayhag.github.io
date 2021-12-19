import React from 'react';
import styled from "styled-components";
import Logo from "../../components/logo";
import SocialIcons from "../../components/social-icons";
import {NavLink} from "react-router-dom";

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

const ContactMe = styled("a")`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`;

const Portfolio = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const Work = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: rotate(270deg) translate(50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;
  
  display: flex;
  justify-content: space-evenly;
`;

const About = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`;

const MySkills = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`;

const LandingPage = () => {
  return <LandingPageBody>
    <PaddingContainer>
      <Logo />

      <ContactMe href="mailto:shanpadayhag@gmail.com" target="_blank" rel="noopener noreferrer">
        <h2>
          Contact me
        </h2>
      </ContactMe>

      <Portfolio to={'/portfolio'}>
        <h2>
          Portfolio
        </h2>
      </Portfolio>

      <Work to={'/work'}>
        <h2>
          Work
        </h2>
      </Work>

      <SocialIcons />

      <BottomBar>
        <About to="/about">
          <h2>
            About
          </h2>
        </About>

        <MySkills to="/my-skills">
          <h2>
            My Skills
          </h2>
        </MySkills>
      </BottomBar>
    </PaddingContainer>
  </LandingPageBody>
}

export default LandingPage;
