import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCheckedTasks } from "../reducers/checkedTasks";
import checkedTasks from "../reducers/checkedTasks";

import { Button } from "./reusable-components/Buttons";

import { API_URL } from "../utils/urls";

const CheckedTasks = () => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const allCheckedTasks = useSelector(
		(store) => store.checkedTasks.checkedTasks
	);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (confirmDelete) {
	// 		deleteTask();
	// 	}
	// }, []);

	useEffect(() => {
		dispatch(fetchCheckedTasks(accessToken, userId));
	}, []);

	// const confirmDelete = () => {
	// 	// are u sure u want to delete? Y / N
	// };

	// const deleteTask = () => {
	// 	const options = {
	// 		method: "DELETE",
	// 		headers: { Authorization: accessToken },
	// 	};

	// 	fetch(API_URL("/user/checked-tasks"), options)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			dispatch(checkedTasks.actions.setCheckedTasks(data));
	// 		});
	// };

	return (
		<>
			<h1>Checked Tasks</h1>
			{allCheckedTasks?.length &&
				allCheckedTasks.map((tasks) => (
					<div key={allCheckedTasks._id}>
						<p>{tasks.title}</p>
						{/* <Button onClick={confirmDelete}>Delete</Button> */}
					</div>
				))}
		</>
	);
};

export default CheckedTasks;
