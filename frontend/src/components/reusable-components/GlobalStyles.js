import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "rubik";
  	background-color: #fff8e1;
  }
  `;

// Define what props.theme will look like
export const theme = {
  backgroundTransparent: "rgba(215, 255, 217, 0.3)",
  lightGreen: "rgb(215, 255, 217)",
  mediumGreen: "rgb(165, 214, 167)",
  darkGreen: "rgb(117, 164, 120)",
  superDarkGreen: "rgb(0, 61, 0)",
  greyGreen: "rgb(59, 85, 59)",
  hoverBeige: "rgb(255, 248, 225)",
};
