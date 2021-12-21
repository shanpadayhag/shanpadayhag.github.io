import styled from "styled-components";
import ContentBody from "../content-body/ContentBody";

const MySkillDescription = styled.div`
  color: ${props => props.theme.text};
  font-size: calc(0.6em + 1vw);
  padding: 0.5rem 0;
  
  strong {
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
  
  ul, p {
    margin-left: 2rem;
  }
  
  ${ContentBody}:hover &{
    color: ${props => props.theme.body};
  }
`

export default MySkillDescription;
