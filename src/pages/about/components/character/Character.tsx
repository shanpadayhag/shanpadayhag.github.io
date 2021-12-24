import React from "react";
import styled from "styled-components";
import ManWithCode from "assets/characters/ManWIthCode";

interface CharacterInterface {
  computeSize: () => number
}

const CharacterContainer = styled.div`
  z-index: 1;
`

const Character = ({
                     computeSize
                   }: CharacterInterface) => (
  <CharacterContainer>
    <ManWithCode size={computeSize()}/>
  </CharacterContainer>
)

export default Character;
