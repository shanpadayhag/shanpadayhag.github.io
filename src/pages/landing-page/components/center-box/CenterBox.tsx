import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

interface CenterBoxInterface { children?: JSX.Element|JSX.Element[] }

const CenterBoxContainer = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  width: 65vw;
  height: 55vh;
  display: flex;
  background: ${props => props.theme.body};
  border: 3px solid ${props => props.theme.text};
  
  @media only Screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CenterBox = ({
  children,
}: CenterBoxInterface) => (
  <CenterBoxContainer
    initial={{height: 0}}
    animate={{height: "65vh"}}
    transition={{ type: 'spring', duration: 2}}>
    {children}
  </CenterBoxContainer>
);

export default CenterBox;
