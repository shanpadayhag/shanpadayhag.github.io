import React from 'react';
import Routes from "routes/Routes";
import GlobalStyles from "styles/global/GlobalStyles";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "styles/themes/ThemeStyles";

const App = () => (
  <div className="App">
    <GlobalStyles />
    <ThemeProvider theme={lightTheme}>
      <Routes />
    </ThemeProvider>
  </div>
)

export default App;
