import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/urls";
import moment from "moment";

import { MainContainer } from "../reusable-components/Containers";
import { Button } from "../reusable-components/Buttons";

const UserSearch = (props) => {
	const [user, setUser] = useState({});
	const accessToken = useSelector((store) => store.user.accessToken);
	// const { username } = useParams();
	const { username } = props;
	console.log(username);

	const navigate = useNavigate();

	useEffect(
		(username) => {
			console.log("in useeffect", username);
			const options = {
				headers: { Authorization: accessToken },
			};
			return () => {
				fetch(API_URL(`user/${username}`), options)
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						setUser("data", data);
					});
			};
		},
		[accessToken, username]
	);

	console.log("user", user);

	return (
		<MainContainer>
			<h1>
				{user.firstName} {user.lastName}
			</h1>
			<p>Aka. {user.username}</p>
			<p>Member since: {moment(signedInUser.userCreatedAt).format("LL")}</p>
			<p>Total score: {signedInUser.score}</p>
			<p>
				Location: {signedInUser.city}, {signedInUser.country}
			</p>
			<Button onClick={navigate("/leaderboard")} text="Back to leaderboard" />
		</MainContainer>
	);
};

export default UserSearch;
