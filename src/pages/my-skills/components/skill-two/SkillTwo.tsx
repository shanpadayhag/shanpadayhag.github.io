import React from "react";
import MySkillTitle from "../my-skill-title/MySkillTitle";
import MySkillDescription from "../my-skill-description/MySkillDescription";
import LaptopCodeIcon from "assets/icons/LaptopCodeIcon";

const SkillTwo = () => (
  <>
    <MySkillTitle>
      <LaptopCodeIcon size={40} />
      Full Stack Developer
    </MySkillTitle>

    <MySkillDescription>
      Making programs work smoothly leads in a positive user experience.
    </MySkillDescription>

    <MySkillDescription>
      <strong>Skills</strong>
      <p>Html, Css, Js, React, Redux, Php, Python, MySql etc.</p>
    </MySkillDescription>

    <MySkillDescription>
      <strong>Tools</strong>
      <p>PhpStorm, GitHub, BitBucket, etc</p>
    </MySkillDescription>
  </>
)

export default SkillTwo;
