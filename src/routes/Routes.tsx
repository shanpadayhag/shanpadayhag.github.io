import { BrowserRouter, Routes as RoutesContainer, Route } from 'react-router-dom';
import React from "react";
import LandingPageContainer from "pages/landing-page/LandingPageContainer";
import PageNotFoundContainer from "pages/page-not-found/PageNotFoundContainer";
import PortfolioContainer from "pages/portfolio/PortfolioContainer";
import WorkContainer from "pages/work/WorkContainer";
import MySkillsContainer from "pages/my-skills/MySkillsContainer";
import AboutContainer from "pages/about/AboutContainer";

const Routes = () => (
  <BrowserRouter>
    <RoutesContainer>
      <Route path="/portfolio" element={<LandingPageContainer />} />
      <Route path="/portfolio/portfolio" element={<PortfolioContainer />} />
      <Route path="/portfolio/my-skills" element={<MySkillsContainer />} />
      <Route path="/portfolio/work" element={<WorkContainer />} />
      <Route path="/portfolio/about" element={<AboutContainer />} />
      <Route path="*" element={<PageNotFoundContainer />} />
    </RoutesContainer>
  </BrowserRouter>
);

export default Routes;
