import React from "react";
import MySkillsBody from "./components/my-skills-body/MySkillsBody";
import ContentBody from "./components/content-body/ContentBody";
import Logo from "components/logo";
import SocialIcons from "components/social-icons";
import SkillOne from "./components/skill-one/SkillOne";
import SkillTwo from "./components/skill-two/SkillTwo";
import ParticleOne from "components/particles/particle-one/ParticleOne";
import {LIGHT_THEME} from "configs/themes/ThemeConfig";

const MySkillsContainer = () => (
  <MySkillsBody className={"disableSelectText"}>
    <ContentBody>
      <SkillOne />
    </ContentBody>

    <ContentBody>
      <SkillTwo />
    </ContentBody>

    <Logo />
    <SocialIcons />
    <ParticleOne theme={LIGHT_THEME} />
  </MySkillsBody>
)

export default MySkillsContainer;
