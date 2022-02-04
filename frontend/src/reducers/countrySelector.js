import { createSlice } from "@reduxjs/toolkit";

const countrySelector = createSlice({
	name: "countrySelector",
	initialState: {
		country: null,
		error: null,
	},
	reducers: {
		setCountry: (store, action) => {
			store.country = action.payload;
		},
	},
});

export default countrySelector;
