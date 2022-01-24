import React from "react";
import styled from "styled-components/macro";

const Btn = styled.button`
	position: relative;
	display: inline-block;
	margin: 10px;
	padding: 10px 10px;
	text-align: center;
	font-family: inherit;
	font-size: 24px;
	letter-spacing: 1px;
	text-decoration: none;
	color: rgb(114, 84, 38);
	background: rgba(114, 84, 38, 0.3);
	cursor: pointer;
	transition: ease-out 0.5s;
	border-radius: 30px;
	border: 2px solid rgb(114, 84, 38);
	border-radius: 10px;
	box-shadow: inset 0 0 0 0 rgb(114, 84, 38);

	&:hover {
		color: white;
		box-shadow: inset 0 -100px 0 0 rgb(114, 84, 38);
	}

	&:active {
		transform: scale(0.9);
	}
`;

export const Button = ({ text }) => {
	return <Btn>{text}</Btn>;
};
