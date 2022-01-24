import React, { useState, useEffect } from "react";
import { useSelector, batch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

// Styling
import { Button } from "./reusable-components/Button";
import styled from "styled-components";

const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ModeContainer = styled.form`
	display: flex;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
`;

const TextInput = styled.input`
	padding: 5px;
	border-radius: 5px;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState("signup");

	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// checks if user is authorized, otherwise sends user to login page
	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		event.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUserId(data.response.userId));
						dispatch(user.actions.setUsername(data.response.username));
						dispatch(user.actions.setAccessToken(data.response.accessToken));
						dispatch(user.actions.setError(null));
					});
					mode === "signup" &&
						alert(
							`Welcome ${data.response.username}, your account has been created and you are now logged in!`
						); // welcomes new users who just signed up
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setError(data.response));
					});
					alert(data.response); // returns error message
				}
			});
	};

	return (
		<LoginContainer>
			<ModeContainer>
				<label htmlFor="signup">Sign-up</label>
				<input
					id="signup"
					type="radio"
					checked={mode === "signup"}
					onChange={() => setMode("signup")}
				/>
				<label htmlFor="signin">Sign-in</label>
				<input
					id="signin"
					type="radio"
					checked={mode === "signin"}
					onChange={() => setMode("signin")}
				/>
			</ModeContainer>
			<Form onSubmit={onFormSubmit}>
				<label htmlFor="username"></label>
				<TextInput
					id="username"
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password"></label>
				<TextInput
					id="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit">Submit</Button>
			</Form>
		</LoginContainer>
	);
};

export default Login;
