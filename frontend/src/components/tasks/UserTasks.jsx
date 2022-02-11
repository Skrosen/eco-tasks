import React from "react";

import CheckedTasks from "./CheckedTasks";
import Tasks from "./Tasks";
import { MainContainer } from "../reusable-components/Containers";

const UserTasks = () => {
	return (
		<MainContainer>
			<Tasks />
			<CheckedTasks />
		</MainContainer>
	);
};

export default UserTasks;
