import styled from "styled-components";

const MySkillsBody = styled.div`
  background-color: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media only Screen and (max-width: 1024px) {
    &>*:first-child {
      margin-left: 3rem;
    }
  }

  @media only Screen and (max-width: 767px) {
    &>*:first-child {
      margin-left: 0;
    }

    padding-top: 8rem;
    padding-bottom: 2rem;
    height: auto;
    flex-direction: column;
    justify-content: start;
    align-content: space-evenly;
  }
`;

export default MySkillsBody;
