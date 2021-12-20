import styled from "styled-components";

interface CenterBoxDivInterface { children?: JSX.Element|JSX.Element[] }

const CenterBoxDivBody = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterBoxDiv = ({
  children,
}: CenterBoxDivInterface) => (
  <CenterBoxDivBody>
    {children}
  </CenterBoxDivBody>
);

export default CenterBoxDiv;
