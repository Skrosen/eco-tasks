import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  animation: ${spin} 1.2s linear infinite;

  &:after {
    content: " ";
    display: block;
    width: 80px;
    height: 80px;
    margin: 8px;
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
