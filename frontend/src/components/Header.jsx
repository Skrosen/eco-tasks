import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useOnClickOutside } from "../hooks";

import {
  HeaderContainer,
  HeaderFlexContainer,
} from "./reusable-components/Containers";
import Burger from "./Hamburger/Burger";
import HamburgerContent from "./Hamburger/HamburgerContent";
import { HeaderH1 } from "./reusable-components/Text";

const BurgerContainer = styled.div`
  display: flex;
  justify-self: flex-start;
  margin-left: 15%;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 10px 10px;
  color: ${(props) => props.theme.greyGreen};
  border-radius: 10px;
  border: 2px solid;
  border-color: ${(props) => props.theme.darkGreen};
  background: ${(props) => props.theme.mediumGreen};
  box-shadow: inset 0 0 0 0;
  display: flex;
  justify-self: flex-end;
  margin-right: 15%;
  align-items: center;
  grid-column: 3/3;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const node = useRef(null);
  useOnClickOutside(node, () => setOpen(false));

  const accessToken = useSelector((store) => store.user.accessToken);

  return (
    <HeaderContainer>
      <HeaderFlexContainer>
        {accessToken && (
          <BurgerContainer ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <HamburgerContent open={open} setOpen={setOpen} />
          </BurgerContainer>
        )}
        <HeaderH1>EcoTasks</HeaderH1>
      </HeaderFlexContainer>
      {!accessToken && (
        <StyledLink
          to={{
            pathname: "/login",
          }}
        >
          Login or signup
          <span role="img" aria-label="about us">
            &#128273;
          </span>
        </StyledLink>
      )}
    </HeaderContainer>
  );
};

export default Header;
