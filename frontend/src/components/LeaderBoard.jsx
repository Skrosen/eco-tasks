import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../utils/urls";

const Leaderboard = () => {
  const dispatch = useDispatch();
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
        console.log(data);
      });
  }, []);

  return <h1>Leaderboard</h1>;
};

export default Leaderboard;
