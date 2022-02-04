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
`;

export const OuterCard = styled.div`
	height: fit-content;
	display: flex;
	width: 100%;
	align-items: flex-start;
	gap: 10px;
	overflow-x: scroll;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	scrollbar-width: none;
	
	::-webkit-scrollbar {
		display: none;
`;

export const Card = styled.div`
	background-color: ${(props) => props.theme.darkGreen};
	border-radius: 10px;
	display: inline-grid;
	flex-direction: column;
	flex-shrink: 0;
	padding: 5px;
	min-width: 30%;
	max-width: 50%;
	flex-shrink: 0;
	flex-basis: min-content;
	position: relative;
	transform: scale(1);
	transform-origin: center center;
	transition: transform 0.5s;
	scroll-snap-align: start;
`;
