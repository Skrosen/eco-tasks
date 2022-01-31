import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckedTasks from "./CheckedTasks";
import Tasks from "./Tasks";

const UserTasks = () => {
	return (
		<>
			<CheckedTasks />
			<Tasks />
		</>
	);
};

export default UserTasks;
