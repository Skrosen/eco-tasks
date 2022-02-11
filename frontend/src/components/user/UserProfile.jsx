import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { MainContainer } from "../reusable-components/Containers";
import PopUp from "../reusable-components/PopUp";
import { Button } from "../reusable-components/Buttons";
import EditProfileForm from "../user/EditProfileForm";
import DeleteUser from "./DeleteUser";
import { InlineH1, InlineP } from "../reusable-components/Text";

const UserProfile = () => {
  const signedInUser = useSelector((store) => store.user);
  const [showPopUp, setShowPopUp] = useState(false);
  const [mode, setMode] = useState("form");

  const editUserProfile = () => {
    setShowPopUp(true);
  };

  return (
    <MainContainer>
      <InlineH1>
        {signedInUser.firstName} {signedInUser.lastName}
      </InlineH1>
      <InlineP>Aka. {signedInUser.username}</InlineP>
      <p>Description: {signedInUser.description}</p>
      <p>
        Member since: {moment(signedInUser.createdAt).format("LL")}
      </p>
      <p>Total score: {signedInUser.score}</p>
      <p>Email: {signedInUser.email}</p>
      <p>
        Location: {signedInUser.city}, {signedInUser.country}
      </p>
      <Button onClick={editUserProfile} text="Edit profile" />
      <PopUp
        setShowPopUp={setShowPopUp}
        header={"Edit user profile"}
        text={
          mode === "form" ? (
            <EditProfileForm setMode={setMode} />
          ) : (
            <DeleteUser
              setShowPopUp={setShowPopUp}
              setMode={setMode}
            />
          )
        }
        open={showPopUp}
      />
    </MainContainer>
  );
};

export default UserProfile;
