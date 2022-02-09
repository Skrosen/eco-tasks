import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/urls";
import user from "../../reducers/user";
import moment from "moment";

import { MainContainer } from "../reusable-components/Containers";
import PopUp from "../reusable-components/PopUp";
import { Button } from "../reusable-components/Buttons";
import EditProfileForm from "../user/EditProfileForm";
import DeleteUser from "./DeleteUser";

const UserProfile = () => {
	const signedInUser = useSelector((store) => store.user);
	const [showPopUp, setShowPopUp] = useState(false);
	const [mode, setMode] = useState("form");
	const dispatch = useDispatch();

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
	}, [signedInUser.accessToken, signedInUser.userId, dispatch]);

	const editUserProfile = () => {
		setShowPopUp(true);
	};

	return (
		<MainContainer>
			<h1>
				{signedInUser.firstName} {signedInUser.lastName}
			</h1>
			<p>Aka. {signedInUser.username}</p>
			<p>Member since: {moment(signedInUser.userCreatedAt).format("LL")}</p>
			<p>Total score: {signedInUser.score}</p>
			<p>Email: {signedInUser.email}</p>
			<Button onClick={editUserProfile} text="Edit profile" />
			<PopUp
				setShowPopUp={setShowPopUp}
				header={"Edit user profile"}
				text={
					mode === "form" ? (
						<EditProfileForm setMode={setMode} />
					) : (
						<DeleteUser setShowPopUp={setShowPopUp} setMode={setMode} />
					)
				}
				open={showPopUp}
			/>
		</MainContainer>
	);
};

export default UserProfile;
