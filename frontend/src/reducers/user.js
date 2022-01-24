import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";

import { API_URL } from "../utils/urls";

const user = createSlice({
	name: "user",
	initialState: {
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
	},
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload;
		},
		setUsername: (store, action) => {
			store.username = action.payload;
		},
		setFirstName: (store, action) => {
			store.firstName = action.payload;
		},
		setLastName: (store, action) => {
			store.lastName = action.payload;
		},
		setDescription: (store, action) => {
			store.description = action.payload;
		},
		setEmail: (store, action) => {
			store.email = action.payload;
		},
		setCountry: (store, action) => {
			store.country = action.payload;
		},
		setCity: (store, action) => {
			store.city = action.payload;
		},
		setRole: (store, action) => {
			store.role = action.payload;
		},
		setScore: (store, action) => {
			store.score = action.payload;
		},
		setCreatedAt: (store, action) => {
			store.createdAt = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});
export default user;

export const fetchUser = (username) => {
	return (dispatch) => {
		fetch(API_URL(`user/${username}`))
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
