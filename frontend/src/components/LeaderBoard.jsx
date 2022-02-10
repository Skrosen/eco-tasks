import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";
import countryList from "react-select-country-list";
import styled from "styled-components";

import { API_URL } from "../utils/urls";

import {
  MainContainer,
  FlexRowContainer,
} from "./reusable-components/Containers";
import {
  TimeSpanButton,
  Button,
} from "./reusable-components/Buttons";
import {
  StyledH2Green,
  StyledA,
  StyledP,
} from "./reusable-components/Text";

const GridContainer = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 20px;
  max-width: 595px;
`;

const ChildSpan5Container = styled.div`
  width: 100%;
  grid-column: span 5;
  text-align: center;
`;

const ChildSpan1Container = styled.div`
  width: 100%;
  grid-column: span 1;
  text-align: center;
`;

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [country, setCountry] = useState("");
  const [timeSpan, setTimeSpan] = useState("week");
  const [chosenButton, setChosenButton] = useState({
    week: true,
    month: false,
    year: false,
    allTime: false,
  });
  const signedInUser = useSelector((store) => store.user);
  let urlPath = `leaderboard?timeSpan=${timeSpan}`;
  const dateToday = moment(Date.now());

  const countryOptions = useMemo(() => countryList().getData(), []);

  if (country) {
    urlPath = `leaderboard?timeSpan=${timeSpan}&country=${country.label}`;
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: signedInUser.accessToken,
      },
    };
    fetch(API_URL(urlPath), options)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.response)) {
          setTopUsers(data.response);
        } else {
          setTopUsers([]);
        }
      });
  }, [country, timeSpan, urlPath, signedInUser.accessToken]);

  const onButtonClick = (timeSpan) => {
    setTimeSpan(timeSpan);
    setChosenButton({
      week: timeSpan === "week",
      month: timeSpan === "month",
      year: timeSpan === "year",
      allTime: timeSpan === "",
    });
  };

  const changeHandler = (country) => {
    setCountry(country);
  };

  return (
    <MainContainer>
      <FlexRowContainer>
        <h1>Leaderboard &#127881;</h1>
        <div>
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
        </div>
      </FlexRowContainer>
      <label htmlFor="country"></label>
      <GridContainer>
        <ChildSpan5Container>
          <Select
            options={countryOptions}
            placeholder="All countries"
            value={country}
            onChange={changeHandler}
          />
        </ChildSpan5Container>
        <ChildSpan1Container>
          <Button onClick={(e) => setCountry("")} text="Clear" />
        </ChildSpan1Container>
      </GridContainer>
      {topUsers &&
        topUsers.map((user, index) => (
          <div key={user.user}>
            <FlexRowContainer>
              <StyledH2Green>
                {index + 1}.
                <StyledA href={`/user/${user.user}`}>
                  {user.user} {index === 0 && <span>&#127941;</span>}
                  {user.user === signedInUser.username && (
                    <span>&#11088;</span>
                  )}
                </StyledA>
              </StyledH2Green>
            </FlexRowContainer>
            <StyledP>Score: {user.score}</StyledP>
            <StyledP>
              Been a member for{" "}
              {dateToday.diff(moment(user.userCreatedAt), "days")}{" "}
              days
            </StyledP>
          </div>
        ))}
      {topUsers.length < 1 && (
        <p>
          No users from this country has completed any tasks during
          chosen time period.
        </p>
      )}
    </MainContainer>
  );
};

export default Leaderboard;
