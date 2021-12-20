import { BrowserRouter, Routes as RoutesContainer, Route } from 'react-router-dom';
import React from "react";
import LandingPageContainer from "pages/landing-page/LandingPageContainer";
import PageNotFoundContainer from "pages/page-not-found/PageNotFoundContainer";
import PortfolioContainer from "pages/portfolio/PortfolioContainer";

const Routes = () => (
  <BrowserRouter>
    <RoutesContainer>
      <Route path="/portfolio" element={<LandingPageContainer />} />
      <Route path="/portfolio/portfolio" element={<PortfolioContainer />} />
      <Route path="*" element={<PageNotFoundContainer />} />
    </RoutesContainer>
  </BrowserRouter>
);

export default Routes;
