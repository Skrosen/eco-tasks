import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainContainer } from "./reusable-components/Containers";

import { fetchUser } from "../reducers/user";

const UserProfile = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector((store) => store.user.accessToken);
	const { username } = useParams();

	const user = useSelector((store) => store.user);

	// useEffect(() => {
	// 	dispatch(fetchUser(user.userId, accessToken));
	// }, []);
	console.log(user);
	return (
		<MainContainer>
			<h1>Welcome {signedInUser.username}</h1>
			<p>email:{signedInUser.email}</p>
			<p>score:{signedInUser.score}</p>
		</MainContainer>
	);
};

export default UserProfile;
