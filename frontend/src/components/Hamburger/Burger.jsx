import styled from "styled-components";
import { bool, func } from "prop-types";

const StyledBurger = styled.button`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: fit-content;
	height: 30px;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 3;

	&:focus {
		outline: none;
	}

	div {
		width: 30px;
		height: 0.25rem;
		background: ${({ open }) => (open ? "black" : "rgb(0, 61, 0)")};
		border-radius: 10px;
		transition: all 0.3s linear;
		transform-origin: 1px;

		:first-child {
			transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
		}

		:nth-child(2) {
			opacity: ${({ open }) => (open ? "0" : "1")};
			transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
		}

		:nth-child(3) {
			transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
		}
	}
	@media (min-width: 768px) {
	}
`;

const Burger = ({ open, setOpen }) => {
	return (
		<StyledBurger open={open} onClick={() => setOpen(!open)}>
			<div />
			<div />
			<div />
		</StyledBurger>
	);
};

Burger.propTypes = {
	open: bool.isRequired,
	setOpen: func.isRequired,
};

export default Burger;
