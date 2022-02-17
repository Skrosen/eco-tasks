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

export const StyledANoMargin = styled.a`
	display: flex;
	text-decoration: none;
	display: inline;
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
	display: block;
	font-size: 20px;

	@media (min-width: 768px) {
		display: inline;
		margin-left: 15px;
	}
`;

export const InlineP2 = styled.p`
	display: inline;
`;

export const SmallP = styled.p`
	font-size: 12px;
	margin-bottom: 15px;
	margin-top: 0;
`;
