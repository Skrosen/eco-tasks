import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../utils/urls";

import { MainContainer } from "./reusable-components/Containers";
import { Select } from "./reusable-components/Inputs";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [topUsers, setTopUsers] = useState([]);
  const [country, setCountry] = useState("");
  const signedInUser = useSelector((store) => store.user);
  const options = {
    method: "GET",
    headers: {
      Authorization: signedInUser.accessToken,
    },
  };

  useEffect(async () => {
    await fetch(API_URL("leaderboard"), options)
      .then((res) => res.json())
      .then((data) => {
        setTopUsers(data.response);
      });
  }, []);

  return (
    <MainContainer>
      <h1>Leaderboard</h1>
      <Select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="null" disabled>
          Select a country
        </option>
        <option value="sweden">Sweden</option>
        <option value="norway">Norway</option>
      </Select>
      {topUsers &&
        topUsers.map((user) => (
          <div key={user.user}>
            <h2>{user.user}</h2>
            <p>{user.score}</p>
          </div>
        ))}
    </MainContainer>
  );
};

export default Leaderboard;
