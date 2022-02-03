import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { fetchTasks } from "../reducers/tasks";
import { fetchCheckedTasks } from "../reducers/checkedTasks";
import { Button } from "./reusable-components/Buttons";

import { API_URL } from "../utils/urls";

import checkedTasks from "../reducers/checkedTasks";

import {
  Carousel,
  CarouselNav,
  Slides,
  Card,
  SliderNav,
} from "./cards/Card";

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
    console.log(taskId);
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
    await fetch(API_URL(`user/${userId}/score`), optionsPatch)
      .then((res) => res.json())
      .then((data) => console.log(data));
    dispatch(fetchCheckedTasks(accessToken, userId));
  };

  const categorizedTasks = _(tasks)
    .groupBy("category")
    .map((tasks, category) => ({
      category,
      tasks: tasks.map((o) =>
        _.omit(o, ["category", "createdAt", "updatedAt"])
      ),
    }))
    .value();

  console.log("categorized tasks", categorizedTasks);

  return (
    <>
      <h1>All tasks</h1>
      <Carousel>
        <Slides>
          {categorizedTasks &&
            Array.isArray(categorizedTasks) &&
            categorizedTasks?.map((task) => (
              <div key={task._id}>
                <h2>{task.category}</h2>
                {task.tasks.map((task) => (
                  <Card key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <Button
                      onClick={() => addTask(task._id)}
                      text="+"
                    ></Button>
                  </Card>
                ))}
              </div>
            ))}
        </Slides>
        <SliderNav></SliderNav>
      </Carousel>
    </>
  );
};

export default Tasks;
