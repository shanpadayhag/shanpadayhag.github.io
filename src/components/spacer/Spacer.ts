import styled from "styled-components";

interface SpacerProps {
  height?: number
  width?: number
}

const Spacer = styled.div`
  height: ${(props: SpacerProps) => props.height}px;
  width: ${(props: SpacerProps) => props.width}px;
`;

export default Spacer;
