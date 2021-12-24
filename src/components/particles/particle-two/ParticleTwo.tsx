import React from "react";
import {DARK_THEME, THEME_TYPE} from "configs/themes/ThemeConfig";
import ParticleLightTwo from "./light/ParticleLightTwo";
import styled from "styled-components";

interface ParticleTwoInterface {
  theme: THEME_TYPE
}

const ParticleTwoBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;

const ParticleTwo = ({
                       theme
                     }: ParticleTwoInterface) => (
  <ParticleTwoBody>
    {theme === DARK_THEME ? <ParticleLightTwo/> : <ParticleLightTwo/>}
  </ParticleTwoBody>
)
export default ParticleTwo;
