import styled from "styled-components";
import {motion} from "framer-motion";
import React from "react";

const TextBody = styled(motion.div)`
  color: ${props => props.theme.text};
  cursor: default;

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
    width: 18rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media only Screen and (max-width: 532px) {
    width: 11rem;
  }
`;

const TextOne = styled(motion.text)`
  font-size: 30px;
  font-weight: bold;

  @media only Screen and (max-width: 767px) {
    font-size: 20px;
    font-weight: bold;
  }
`;

const TextTwo = styled(motion.text)`
  font-size: 50px;
  font-weight: bold;

  @media only Screen and (max-width: 767px) {
    font-size: 35px;
    font-weight: bold;
  }
`;

const TextThree = styled(motion.text)`
  font-size: 20px;
  font-weight: 400;

  @media only Screen and (max-width: 767px) {
    font-size: 17px;
    font-weight: 400;
  }
`;

const IntroContent = () => (
  <TextBody
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{ duration: 1, delay: 1 }}>
    <TextOne>Hi,</TextOne>
    <TextTwo>I'm Shan</TextTwo>
    <TextThree>I code because im a coderist</TextThree>
  </TextBody>
);

export default IntroContent;
