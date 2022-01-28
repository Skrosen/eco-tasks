import { createSlice } from "@reduxjs/toolkit";
import { ui } from "./ui";
import { API_URL } from "../utils/urls";
import { useSelector } from "react-redux";

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
		// setCurrentStep: (store, action) => {
		// 	store.currentStep = action.payload;
		// },
		// setSteps: (store, action) => {
		// 	let latestStep = action.payload;
		// 	latestStep = { ...latestStep, id: id };
		// 	store.steps.push(latestStep);
		// },
		// setStartPosition: (store, action) => {
		// 	store.startingPosition = action.payload;
		// },
		// setHistory: (store, action) => {
		// 	const latestStep = {
		// 		...store.currentStep,
		// 		directionTaken: action.payload,
		// 	};
		// 	store.steps.push(latestStep);
		// },
		// setInitialState: () => {
		// 	return initialState;
		// },
	},
});

export const fetchTasks = (accessToken) => {
	console.log("acessTOken", accessToken);
	const options = {
		headers: { Authorization: accessToken },
	};
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		fetch(API_URL("tasks/all-tasks"), options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				dispatch(tasks.actions.setTasks(json));
				dispatch(ui.actions.setLoading(false));
			});
	};
};

// export const fetchSteps = (direction) => {
// 	return (dispatch, getState) => {
// 		dispatch(ui.actions.setLoading(true));
// 		const state = getState();
// 		dispatch(steps.actions.setHistory(direction));

// 		const infoToAPI = {
// 			username: state.steps.username,
// 			type: "move",
// 			direction: direction,
// 		};
// 		const options = {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(infoToAPI),
// 		};

// 		fetch("https://wk16-backend.herokuapp.com/action", options)
// 			.then((res) => res.json())
// 			.then((json) => {
// 				dispatch(steps.actions.setCurrentStep(json));
// 				dispatch(ui.actions.setLoading(false));
// 			});
// 	};
// };

export default tasks;
