import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { bool } from "prop-types";

import { Button } from "../reusable-components/Buttons";

import user from "../../reducers/user";

const StyledMenu = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 2;
	background: ${(props) => props.theme.superDarkGreen};
	transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
	text-align: left;
	padding: 2rem;
	position: absolute;
	top: 0;
	left: 0;
	transition: transform 0.3s ease-in-out;
	border-radius: 0 0 10px 0;

	a {
		font-size: 1.2rem;
		text-transform: uppercase;
		padding: 2rem 0;
		font-weight: bold;
		letter-spacing: 0.5rem;
		color: white;
		text-decoration: none;
		transition: color 0.3s linear;

		&:hover {
			color: black;
		}

		&:first-child {
			margin-top: 60px;
		}
	}
	@media (min-width: 668px) {
		a {
			font-size: 2rem;
		}
	}
`;

const HamburgerContent = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signedInUser = useSelector((store) => store.user);

	const Logout = () => {
		dispatch(user.actions.setInitialState());
		navigate("/login");
	};

	return (
		<StyledMenu open={open}>
			{!signedInUser.username && (
				<Link
					to={{
						pathname: "/login",
					}}
					onClick={() => setOpen(false)}
				>
					<span role="img" aria-label="about us">
						&#128273;
					</span>{" "}
					Login
				</Link>
			)}

			{signedInUser.username && (
				<>
					<Link
						to={{
							pathname: `/userprofile`,
						}}
						onClick={() => setOpen(false)}
					>
						<span role="img" aria-label="about us">
							&#127969;
						</span>{" "}
						Profile
					</Link>
					<Link
						to={{
							pathname: "/tasks",
						}}
						onClick={() => setOpen(false)}
					>
						<span role="img" aria-label="about us">
							&#9989;
						</span>{" "}
						Tasks
					</Link>{" "}
					<Link
						to={{
							pathname: "/leaderboard",
						}}
						onClick={() => setOpen(false)}
					>
						<span role="img" aria-label="about us">
							&#127882;
						</span>{" "}
						Leaderboard
					</Link>
					<Link
						to={{
							pathname: "/eco-facts",
						}}
						onClick={() => setOpen(false)}
					>
						<span role="img" aria-label="about us">
							&#127757;
						</span>{" "}
						Ecofacts
					</Link>
					<Button
						text="Logout"
						onClick={() => {
							Logout();
							setOpen(false);
						}}
					/>
				</>
			)}
		</StyledMenu>
	);
};
HamburgerContent.propTypes = {
	open: bool.isRequired,
};
export default HamburgerContent;
