import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	padding: 0;
	margin: 0;

	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	z-index: 4;
	background: rgba(255, 255, 255, 0.8);
`;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const LoadingSpinner = styled.div`
	width: 100px;
	height: 100px;
	animation: ${spin} 1.2s linear infinite;

	&:after {
		content: " ";
		display: block;
		width: 80px;
		height: 80px;

		border-radius: 50%;
		border: 6px solid ${(props) => props.theme.darkGreen};
		border-color: ${(props) => props.theme.darkGreen} transparent
			${(props) => props.theme.darkGreen} transparent;
	}
`;

const Loader = () => {
	return (
		<LoaderContainer>
			<LoadingSpinner />
		</LoaderContainer>
	);
};

export default Loader;
