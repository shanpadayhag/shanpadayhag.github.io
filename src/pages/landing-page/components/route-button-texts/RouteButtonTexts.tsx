import React from "react";
import {motion} from "framer-motion";
import styled from "styled-components";

interface RouteButtonTextsInterface { children: String }

const RouteButtonText = styled(motion.text)`
  font-weight: 500;
  font-size: 1.7rem;
`;

const RouteButtonTexts = ({
  children,
}: RouteButtonTextsInterface) => (
  <RouteButtonText
    whileHover={{scale: 1.1}}
    whileTap={{scale: 0.8}}>
    {children}
  </RouteButtonText>
);

export default RouteButtonTexts;
