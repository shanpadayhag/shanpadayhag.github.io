import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import MeInLaptop from "assets/characters/MeInLaptop";

interface MeInLaptopInterface {
  windowSize: number[]
}

const MeInLaptopBody = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only Screen and (max-width: 1024px) {
    margin-top: -60px;
  }

  @media only Screen and (max-height: 600px) {
    margin-top: -30px;
  }
`;

const MeInLaptopContainer = ({
  windowSize
}: MeInLaptopInterface) => {
  return (
  <MeInLaptopBody
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 1, delay: 1}}>
    <MeInLaptop size={windowSize[1] * 0.4}/>
  </MeInLaptopBody>
)}

export default MeInLaptopContainer;
