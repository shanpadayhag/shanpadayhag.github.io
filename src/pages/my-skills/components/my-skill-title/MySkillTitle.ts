import styled from "styled-components";
import ContentBody from "../content-body/ContentBody";

const MySkillTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(1em + 1vw);
  
  &>*:first-child {
    margin-right: 1rem;
  }
  
  ${ContentBody}:hover &{
    &>* {
      fill: ${props => props.theme.body};
    }
  }
`

export default MySkillTitle;
