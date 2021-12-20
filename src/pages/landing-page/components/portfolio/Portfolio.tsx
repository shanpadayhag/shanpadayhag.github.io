import styled from "styled-components";
import {NavLink} from "react-router-dom";
import RouteButtonTexts from "../route-button-texts/RouteButtonTexts";

const PortfolioBody = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const Portfolio = () => (
  <PortfolioBody to={'/portfolio/portfolio'}>
    <RouteButtonTexts>
      Portfolio
    </RouteButtonTexts>
  </PortfolioBody>
)

export default Portfolio;
