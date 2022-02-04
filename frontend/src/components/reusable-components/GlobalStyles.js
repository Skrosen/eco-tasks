import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "rubik";
  	background-color: #fff8e1;
  }
  `;
// background-image: linear-gradient(
//   20deg,
//   hsl(141deg 54% 60%) 0%,
//   hsl(141deg 54% 66%) 9%,
//   hsl(141deg 55% 72%) 18%,
//   hsl(141deg 55% 78%) 27%,
//   hsl(141deg 57% 82%) 37%,
//   hsl(141deg 60% 84%) 46%,
//   hsl(141deg 65% 86%) 55%,
//   hsl(141deg 71% 88%) 64%,
//   hsl(140deg 74% 90%) 73%,
//   hsl(139deg 74% 94%) 82%,
//   hsl(139deg 75% 97%) 91%,
//   hsl(0deg 0% 100%) 100%
// );

// Define what props.theme will look like
export const theme = {
	backgroundTransparent: "rgba(215, 255, 217, 0.3)",
	lightGreen: "rgba(215, 255, 217)",
	mediumGreen: "rgb(165, 214, 167)",
	darkGreen: "rgb(117, 164, 120)",
	superDarkGreen: "rgb(0, 61, 0)",
	hoverBeige: "rgb(255, 248, 225)",
};
