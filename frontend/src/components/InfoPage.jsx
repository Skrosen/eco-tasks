import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/urls";

import { useDispatch, useSelector } from "react-redux";

const InfoPage = () => {
	const [info, setInfo] = useState({});
	const dispatch = useDispatch();
	const accessToken = useSelector((store) => store.user.accessToken);

	useEffect(() => {
		dispatch(GetEcoInfo(accessToken));
	}, []);

	const GetEcoInfo = () => {
		const options = {
			headers: { Authorization: accessToken },
		};
		fetch(API_URL("information"), options)
			.then((res) => res.json())
			.then((data) => {
				setInfo(data);
			});
	};
	console.log(info);

	return (
		<>
			<h1>Eco information</h1>
		</>
	);
};

export default InfoPage;
