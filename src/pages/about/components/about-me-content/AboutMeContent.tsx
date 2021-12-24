import React from "react";
import styled from "styled-components";

const ContentBody = styled.div`
  border: 2px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.body};
  padding: 2rem;
  width: 30vw;
  height: 60vh;
  z-index: 10;
  line-height: 1.5;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
  p {
    font-size: calc(0.5em + 0.5vw);
  }

  @media only Screen and (max-width: 767px) {
    width: 60vw;
    height: auto;
    padding: 1rem;
    
    &>*:not(last-child) {
      padding-bottom: 10px;
    }
  }
`

const AboutMeContent = () => (
  <ContentBody>
    <p>
      I'm a Philippines-based full-stack developer. I'd be delighted
      to transform your ideas into fantastic website solutions for your
      company. I can usually manage the complete job for you, but you
      can also look through my portfolio to see examples of my work.
    </p>
    <p>
      I've worked on from design implementation to application logic. I
      offer application development services to a company or
      organization. I've been in the industry for 7 months. I am
      knowledgeable in mobile apps and web services.
    </p>
    <p>
      I think that you should design your goods with the consumer in
      mind from the outset, rather than with the necessity to target a
      certain market in mind. That is when your customers will be
      pleased, when your items are the greatest. To put it another way,
      you must "get it right" from the start.
    </p>
  </ContentBody>
)

export default AboutMeContent;
