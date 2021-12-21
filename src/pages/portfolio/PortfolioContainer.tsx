import React from "react";
import PortfolioBody from "./components/portfolio-body/PortfolioBody";
import Logo from "components/logo";
import SocialIcons from "components/social-icons";
import PortfolioList from "./components/portfolio-list/PortfolioList";

const PortfolioContainer = () => (
  <PortfolioBody>
    <Logo />
    <SocialIcons />
    <PortfolioList />
  </PortfolioBody>
)

export default PortfolioContainer;
