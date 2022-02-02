import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../utils/urls";

import { MainContainer } from "./reusable-components/Containers";

const Leaderboard = () => {
	const dispatch = useDispatch();
	const signedInUser = useSelector((store) => store.user);
	const options = {
		method: "GET",
		headers: {
			Authorization: signedInUser.accessToken,
		},
	};

	useEffect(async () => {
		await fetch(API_URL("leaderboard"), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	return (
		<MainContainer>
			<h1>Leaderboard</h1>
		</MainContainer>
	);
};

export default Leaderboard;
