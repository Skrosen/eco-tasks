import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { API_URL } from "../utils/urls";
import moment from "moment";

import { MainContainer } from "./reusable-components/Containers";
import { LinkButton } from "./reusable-components/Buttons";
import { InlineH1, InlineP } from "./reusable-components/Text";

const UserSearch = () => {
  let { username } = useParams();
  const [user, setUser] = useState({});
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    const options = {
      headers: { Authorization: accessToken },
    };
    fetch(API_URL(`user/${username}`), options)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.response);
      });
  }, [accessToken, username]);

  return (
    <MainContainer>
      <InlineH1>
        {user.firstName} {user.lastName}
      </InlineH1>
      <InlineP>Aka. {user.username}</InlineP>
      <p>Description: {user.description}</p>
      <p>Member since: {moment(user.userCreatedAt).format("LL")}</p>
      <p>Total score: {user.score}</p>
      <p>
        Location: {user.city}, {user.country}
      </p>
      <LinkButton to={"/leaderboard"}>Back to leaderboard</LinkButton>
    </MainContainer>
  );
};

export default UserSearch;
