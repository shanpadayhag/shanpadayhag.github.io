import React from "react";
import {NavLink} from "react-router-dom";
import FacebookIcon from "assets/icons/FacebookIcon";
import GithubIcon from "assets/icons/GitHubIcon";
import styled from "styled-components";
import LinkedInIcon from "../../assets/icons/LinkedIn";

const SocialIconsBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 2rem;
  
  z-index: 3;
  
  &>*:not(last-child) {
    margin: 0.5rem 0;
  }
`;

const Line = styled.span`
  width: 2px;
  height: 8rem;
  background-color: ${props => props.theme.text};
`;

const SocialIcons = () => (
  <SocialIconsBody>
    <div>
      <a href="https://github.com/rappo-ghad" target="_blank" rel="noopener noreferrer">
        <GithubIcon />
      </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/rappo-ghad" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </a>
    </div>
    <div>
      <a href="https://www.facebook.com/profile.php?id=100075489187417" target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </a>
    </div>

    <Line />
  </SocialIconsBody>
);

export default SocialIcons;
