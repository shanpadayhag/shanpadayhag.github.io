import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import RouteButtonTexts from "../route-button-texts/RouteButtonTexts";

const BottomBarBody = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;
  
  display: flex;
  justify-content: space-evenly;
`;

const AboutBody = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`;

const MySkillsBody = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`;

const BottomBar = () => (
  <BottomBarBody>
    <AboutBody to="/portfolio/about">
      <RouteButtonTexts>
        About
      </RouteButtonTexts>
    </AboutBody>

    <MySkillsBody to="/portfolio/my-skills">
      <RouteButtonTexts>
        My Skills
      </RouteButtonTexts>
    </MySkillsBody>
  </BottomBarBody>
)

export default BottomBar;
