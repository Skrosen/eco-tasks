import React from "react";
import { batch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "./reusable-components/Buttons";

import user from "../reducers/user";

const Menu = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const Logout = () => {
		dispatch(user.actions.setInitialState());
		navigate("/login");
	};
	return (
		<>
			<Button text="Logout" onClick={Logout} />
		</>
	);
};

export default Menu;
