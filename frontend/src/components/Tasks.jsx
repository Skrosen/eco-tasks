import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTasks } from "../reducers/tasks";
import { fetchCheckedTasks } from "../reducers/checkedTasks";
import { Button } from "./reusable-components/Buttons";

import { API_URL } from "../utils/urls";

import checkedTasks from "../reducers/checkedTasks";

const Tasks = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(
    (store) => store?.user?.accessToken
  );
  const userId = useSelector((store) => store?.user?.userId);
  const tasks = useSelector((store) => store?.tasks?.tasks?.response);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchTasks(accessToken));
  }, []);

  const addTask = async (taskId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ userId: userId, taskId: taskId }),
    };
    const optionsPatch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ taskId: taskId }),
    };

    await fetch(API_URL("tasks/checked-tasks"), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(checkedTasks.actions.appendCheckedTask(data));
      });
    await fetch(API_URL(`user/${userId}/score`), optionsPatch).then(
      (res) => res.json().then((data) => console.log(data))
    );
    dispatch(fetchCheckedTasks(accessToken, userId));
  };

  return (
    <>
      <h1>All tasks</h1>
      {tasks &&
        Array.isArray(tasks) &&
        tasks?.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>
            <Button
              onClick={() => addTask(task._id)}
              text="done"
            ></Button>
          </div>
        ))}
    </>
  );
};

export default Tasks;
