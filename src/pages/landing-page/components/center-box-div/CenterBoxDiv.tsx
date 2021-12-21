import React from "react";
import styled from "styled-components";

interface CenterBoxDivInterface { children?: JSX.Element|JSX.Element[] }

const CenterBoxDivBody = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only Screen and (max-width: 1024px) {
    width: 100%;
    height: 50%;
  }
`;

const CenterBoxDiv = ({
  children,
}: CenterBoxDivInterface) => (
  <CenterBoxDivBody>
    {children}
  </CenterBoxDivBody>
);

export default CenterBoxDiv;
