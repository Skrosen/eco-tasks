import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks } from "../reducers/tasks";

const Tasks = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((store) => store?.tasks?.tasks?.response);
	useEffect(() => {
		dispatch(fetchTasks());
	}, []);
	return (
		<>
			<h1>Tasks hello</h1>
			{tasks?.length &&
				tasks.map((task) => <p key={task.title}>{task.title}</p>)}
		</>
	);
};

export default Tasks;
