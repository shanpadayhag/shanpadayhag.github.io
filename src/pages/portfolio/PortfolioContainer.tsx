import React from "react";
import PortfolioBody from "./components/portfolio-body/PortfolioBody";
import Logo from "components/logo";
import SocialIcons from "components/social-icons";
import PortfolioList from "./components/portfolio-list/PortfolioList";
import ParticleOne from "components/particles/particle-one/ParticleOne";
import {LIGHT_THEME} from "configs/themes/ThemeConfig";

const PortfolioContainer = () => (
  <PortfolioBody>
    <Logo />
    <SocialIcons />
    <ParticleOne theme={LIGHT_THEME}/>
    <PortfolioList />
  </PortfolioBody>
)

export default PortfolioContainer;
