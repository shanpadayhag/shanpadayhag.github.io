import React from "react";
import LandingPageBody from "./components/landing-page-body/LandingPageBody";
import CenterBox from "./components/center-box/CenterBox";
import TextContainer from "./components/intro-content/IntroContent";
import CenterBoxDiv from "./components/center-box-div/CenterBoxDiv";
import MeInLaptopContainer from "./components/me-in-laptop-container/MeInLaptopContainer";
import Logo from "components/logo";
import SocialIcons from "components/social-icons";
import ContactMe from "./components/contact-me/ContactMe";
import Portfolio from "./components/portfolio/Portfolio";
import Work from "./components/work/Work";
import BottomBar from "./components/bottom-bar/BottomBar";

const LandingPageContainer = () => (
  <LandingPageBody>
    {/* ALL THE NAVIGATION ROUTE BUTTONS */}
    <Logo />
    <SocialIcons />
    <ContactMe />
    <Portfolio />
    <Work />
    <BottomBar />

    {/* CENTER BOX OF THE PORTFOLIO AND THE CHILDREN ARE ITS CONTENTS */}
    <CenterBox>
      <CenterBoxDiv>
        <TextContainer />
      </CenterBoxDiv>

      <CenterBoxDiv>
        <MeInLaptopContainer />
      </CenterBoxDiv>
    </CenterBox>
  </LandingPageBody>
);

export default LandingPageContainer;
