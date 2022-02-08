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
  const signedInUser = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(signedInUser.firstName);
  const [lastName, setLastName] = useState(signedInUser.lastName);
  const [description, setDescription] = useState(
    signedInUser.description
  );
  const [email, setEmail] = useState(signedInUser.email);
  const [country, setCountry] = useState(signedInUser.country);
  const [city, setCity] = useState(signedInUser.city);
  const [showPopUp, setShowPopUp] = useState(false);
  const dispatch = useDispatch();

  const countryOptions = useMemo(() => countryList().getData(), []);

  const fetchScore = () => {
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
  };

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  const editUserProfile = () => {
    setShowPopUp(true);
  };

  const updateUserProfile = async (event) => {
    event.preventDefault();
    console.log(signedInUser.userId);

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
    await fetch(API_URL(`user/${signedInUser.userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response);
          dispatch(user.actions.setUserInfo(data.response));
        } else {
          console.log(data.message);
        }
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
