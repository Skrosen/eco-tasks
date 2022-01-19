import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const { user } = useParams();

	return <h1>{user}</h1>;
};

export default UserProfile;
