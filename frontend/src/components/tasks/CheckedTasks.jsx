import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { fetchCheckedTasks } from "../../reducers/checkedTasks";
import checkedTasks from "../../reducers/checkedTasks";

import { InlineP2, SmallP, StyledP } from "../reusable-components/Text";
import { Button } from "../reusable-components/Buttons";

import { API_URL } from "../../utils/urls";

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
				dispatch(checkedTasks.actions.setCheckedTasks(data));
				dispatch(fetchCheckedTasks(accessToken, userId));
			});
	};

	return (
		<>
			<h2>Checked Tasks</h2>
			<StyledP>
				Here you can find all your completed tasks. Delete a task by pressing
				the trashcan button.
			</StyledP>
			{allCheckedTasks &&
				Array.isArray(allCheckedTasks) &&
				allCheckedTasks.map((task) => (
					<div key={task._id}>
						<InlineP2>{task.taskId.title}</InlineP2>
						<Button onClick={() => deleteTask(task._id)} text="&#128465;" />
						<SmallP>Checked at: {moment(task.checkedAt).format("LL")}</SmallP>
					</div>
				))}
		</>
	);
};

export default CheckedTasks;
