import styled from "styled-components";
import {motion} from "framer-motion";
import MeInLaptop from "assets/characters/MeInLaptop";
import React from "react";
import useWindowSize from "helpers/use-window-size/useWindowSize";

const MeInLaptopBody = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only Screen and (max-width: 1024px) {
    margin-top: -60px;
  }
`;

const MeInLaptopContainer = () => {
  const windowSize = useWindowSize()

  return (
  <MeInLaptopBody
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 1, delay: 1}}>
    <MeInLaptop size={windowSize[1] * 0.4}/>
  </MeInLaptopBody>
)}

export default MeInLaptopContainer;
