import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";

import { API_URL } from "../utils/urls";

const initialState = {
	userId: null,
	username: null,
	firstName: null,
	lastName: null,
	email: null,
	country: null,
	city: null,
	role: null,
	description: null,
	score: null,
	createdAt: null,
	accessToken: null,
	error: null,
	expiry: null,
};

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo: (store, action) => {
			store.userId = action.payload.userId;
			store.username = action.payload.username;
			store.firstName = action.payload.firstName;
			store.lastName = action.payload.lastName;
			store.description = action.payload.description;
			store.email = action.payload.email;
			store.country = action.payload.country;
			store.city = action.payload.city;
			store.role = action.payload.role;
			store.score = action.payload.score;
			store.createdAt = action.payload.createdAt;
			store.accessToken = action.payload.accessToken;
			store.expiry = new Date().getTime() + 14400000;
		},
		setUserScore: (store, action) => {
			store.score = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload.error;
		},
		setInitialState: (store, action) => {
			return initialState;
		},
	},
});
export default user;

export const fetchUser = (userId, accessToken) => {
	const options = {
		headers: { Authorization: accessToken },
	};
	return (dispatch) => {
		fetch(API_URL(`user/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUserId(data.response.userId));
						dispatch(user.actions.setUsername(data.response.username));
						dispatch(user.actions.setFirstName(data.response.firstName));
						dispatch(user.actions.setLastName(data.response.lastName));
						dispatch(user.actions.setDescription(data.response.description));
						dispatch(user.actions.setEmail(data.response.email));
						dispatch(user.actions.setCountry(data.response.country));
						dispatch(user.actions.setCity(data.response.city));
						dispatch(user.actions.setRole(data.response.role));
						dispatch(user.actions.setScore(data.response.score));
						dispatch(user.actions.setCreatedAt(data.response.createdAt));
						dispatch(user.actions.setAccessToken(data.response.accessToken));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setFirstName(null));
						dispatch(user.actions.setLastName(null));
						dispatch(user.actions.setDescription(null));
						dispatch(user.actions.setEmail(null));
						dispatch(user.actions.setCountry(null));
						dispatch(user.actions.setCity(null));
						dispatch(user.actions.setRole(null));
						dispatch(user.actions.setScore(null));
						dispatch(user.actions.setCreatedAt(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setError(data.response));
					});
				}
			});
	};
};
