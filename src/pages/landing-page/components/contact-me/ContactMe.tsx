import styled from "styled-components";
import React from "react";
import RouteButtonTexts from "../route-button-texts/RouteButtonTexts";

const ContactMeBody = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`;

const ContactMe = () => (
  <ContactMeBody href="mailto:shanpadayhag@gmail.com">
    <RouteButtonTexts>
      Contact Me
    </RouteButtonTexts>
  </ContactMeBody>
)

export default ContactMe;
