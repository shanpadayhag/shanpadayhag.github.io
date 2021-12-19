import React from 'react';
import styled from "styled-components";
import Logo from "components/logo";
import SocialIcons from "components/social-icons";
import {NavLink} from "react-router-dom";
import MeInLaptop from "assets/characters/MeInLaptop";
import {motion} from "framer-motion";

const LandingPageBody = styled.div`
  background: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  position: relative;
  
  h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
`;

const ContactMe = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`;

const Portfolio = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const Work = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: rotate(270deg) translate(100%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;
  
  display: flex;
  justify-content: space-evenly;
`;

const About = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`;

const MySkills = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`;

const CenterBody = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  width: 65vw;
  height: 55vh;
  display: flex;
  background: ${props => props.theme.body};
  border: 3px solid ${props => props.theme.text};
`;

const CenterSubBody = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextBody = styled(motion.div)`
  color: ${props => props.theme.text};
  cursor: default;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const MeInLaptopBody = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LandingPage = () => {
  return <LandingPageBody>
      <Logo />
      <SocialIcons />

      <CenterBody
        initial={{height: 0}}
        animate={{height: "65vh"}}
        transition={{ type: 'spring', duration: 2}}
      >
        <CenterSubBody>
          <TextBody
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ duration: 1, delay: 1 }}
          >
            <h1 style={{fontSize: 30,}}>Hi,</h1>
            <h1 style={{fontSize: 50,}}>I'm Shan</h1>
            <h1 style={{fontSize: 20, fontWeight: '400'}}>I code because im a coderist</h1>
          </TextBody>
        </CenterSubBody>
        <CenterSubBody>
          <MeInLaptopBody
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ duration: 1, delay: 1 }}
          >
            <MeInLaptop />
          </MeInLaptopBody>
        </CenterSubBody>
      </CenterBody>

      <ContactMe href="mailto:shanpadayhag@gmail.com">
        <motion.h2
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.8}}
        >
          Contact me
        </motion.h2>
      </ContactMe>

      <Portfolio to={'/portfolio/portfolio'}>
        <motion.h2
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.8}}
        >
          Portfolio
        </motion.h2>
      </Portfolio>

      <Work to={'/portfolio/work'}>
        <motion.h2
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.8}}
        >
          Work
        </motion.h2>
      </Work>

      <BottomBar>
        <About to="/portfolio/about">
          <motion.h2
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.8}}
          >
            About
          </motion.h2>
        </About>

        <MySkills to="/portfolio/my-skills">
          <motion.h2
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.8}}
          >
            My Skills
          </motion.h2>
        </MySkills>
      </BottomBar>
  </LandingPageBody>
}

export default LandingPage;
