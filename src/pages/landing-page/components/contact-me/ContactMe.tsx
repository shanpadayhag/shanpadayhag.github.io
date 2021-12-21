import React from "react";
import styled from "styled-components";
import RouteButtonTexts from "../route-button-texts/RouteButtonTexts";

const ContactMeBody = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2rem;
  right: 2rem;
  text-decoration: none;
  z-index: 1;

  @media only Screen and (max-width: 767px) {
    right: 1rem;
  }
`;

const ContactMe = () => (
  <ContactMeBody href="mailto:shanpadayhag@gmail.com">
    <RouteButtonTexts>
      Contact Me
    </RouteButtonTexts>
  </ContactMeBody>
)

export default ContactMe;
