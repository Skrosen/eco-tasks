import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/urls";
import user from "../reducers/user";
import moment from "moment";
import Select from "react-select";
import countryList from "react-select-country-list";

import { MainContainer } from "./reusable-components/Containers";
import PopUp from "./reusable-components/PopUp";
import { Button } from "./reusable-components/Buttons";
import { Form } from "./reusable-components/Containers";
import { TextInput } from "./reusable-components/Inputs";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const dispatch = useDispatch();

  const signedInUser = useSelector((store) => store.user);

  const countryOptions = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: signedInUser.accessToken,
      },
    };
    fetch(API_URL(`user/${signedInUser.userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(user.actions.setUserScore(data.response.score));
      });
  }, [dispatch, signedInUser.accessToken, signedInUser.userId]);

  const editUserProfile = () => {
    setShowPopUp(true);
  };

  const updateUserProfile = (event) => {
    event.preventDefault();
    setShowPopUp(false);
    const options = {
      method: "PATCH",
      headers: {
        Authorization: signedInUser.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        description: description,
        email: email,
        country: country,
        city: city,
      }),
    };
    fetch(API_URL(`user/${signedInUser.userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(user.actions.setUserInfo(data.response));
      });
  };

  const changeHandler = (country) => {
    setCountry(country);
  };

  return (
    <MainContainer>
      <h1>
        {signedInUser.firstName} {signedInUser.lastName}
      </h1>
      <p>Aka. {signedInUser.username}</p>
      <p>
        Member since:{" "}
        {moment(signedInUser.userCreatedAt).format("LL")}
      </p>
      <p>Total score: {signedInUser.score}</p>
      <p>Email: {signedInUser.email}</p>
      <Button onClick={editUserProfile} text="Edit profile" />

      <PopUp
        setShowPopUp={setShowPopUp}
        header={"Edit user profile"}
        text={
          <Form onSubmit={updateUserProfile}>
            <label htmlFor="firstName">First name</label>
            <TextInput
              id="firstName"
              type="text"
              placeholder={signedInUser.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last name</label>
            <TextInput
              id="lastName"
              type="text"
              placeholder={signedInUser.lastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <TextInput
              id="description"
              type="text"
              placeholder={signedInUser.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <TextInput
              id="email"
              type="email"
              placeholder={signedInUser.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="country">Country</label>
            <Select
              options={countryOptions}
              placeholder={signedInUser.country}
              value={country}
              onChange={changeHandler}
            />
            <label htmlFor="city">City</label>
            <TextInput
              id="city"
              type="text"
              placeholder={signedInUser.city}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" text="Update" />
          </Form>
        }
        open={showPopUp}
      />
    </MainContainer>
  );
};

export default UserProfile;
