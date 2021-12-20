import React from "react";
import styled from "styled-components";
import portfolioData from 'data/portfolio.json'
import PortfolioItem from "../../../../components/portfolio-item/PortfolioItem";

const PortfolioListBody =  styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
`;

const PortfolioItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
  grid-gap: calc(1rem + 2vw);

  @media only Screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(calc(10rem + 15vw), 1fr));
  }
`;

const PortfolioList = () => (
  <PortfolioListBody>
    <PortfolioItemsContainer>
      {portfolioData.map(portfolio => (
        <PortfolioItem portfolio={portfolio} />
      ))}
    </PortfolioItemsContainer>
  </PortfolioListBody>
)

export default PortfolioList;
