import React from "react";

import { MainContainer } from "./reusable-components/Containers";

const Main = () => {
  return (
    <MainContainer>
      <h1>Welcome to EcoTasks</h1>
      <p>
        Do you struggle to find what you can do for the environment in
        your day-to-day life? &#9989;
      </p>
      <p>
        Do you want to keep track of what you have done for the
        environment, while getting points for every task you perform?
        &#9989;
      </p>
      <p>
        Then welcome to EcoTasks! We have gathered several different
        tasks which have an positive impact on the environment. You
        can also find information on why they are good tasks to do,
        and see other users scores at the leaderboard.
      </p>
    </MainContainer>
  );
};

export default Main;
