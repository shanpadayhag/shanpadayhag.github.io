import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import RouteButtonTexts from "../route-button-texts/RouteButtonTexts";

const WorkBody = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: rotate(270deg) translate(100%, -50%);
  text-decoration: none;
  z-index: 1;

  @media only Screen and (max-width: 767px) {
    left: 1rem;
  }
`;

const Work = () => (
  <WorkBody to={'/portfolio/work'}>
    <RouteButtonTexts>
      Work
    </RouteButtonTexts>
  </WorkBody>
);

export default Work
