import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks } from "../reducers/tasks";
import { Button } from "./reusable-components/Buttons";

import { API_URL } from "../utils/urls";

const Tasks = () => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const tasks = useSelector((store) => store?.tasks?.tasks?.response);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTasks(accessToken));
	}, []);

	const addTask = () => {
		const options = {
			method: "POST",
			headers: { Authorization: accessToken, userId, taskId: tasks._id },
		};

		fetch(API_URL("/tasks/checked-tasks"), options)
			.then((res) => res.json())
			.then((data) => {
				console.log("in add task", data);
				dispatch(tasks.actions.setTasks(data));
			});
	};

	return (
		<>
			<h1>Tasks</h1>
			{tasks?.length &&
				tasks.map((task) => (
					<div key={task._id}>
						<p>{task.title}</p>
						<Button onClick={addTask}>Delete</Button>
					</div>
				))}
		</>
	);
};

export default Tasks;
