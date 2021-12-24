import styled from "styled-components";

const AboutBody = styled.div`
  background-color: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media only Screen and (max-width: 1024px) {
    &>*:nth-child(3) {
      margin-left: 1rem;
    }
  }

  @media only Screen and (max-width: 767px) {
    flex-direction: column-reverse;
    &>*:nth-child(3) {
      margin-left: 2rem;
    }
    
    &>*:last-child {
      margin-top: 50px;
    }
  }
`

export default AboutBody;
