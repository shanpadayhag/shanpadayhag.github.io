import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

const TextBody = styled(motion.div)`
  color: ${props => props.theme.text};
  cursor: default;
  width: 70%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  
  text {
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media only Screen and (max-width: 1024px) {
    width: 20rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media only Screen and (max-width: 532px) {
    width: 14rem;
  }

  @media only Screen and (max-width: 440px) {
    width: 11rem;
  }
`;

const TextOne = styled(motion.text)`
  font-size: 30px;
  font-weight: bold;

  @media only Screen and (max-width: 767px) {
    font-size: 20px;
  }

  @media only Screen and (max-width: 532px) {
    font-size: 18px;
  }
`;

const TextTwo = styled(motion.text)`
  font-size: 50px;
  font-weight: bold;
  padding-bottom: 5px;

  @media only Screen and (max-width: 767px) {
    font-size: 35px;
    padding-bottom: 0;
  }

  @media only Screen and (max-width: 532px) {
    font-size: 30px;
  }

  @media only Screen and (max-width: 440px) {
    font-size: 25px;
  }
`;

const TextThree = styled(motion.text)`
  font-size: 20px;
  font-weight: 400;

  @media only Screen and (max-width: 767px) {
    font-size: 17px;
    font-weight: 400;
  }

  @media only Screen and (max-width: 532px) {
    font-size: 15px;
  }

  @media only Screen and (max-width: 440px) {
    font-size: 12px;
  }
`;

const IntroContent = () => (
  <TextBody
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{ duration: 1, delay: 1 }}>
    <TextOne>Hi,</TextOne>
    <TextTwo>I'm Shan</TextTwo>
    <TextThree>I will turn your ideas into great
      website solutions for your businesses</TextThree>
  </TextBody>
);

export default IntroContent;
