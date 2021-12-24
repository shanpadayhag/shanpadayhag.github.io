import React from "react";
import {DARK_THEME, THEME_TYPE} from "configs/themes/ThemeConfig";
import styled from "styled-components";
import ParticleOneDark from "./dark/ParticleOneDark";
import ParticleOneLight from "./light/ParticleOneLight";

interface ParticleOneInterface {
  theme: THEME_TYPE
}

const ParticleOneBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;

const ParticleOne = ({
                       theme
                     }: ParticleOneInterface) => (
  <ParticleOneBody>
    { theme === DARK_THEME
      ? <ParticleOneDark/>
      : <ParticleOneLight/> }
  </ParticleOneBody>
)

export default ParticleOne;
