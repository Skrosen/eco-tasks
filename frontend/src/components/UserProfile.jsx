import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../reducers/user";

const UserProfile = () => {
	const dispatch = useDispatch();

	const { username } = useParams();

	const user = useSelector((store) => store.user);

	useEffect(() => {
		dispatch(fetchUser(username));
	}, []);
	console.log(user);
	return (
		<>
			<h1>Welcome {user.username}</h1>
			<p>email:{user.email}</p>
			<p>score:{user.score}</p>
		</>
	);
};

export default UserProfile;
