import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderH1 = styled.h1`
  display: inline-flex;
  margin-left: 20%;
`;

export const InlineH1 = styled.h1`
  display: inline;
`;

export const StyledH2 = styled.h2`
  font-size: 22px;
  margin: 0px;
`;

export const StyledH2Green = styled.h2`
  color: ${(props) => props.theme.darkGreen};
`;

export const StyledA = styled.a`
  display: flex;
  text-decoration: none;
  display: inline;
  margin-left: 10px;
  color: ${(props) => props.theme.darkGreen};
  :hover {
    color: ${(props) => props.theme.darkGreen};
    text-shadow: 1px 1px ${(props) => props.theme.superDarkGreen};
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  display: inline;
  margin-left: 10px;
  color: ${(props) => props.theme.darkGreen};
  :hover {
    color: ${(props) => props.theme.darkGreen};
    text-shadow: 1px 1px ${(props) => props.theme.superDarkGreen};
  }
`;

export const StyledP = styled.p`
  color: ${(props) => props.theme.superDarkGreen};
  display: block;
  margin-block-start: auto;
`;

export const InlineP = styled.p`
  display: inline;
  font-size: 20px;
  margin-left: 15px;
`;
