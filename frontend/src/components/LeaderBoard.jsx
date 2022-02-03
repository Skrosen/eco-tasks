import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { API_URL } from "../utils/urls";

import {
  MainContainer,
  FlexRowContainer,
} from "./reusable-components/Containers";
import { Select } from "./reusable-components/Inputs";
import { TimeSpanButton } from "./reusable-components/Buttons";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [topUsers, setTopUsers] = useState([]);
  const [country, setCountry] = useState("");
  const [timeSpan, settimeSpan] = useState("week");
  const [chosenButton, setChosenButton] = useState({
    week: true,
    month: false,
    year: false,
    allTime: false,
  });
  const signedInUser = useSelector((store) => store.user);
  let urlPath = `leaderboard?timeSpan=${timeSpan}`;
  const dateToday = moment(Date.now());

  if (country) {
    urlPath = `leaderboard?timeSpan=${timeSpan}&country=${country}`;
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: signedInUser.accessToken,
    },
  };

  useEffect(async () => {
    await fetch(API_URL(urlPath), options)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.response)) {
          setTopUsers(data.response);
        } else {
          setTopUsers([]);
        }
      });
  }, [country, timeSpan]);

  const onButtonClick = (timeSpan) => {
    settimeSpan(timeSpan);
    setChosenButton({
      week: timeSpan === "week",
      month: timeSpan === "month",
      year: timeSpan === "year",
      allTime: timeSpan === "",
    });
  };

  const calcTime = () => {
    console.log(topUsers[0]);
  };
  calcTime();

  return (
    <MainContainer>
      <FlexRowContainer>
        <h1>Leaderboard &#127881;</h1>
        <TimeSpanButton
          selected={chosenButton.week}
          value="week"
          onClick={(e) => onButtonClick(e.target.value)}
        >
          This week
        </TimeSpanButton>
        <TimeSpanButton
          selected={chosenButton.month}
          value="month"
          onClick={(e) => onButtonClick(e.target.value)}
        >
          This month
        </TimeSpanButton>
        <TimeSpanButton
          selected={chosenButton.year}
          value="year"
          onClick={(e) => onButtonClick(e.target.value)}
        >
          This year
        </TimeSpanButton>
        <TimeSpanButton
          selected={chosenButton.allTime}
          value=""
          onClick={(e) => onButtonClick(e.target.value)}
        >
          All time high
        </TimeSpanButton>
      </FlexRowContainer>
      <Select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">All countries</option>
        <option value="Sweden">Sweden</option>
        <option value="Norway">Norway</option>
      </Select>
      {topUsers &&
        topUsers.map((user, index) => (
          <div key={user.user}>
            <h2>
              {index + 1} {user.user}{" "}
              {index === 0 && <span>&#11088;</span>}
            </h2>
            <p>Score: {user.score}</p>
            <p>
              Been a member for{" "}
              {dateToday.diff(moment(user.userCreatedAt), "days")}{" "}
              days
            </p>
          </div>
        ))}
      {!topUsers && <p>There are no users to display here!</p>}
    </MainContainer>
  );
};

export default Leaderboard;
