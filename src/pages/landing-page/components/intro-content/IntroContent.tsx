import styled from "styled-components";
import {motion} from "framer-motion";
import React from "react";

const TextBody = styled(motion.div)`
  color: ${props => props.theme.text};
  cursor: default;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TextOne = styled(motion.text)`
  font-size: 30px;
  font-weight: bold;
`;

const TextTwo = styled(motion.text)`
  font-size: 50px;
  font-weight: bold;
`;

const TextThree = styled(motion.text)`
  font-size: 20px;
  font-weight: 400;
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
