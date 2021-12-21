import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    display: inline-block
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
  }
  
  .disableSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export default GlobalStyles;
