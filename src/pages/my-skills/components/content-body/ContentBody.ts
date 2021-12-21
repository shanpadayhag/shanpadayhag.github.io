import styled from "styled-components";

const ContentBody = styled.div`
  border: 2px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.body};
  padding: 2rem;
  width: 30vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;

  font-family: 'Ubuntu Mono', monospace;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    color: ${props => props.theme.body};
    background-color: ${props => props.theme.text};
  }

  @media only Screen and (max-width: 767px) {
    width: 60vw;
    margin-bottom: 2rem;
  }

  @media only Screen and (max-width: 430px) {
    width: 50vw;
  }

  @media only Screen and (max-width: 340px) {
    width: 40vw;
  }
`;

export default ContentBody;
