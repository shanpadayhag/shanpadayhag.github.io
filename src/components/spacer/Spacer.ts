import styled from "styled-components";

interface SpacerProps {
  height?: number
}

const Spacer = styled.div`
  height: ${(props: SpacerProps) => props.height}px;
`;

export default Spacer;
