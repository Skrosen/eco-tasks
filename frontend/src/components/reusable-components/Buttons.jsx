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
	background: rgba(215, 255, 217, 0.3);
	cursor: pointer;
	transition: ease-out 0.5s;
	border-radius: 30px;
	border: 2px solid;
	border-color: rgb(117, 164, 120);
	border-radius: 10px;
	box-shadow: inset 0 0 0 0 rgb(117, 164, 120);

	&:hover {
		color: rgb(255, 248, 225);
		box-shadow: inset 0 -100px 0 0 rgb(117, 164, 120);
	}

	&:active {
		transform: scale(0.9);
	}
`;

export const Button = ({ text, onClick }) => {
	return <Btn onClick={onClick}>{text}</Btn>;
};
