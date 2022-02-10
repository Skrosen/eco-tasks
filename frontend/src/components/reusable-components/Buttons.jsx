import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Btn = styled.button`
  position: relative;
  display: inline-block;
  margin: 10px;
  padding: 5px 10px;
  text-align: center;
  font-family: inherit;
  font-size: 18px;
  text-decoration: none;
  color: ${(props) => props.theme.greyGreen};
  background: ${(props) => props.theme.mediumGreen};
  border: none;
  border-radius: 6px;
  box-shadow: inset 0 0 0 0;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.hoverBeige};
    box-shadow: inset 0 -100px 0 0 ${(props) => props.theme.superDarkGreen};
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const TimeSpanButton = styled.button`
  all: unset;
  margin-left: 10px;
  color: ${(props) =>
    props.selected ? props.theme.mediumGreen : "black"};
  text-decoration: ${(props) =>
    props.selected ? "underline" : "none"};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.mediumGreen};
  }

  &:focus {
    color: ${(props) => props.theme.mediumGreen};
  }
`;

export const LinkButton = styled(Link)`
  position: relative;
  display: inline-block;
  margin: 10px;
  padding: 5px 10px;
  text-align: center;
  font-family: inherit;
  font-size: 18px;
  text-decoration: none;
  color: ${(props) => props.theme.greyGreen};
  background: ${(props) => props.theme.mediumGreen};
  border: none;
  border-radius: 6px;
  box-shadow: inset 0 0 0 0;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.hoverBeige};
    box-shadow: inset 0 -100px 0 0 ${(props) => props.theme.superDarkGreen};
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const Button = ({ text, onClick }) => {
  return <Btn onClick={onClick}>{text}</Btn>;
};
