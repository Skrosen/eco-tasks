import styled from "styled-components";

export const Carousel = styled.section`
	margin: 0 auto;
	overflow: hidden;
	text-align: center;
`;

export const Slides = styled.div`
	background-color: ${(props) => props.theme.hoverBeige};
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow-x: scroll;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
`;

export const OuterCard = styled.div`
	height: fit-content;
	display: table;
	width: 100%;
	align-items: flex-start;
	justify-content: center;
	gap: 10px;
`;

export const Card = styled.div`
	background-color: ${(props) => props.theme.darkGreen};
	align-items: center;
	text-align: center;
	border-radius: 10px;
	display: inline-grid;
	display: table-cell;
	flex-shrink: 0;
	height: 100%;
	padding: 2px;
	max-width: 20%;
	flex-shrink: 0;
	flex-basis: min-content;
	align-items: center;
	justify-content: center;
	position: relative;
	transform: scale(1);
	transform-origin: center center;
	transition: transform 0.5s;
	scroll-snap-align: start;
`;
