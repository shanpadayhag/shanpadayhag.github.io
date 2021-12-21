import React from "react";
import MySkillTitle from "../my-skill-title/MySkillTitle";
import MySkillDescription from "../my-skill-description/MySkillDescription";
import ApplicationCodeIcon from "assets/icons/ApplicationCodeIcon";

const SkillOne = () => (
  <>
    <MySkillTitle>
      <ApplicationCodeIcon size={40} />
      App development
    </MySkillTitle>

    <MySkillDescription>
      Applications that can engage with clients
      are very wonderful, and I enjoy developing them.
    </MySkillDescription>

    <MySkillDescription>
      <strong>Skills</strong>
      <ul>
        <li>Website development</li>
        <li>Mobile development</li>
      </ul>
    </MySkillDescription>

    <MySkillDescription>
      <strong>Tools</strong>
      <ul>
        <li>React JS & Native</li>
        <li>Laravel</li>
        <li>etc.</li>
      </ul>
    </MySkillDescription>
  </>
)

export default SkillOne;
