import styled from "styled-components";

export const Carousel = styled.div`
	margin: 0 auto;
	overflow: hidden;
	text-align: center;
`;

export const CarouselNav = styled.div`
	padding: 1.25rem 0.5rem;
`;

export const Slides = styled.div`
	background-color: ${(props) => props.theme.hoverBeige};
	display: flex;
	flex-direction: column;
`;

export const Card = styled.div`
	align-items: center;
	border-radius: 10px;
	display: flex;
	flex-shrink: 0;
	height: 60px;
	justify-content: center;
	margin: 0 1rem;
	position: relative;
	transform: scale(1);
	transform-origin: center center;
	transition: transform 0.5s;
	width: 100%;
	background-color: ${(props) => props.theme.darkGreen};
`;

export const SliderNav = styled.a`
	align-items: center;
	background-color: #ddd;
	border-radius: 50%;
	color: #000;
	display: inline-flex;
	height: 1.5rem;
	justify-content: center;
	padding: 0.5rem;
	position: relative;
	text-decoration: none;
	width: 1.5rem;

	:hover,
	:active {
		background-color: #000;
		color: #fff;
	}
`;
