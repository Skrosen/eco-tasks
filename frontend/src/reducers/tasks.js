import { createSlice } from "@reduxjs/toolkit";
import { ui } from "./ui";
import { API_URL } from "../utils/urls";

const tasks = createSlice({
	name: "tasks",
	initialState: {
		tasks: [],
		error: null,
	},
	reducers: {
		setTasks: (store, action) => {
			store.tasks = action.payload;
		},
	},
});

export const fetchTasks = (accessToken) => {
	const options = {
		headers: { Authorization: accessToken },
	};
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		fetch(API_URL("tasks/all-tasks"), options)
			.then((res) => res.json())
			.then((json) => {
				dispatch(tasks.actions.setTasks(json));
				dispatch(ui.actions.setLoading(false));
			});
	};
};

export default tasks;
