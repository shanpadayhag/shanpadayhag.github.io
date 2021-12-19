import { BrowserRouter, Routes as RoutesContainer, Route } from 'react-router-dom';
import React from "react";
import LandingPageContainer from "pages/landing-page/LandingPageContainer";
import PageNotFoundContainer from "pages/page-not-found/PageNotFoundContainer";

const Routes = () => (
  <BrowserRouter>
    <RoutesContainer>
      <Route path="/" element={<LandingPageContainer />} />
      <Route path="*" element={<PageNotFoundContainer />} />
    </RoutesContainer>
  </BrowserRouter>
);

export default Routes;
