import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCheckedTasks } from "../reducers/checkedTasks";
import checkedTasks from "../reducers/checkedTasks";

import { Button } from "./reusable-components/Buttons";

import { API_URL } from "../utils/urls";

const CheckedTasks = () => {
  const accessToken = useSelector(
    (store) => store?.user?.accessToken
  );
  const userId = useSelector((store) => store?.user?.userId);
  const allCheckedTasks = useSelector(
    (store) => store?.checkedTasks?.checkedTasks
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  // 	if (confirmDelete) {
  // 		deleteTask();
  // 	}
  // }, []);

  useEffect(() => {
    dispatch(fetchCheckedTasks(accessToken, userId));
  }, [dispatch, accessToken, userId]);

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

  console.log("allcheckedtasks", allCheckedTasks);

  return (
    <>
      <h1>Checked Tasks</h1>
      {/* {allCheckedTasks &&
        Array.isArray(allCheckedTasks) &&
        allCheckedTasks.map((task) => (
          <div key={task._id}>
            <p>{task.taskId.title}</p> */}
      {/* <Button onClick={confirmDelete}>Delete</Button> */}
      {/* </div>
        ))} */}
    </>
  );
};

export default CheckedTasks;
