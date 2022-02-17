import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../../utils/urls";
import { Button } from "../reusable-components/Buttons";
import { Form } from "../reusable-components/Containers";
import { TextInput } from "../reusable-components/Inputs";
import user from "../../reducers/user";
import { ui } from "../../reducers/ui";

const EditProfileForm = (props) => {
	const { setMode } = props;

	const signedInUser = useSelector((store) => store.user);
	const [firstName, setFirstName] = useState(signedInUser.firstName);
	const [lastName, setLastName] = useState(signedInUser.lastName);
	const [description, setDescription] = useState(signedInUser.description);
	const [email, setEmail] = useState(signedInUser.email);
	const [country, setCountry] = useState(signedInUser.country);
	const [city, setCity] = useState(signedInUser.city);

	const dispatch = useDispatch();

	const countryOptions = useMemo(() => countryList().getData(), []);

	const updateUserProfile = async (event) => {
		dispatch(ui.actions.setLoading(true));
		event.preventDefault();

		const options = {
			method: "PATCH",
			headers: {
				Authorization: signedInUser.accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				description: description,
				email: email,
				country: country,
				city: city,
			}),
		};
		await fetch(API_URL(`user/${signedInUser.userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(user.actions.setUserInfo(data.response));
				}
				dispatch(ui.actions.setLoading(false));
			});
	};

	const changeHandler = (country) => {
		setCountry(country);
	};

	const setDelete = () => {
		setMode("delete");
	};

	return (
		<Form onSubmit={updateUserProfile}>
			<label htmlFor="firstName">First name</label>
			<TextInput
				id="firstName"
				type="text"
				placeholder={signedInUser.firstName}
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<label htmlFor="lastName">Last name</label>
			<TextInput
				id="lastName"
				type="text"
				placeholder={signedInUser.lastName}
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<label htmlFor="description">Description</label>
			<TextInput
				id="description"
				type="text"
				placeholder={signedInUser.description}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<label htmlFor="email">Email</label>
			<TextInput
				id="email"
				type="email"
				placeholder={signedInUser.email}
				value={email}
				onChange={(e) => setEmail(e.target.value.trim())}
			/>
			<label htmlFor="country">Country</label>
			<Select
				options={countryOptions}
				placeholder={signedInUser.country}
				value={country}
				onChange={changeHandler}
			/>
			<label htmlFor="city">City</label>
			<TextInput
				id="city"
				type="text"
				placeholder={signedInUser.city}
				value={city}
				onChange={(e) => setCity(e.target.value)}
			/>
			<Button type="submit" text="Update" />
			<Button type="button" text="Delete my profile" onClick={setDelete} />
		</Form>
	);
};

export default EditProfileForm;
