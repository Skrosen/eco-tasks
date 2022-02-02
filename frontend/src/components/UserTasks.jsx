import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckedTasks from "./CheckedTasks";
import Tasks from "./Tasks";
import { MainContainer } from "./reusable-components/Containers";

const UserTasks = () => {
  return (
    <MainContainer>
      <CheckedTasks />
      <Tasks />
    </MainContainer>
  );
};

export default UserTasks;
