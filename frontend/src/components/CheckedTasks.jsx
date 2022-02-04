import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCheckedTasks } from "../reducers/checkedTasks";
import checkedTasks from "../reducers/checkedTasks";

import { Button } from "./reusable-components/Buttons";
import PopUp from "./reusable-components/PopUp";

import { API_URL } from "../utils/urls";

const CheckedTasks = () => {
	const accessToken = useSelector((store) => store?.user?.accessToken);
	const userId = useSelector((store) => store?.user?.userId);
	const allCheckedTasks = useSelector(
		(store) => store?.checkedTasks?.checkedTasks
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCheckedTasks(accessToken, userId));
	}, [dispatch, accessToken, userId]);

	const deleteTask = (taskId) => {
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ checkedTaskId: taskId }),
		};

		fetch(API_URL("tasks/checked-tasks"), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				dispatch(checkedTasks.actions.setCheckedTasks(data));
				dispatch(fetchCheckedTasks(accessToken, userId));
			});
	};

	return (
		<>
			<h1>Checked Tasks</h1>
			{allCheckedTasks &&
				Array.isArray(allCheckedTasks) &&
				allCheckedTasks.map((task) => (
					<div key={task._id}>
						<p>{task.taskId.title}</p>
						<Button onClick={() => deleteTask(task._id)}>Delete</Button>
					</div>
				))}
		</>
	);
};

export default CheckedTasks;
