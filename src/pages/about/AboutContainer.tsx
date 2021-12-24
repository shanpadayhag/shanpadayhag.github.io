import React from "react";
import AboutBody from "./components/about-body/AboutBody";
import Logo from "components/logo";
import SocialIcons from "components/social-icons";
import useWindowSize from "helpers/use-window-size/useWindowSize";
import AboutMeContent from "./components/about-me-content/AboutMeContent";
import ParticleTwo from "components/particles/particle-two/ParticleTwo";
import {LIGHT_THEME} from "configs/themes/ThemeConfig";
import Character from "./components/character/Character";

const AboutContainer = () => {
  const windowSize = useWindowSize()

  const computeSize = () => {
    const widthSize = windowSize[0] * 0.35
    const heightSize = windowSize[1] * 0.7

    const mobileWidthSize = windowSize[0] * 0.55
    const mobileHeightSize = windowSize[1] * 0.5

    if (windowSize[0] < 768) {
      return mobileWidthSize < mobileHeightSize ? mobileWidthSize : mobileHeightSize
    }

    return widthSize < heightSize ? widthSize : heightSize
  }

  return (
    <AboutBody>
      <Logo/>
      <SocialIcons/>

      <ParticleTwo theme={LIGHT_THEME} />
      <AboutMeContent />
      <Character computeSize={computeSize} />
    </AboutBody>
  )};

export default AboutContainer;
