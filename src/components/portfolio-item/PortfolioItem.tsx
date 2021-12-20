import React, {useEffect} from "react";
import styled from "styled-components";

interface PortfolioItemInterface {
  portfolio: {
    name: String
    tags: String[]
    date: String
    imgSrc: String
    link: string
  }
}

const PortfolioItemContainer = styled("a")`
  width: calc(10rem + 15vw);
  text-decoration: none;
  height: 15rem;
  padding: 1rem;
  color: ${props => props.theme.text};
  border: 2px solid ${props => props.theme.text};
  backdrop-filter: blur(2px);
  
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 5;
  
  &:hover {
    color: ${props => props.theme.body};
    background-color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }
`;

const Image = styled.div`
  background-image: ${({img}: { img: String })  => `url(${window.location.origin}${img})`};
  width: 100%;
  height: 60%;
  background-size: cover;
  border: 1px solid transparent;
  background-position: center center;

  @media only Screen and (max-width: 1349px) {
    height: 40%;
  }

  @media only Screen and (max-width: 849px) {
    height: 35%;
  }

  @media only Screen and (max-width: 549px) {
    height: 30%;
  }

  ${PortfolioItemContainer}:hover &{
    border: ${props => props.theme.body};
  }
`

const Title = styled.h3`
  color: inherit;
  padding: 1rem 0 0.5rem 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  border-bottom: 1px solid ${props => props.theme.text};
  width: calc(100% - 1rem);
  
  ${PortfolioItemContainer}:hover &{
    border-bottom: 1px solid ${props => props.theme.body};
  }
`;

const HashTags = styled.div`
  padding: 0.5rem 0;
`

const Tags = styled.span`
  font-size: 0.88rem;
  padding-right: 0.5rem;
`

const Date = styled.span`
  font-size: 0.88rem;
  padding: 0.5rem 0;
`

const PortfolioItem = (props: PortfolioItemInterface) => {
  const {
    name,
    tags,
    date,
    imgSrc,
    link,
  } = props.portfolio

  return (
  <PortfolioItemContainer target={"_blank"} href={link} rel="noopener noreferrer">
    <Image img={imgSrc}/>
    <Title>{name}</Title>
    <HashTags>
      {
        tags.map((t, id) => (
          <Tags key={id}>#{t}</Tags>
        ))
      }
    </HashTags>
    <Date>{date}</Date>
  </PortfolioItemContainer>
)}

export default PortfolioItem;
