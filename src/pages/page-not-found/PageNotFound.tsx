import React from "react";
import styled from "styled-components";

const PageNotFoundBody = styled.div`
  width: 100vw;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-top: -25px;
`

const PageNotFound = () => {
  return <PageNotFoundBody>
    <h1 style={{textAlign: 'center'}}>404</h1>
    <h3 style={{textAlign: 'center'}}>I think you are lost baby gurl</h3>
  </PageNotFoundBody>;
}

export default PageNotFound;
