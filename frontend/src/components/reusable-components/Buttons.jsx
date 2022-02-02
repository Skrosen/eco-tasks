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
	color: rgb(3, 3, 3);
	background: ${(props) => props.theme.background};
	cursor: pointer;
	transition: ease-out 0.5s;
	border-radius: 30px;
	border: 2px solid;
	border-color: ${(props) => props.theme.borderGreen};
	border-radius: 10px;
	box-shadow: inset 0 0 0 0 

	&:hover {
		color: ${(props) => props.theme.hoverBeige};
		box-shadow: inset 0 -100px 0 0 ${(props) => props.theme.borderGreen};
	}

	&:active {
		transform: scale(0.9);
	}
`;

export const Button = ({ text, onClick }) => {
  return <Btn onClick={onClick}>{text}</Btn>;
};
