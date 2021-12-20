import styled from "styled-components";
import {motion} from "framer-motion";
import MeInLaptop from "assets/characters/MeInLaptop";
import React from "react";

const MeInLaptopBody = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const MeInLaptopContainer = () => (
  <MeInLaptopBody
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{ duration: 1, delay: 1 }}>
    <MeInLaptop />
  </MeInLaptopBody>
)

export default MeInLaptopContainer;
