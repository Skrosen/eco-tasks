import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/urls";
import user from "../reducers/user";

import { MainContainer } from "./reusable-components/Containers";

const UserProfile = () => {
	const dispatch = useDispatch();
	const signedInUser = useSelector((store) => store.user);

	const options = {
		method: "GET",
		headers: {
			Authorization: signedInUser.accessToken,
		},
	};

	useEffect(() => {
		fetch(API_URL(`user/${signedInUser.userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(user.actions.setUserScore(data.response.score));
			});
	}, [dispatch, options, signedInUser.userId]);

	return (
		<MainContainer>
			<h1>Welcome {signedInUser.username}</h1>
			<p>email:{signedInUser.email}</p>
			<p>score:{signedInUser.score}</p>
		</MainContainer>
	);
};

export default UserProfile;
