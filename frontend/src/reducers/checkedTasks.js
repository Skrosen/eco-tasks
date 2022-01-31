import { createSlice } from "@reduxjs/toolkit";
import { ui } from "./ui";
import { API_URL } from "../utils/urls";

import CheckedTasks from "../components/CheckedTasks";

const checkedTasks = createSlice({
	name: "checkedTasks",
	initialState: {
		tasks: [],
		error: null,
	},
	reducers: {
		setCheckedTasks: (store, action) => {
			store.checkedTasks = action.payload;
		},
	},
});

export const fetchCheckedTasks = (accessToken, userId) => {
	console.log("in fetchCheckedTasks", accessToken, userId);
	const options = {
		headers: { Authorization: accessToken },
	};
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		fetch(API_URL("tasks/checked-tasks"), options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				dispatch(checkedTasks.actions.setCheckedTasks(json));
				dispatch(ui.actions.setLoading(false));
			});
	};
};

export default checkedTasks;
