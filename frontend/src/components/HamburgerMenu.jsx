import React from "react";
import { batch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Burger from "./Hamburger/Burger";
import HamburgerContent from "./Hamburger/HamburgerContent";

import user from "../reducers/user";

const HamburgerMenu = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(user.actions.setInitialState());
    navigate("/login");
  };
  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <HamburgerContent open={open} />
    </>
  );
};

export default HamburgerMenu;
