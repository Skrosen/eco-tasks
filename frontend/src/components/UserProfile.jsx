import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
	const user = useSelector((store) => store.user);

	return (
		<>
			<h1>Welcome {user.username}</h1>
			<p>email:{user.email}</p>
			<p>score:{user.score}</p>
		</>
	);
};

export default UserProfile;
