import { createSlice } from "@reduxjs/toolkit";
import { ui } from "./ui";
import { API_URL } from "../utils/urls";
import moment from "moment";

const checkedTasks = createSlice({
  name: "checkedTasks",
  initialState: {
    checkedTasks: [],
    error: null,
  },
  reducers: {
    setCheckedTasks: (store, action) => {
      store.checkedTasks = action.payload;
    },
    appendCheckedTask: (store, action) => {
      store.checkedTasks.push(action.payload.response);
    },
  },
});

export const fetchCheckedTasks = (accessToken, userId) => {
  const options = {
    headers: { Authorization: accessToken, userId: userId },
  };
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL("tasks/checked-tasks"), options)
      .then((res) => res.json())
      .then((json) => {
        const sortedList = json.response.sort(
          (a, b) =>
            moment(b.checkedAt).format("YYYYMMDD") -
            moment(a.checkedAt).format("YYYYMMDD")
        );
        dispatch(checkedTasks.actions.setCheckedTasks(sortedList));
        dispatch(ui.actions.setLoading(false));
      });
  };
};

export default checkedTasks;
