import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";
import { ui } from "../reducers/ui";

import { LoginContainer, Form } from "./reusable-components/Containers";
import { Button } from "./reusable-components/Buttons";
import { TextInput } from "./reusable-components/Inputs";
import { StyledH2 } from "./reusable-components/Text";
import PopUp from "./reusable-components/PopUp";

const STabList = styled(TabList)`
	list-style: none;
	padding-bottom: 4px;
	padding-left: 0px;
	display: flex;
	justify-content: center;
	margin: 0;
`;
STabList.tabsRole = "TabList";

const STab = styled(Tab)`
	display: flex;
	justify-content: center;
	padding: 10px;
	user-select: none;
	width: 50%;

	cursor: arrow;

	&.is-selected {
		color: black;
		background: white;
		border: 1px solid #0000002b;
		border-radius: 5px 5px 0 0;
		border-bottom: 1px solid white;
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.5);
	}
`;
STab.tabsRole = "Tab";

const STabPanel = styled(TabPanel)`
	display: none;
	border: 1px solid #0000002b;
	border-radius: 0 0 5px 5px;
	padding-top: 4px;
	margin-top: -5px;
	background-color: white;

	&.is-selected {
		display: block;
	}
`;
STabPanel.tabsRole = "TabPanel";

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
	const [header, setHeader] = useState("Alert");
	const [message, setMessage] = useState("");
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
		dispatch(ui.actions.setLoading(true));
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
					setMessage(
						`Welcome ${data.response.username}, your account has been created!`
					);
					setHeader("Yay!");
					setUsername("");
					setPassword("");
					setFirstName("");
					setLastName("");
					setDescription("");
					setEmail("");
					setCountry();
					setCity("");
					setShowPopUp(true);
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
					setMessage(data.message);
					setHeader("Whoopsie");
					setShowPopUp(true);
				}
				dispatch(ui.actions.setLoading(false));
			});
	};

	return (
		<LoginContainer>
			<PopUp
				setShowPopUp={setShowPopUp}
				header={header}
				text={message}
				open={showPopUp}
			/>
			<Tabs
				selectedIndex={tabIndex}
				onSelect={(index) => {
					setTabIndex(index);
					changeMode(index);
				}}
				selectedTabClassName="is-selected"
				selectedTabPanelClassName="is-selected"
			>
				<STabList>
					<STab>
						<StyledH2>Sign-up</StyledH2>
					</STab>
					<STab>
						<StyledH2>Login</StyledH2>
					</STab>
				</STabList>

				<STabPanel>
					<Form onSubmit={onFormSubmit}>
						<label htmlFor="username"></label>
						<TextInput
							id="username"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value.trim())}
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
							onChange={(e) => setEmail(e.target.value.trim())}
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
				</STabPanel>
				<STabPanel>
					<Form onSubmit={onFormSubmit}>
						<label htmlFor="username"></label>
						<TextInput
							id="username"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value.trim())}
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
				</STabPanel>
			</Tabs>
		</LoginContainer>
	);
};

export default Login;
