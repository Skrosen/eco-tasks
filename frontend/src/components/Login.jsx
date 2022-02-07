import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import countryList from "react-select-country-list";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

// Styling
import { LoginContainer, Form } from "./reusable-components/Containers";
import { Button } from "./reusable-components/Buttons";
import { TextInput } from "./reusable-components/Inputs";
import PopUp from "./reusable-components/PopUp";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [description, setDescription] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [mode, setMode] = useState("login");
	const [showPopUp, setShowPopUp] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [tabIndex, setTabIndex] = useState(1);

	let accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const countryOptions = useMemo(() => countryList().getData(), []);

	// checks if user is authorized, otherwise sends user to login page
	useEffect(() => {
		if (accessToken) {
			navigate("/tasks");
		}
	}, [accessToken, navigate]);

	const changeMode = (index) => {
		if (index === 1) {
			setMode("login");
		} else {
			setMode("sign-up");
		}
	};

	const changeHandler = (country) => {
		setCountry(country);
	};

	const onFormSubmit = (event) => {
		event.preventDefault();
		setShowPopUp(false);
		let options = {};

		if (tabIndex === 0) {
			options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
					firstName,
					lastName,
					description,
					email,
					country: country.label,
					city,
				}),
			};
		} else {
			options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			};
		}

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success && tabIndex === 0) {
					alert(
						`Welcome ${data.response.username}, your account has been created!`
					); // welcomes new users who just signed up
					setUsername("");
					setPassword("");
					setFirstName("");
					setLastName("");
					setDescription("");
					setEmail("");
					setCountry();
					setCity("");
				} else if (data.success && tabIndex === 1) {
					dispatch(user.actions.setUserInfo(data.response));
					setUsername("");
					setPassword("");
					setFirstName("");
					setLastName("");
					setDescription("");
					setEmail("");
					setCountry();
					setCity("");
				} else {
					// dispatch(user.actions.setError(data.response));
					setErrorMessage(data.message);
					setShowPopUp(true);
				}
			});
	};

	return (
		<LoginContainer>
			<PopUp header={"Whoopsie!"} text={errorMessage} open={showPopUp} />
			<Tabs
				selectedIndex={tabIndex}
				onSelect={(index) => {
					setTabIndex(index);
					changeMode(index);
				}}
			>
				<TabList>
					<Tab>
						<h2>Sign-up</h2>
					</Tab>
					<Tab>
						<h2>Login</h2>
					</Tab>
				</TabList>

				<TabPanel>
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
						<label htmlFor="firstName"></label>
						<TextInput
							id="firstName"
							type="text"
							placeholder="First name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<label htmlFor="lastName"></label>
						<TextInput
							id="lastName"
							type="text"
							placeholder="Last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<label htmlFor="description"></label>
						<TextInput
							id="description"
							type="text"
							placeholder="Write something about yourself"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<label htmlFor="email"></label>
						<TextInput
							id="email"
							type="email"
							placeholder="example@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="country"></label>
						<Select
							options={countryOptions}
							value={country}
							onChange={changeHandler}
						/>
						<label htmlFor="city"></label>
						<TextInput
							id="city"
							type="text"
							placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<Button type="submit" text="sign-up" />
					</Form>
				</TabPanel>
				<TabPanel>
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
						<Button type="submit" text="login" />
					</Form>
				</TabPanel>
			</Tabs>
		</LoginContainer>
	);
};

export default Login;
