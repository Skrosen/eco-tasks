import React from "react";
import styled from "styled-components/macro";

export const Btn = styled.button`
  position: relative;
  display: inline-block;
  margin: 10px;
  padding: 10px 10px;
  text-align: center;
  font-family: inherit;
  font-size: 24px;
  letter-spacing: 1px;
  text-decoration: none;
  color: rgb(59, 85, 59);
  background: ${(props) => props.theme.mediumGreen};
  cursor: pointer;
  transition: ease-out 0.5s;
  border-radius: 30px;
  border: 2px solid;
  border-color: ${(props) => props.theme.darkGreen};
  border-radius: 10px;
  box-shadow: inset 0 0 0 0;

  &:hover {
    color: ${(props) => props.theme.hoverBeige};
    box-shadow: inset 0 -100px 0 0 ${(props) => props.theme.mediumGreen};
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const TimeSpanButton = styled.button`
  all: unset;
  padding-top: 20px;
  margin-left: 10px;
  color: ${(props) =>
    props.selected ? props.theme.mediumGreen : "black"};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.mediumGreen};
  }

  &:focus {
    color: ${(props) => props.theme.mediumGreen};
  }
`;

export const Button = ({ text, onClick }) => {
  return <Btn onClick={onClick}>{text}</Btn>;
};
