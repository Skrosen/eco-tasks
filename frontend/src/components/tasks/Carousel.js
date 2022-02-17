import styled from "styled-components";

export const Carousel = styled.section`
	margin: 0 auto;
	overflow: hidden;
	text-align: center;
	border-radius: 10px;
`;

export const Slides = styled.div`
	background-color: ${(props) => props.theme.hoverBeige};
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const OuterCard = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 10px;
	margin: 10px;
	overflow-x: scroll;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	scrollbar-width: none;

	::-webkit-scrollbar {
		display: flex;
		height: 1.3rem;
	}

	::-webkit-scrollbar-button {
		display: flex;
		background-size: 100%;
		-webkit-box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}

	::-webkit-scrollbar-button:start {
		display: block;
		width: 30px;
	}

	::-webkit-scrollbar-button:end {
		display: none;
	}

	::-webkit-scrollbar-button:horizontal:increment {
		/* Right */
		background-image: url("https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
	}

	::-webkit-scrollbar-button:horizontal:decrement {
		/* Left */
		background-image: url("https://images.unsplash.com/photo-1525081905268-fc0b46e9d786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
	}
`;

export const Card = styled.div`
	background-color: ${(props) => props.theme.darkGreen};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	padding: 5px;
	min-width: 50%;
	max-width: 60%;
	height: 250px;
	flex-shrink: 0;
	flex-basis: min-content;
	position: relative;
	transform: scale(1);
	transform-origin: center center;
	transition: transform 0.5s;
	scroll-snap-align: start;
	margin-bottom: 10px;

	@media (min-width: 768px) {
		min-width: 30%;
	}
`;

export const Pdiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: auto;
	height: 100%;
	overflow: scroll;

	/* Hide scrollbar for Chrome, Safari and Opera */
	::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	::-webkit-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

export const Title = styled.h3`
	display: inline-flex;
	align-items: center;
	justify-content: center;
`;

export const Description = styled.p`
	display: flex;
`;
