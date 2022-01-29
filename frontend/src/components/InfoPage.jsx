import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/urls";

import { useSelector } from "react-redux";

const InfoPage = () => {
	const [info, setInfo] = useState({});
	const accessToken = useSelector((store) => store.user.accessToken);

	useEffect(() => {
		GetEcoInfo();
	}, []);

	const GetEcoInfo = () => {
		const options = {
			headers: { Authorization: accessToken },
		};

		fetch(API_URL("information"), options)
			.then((res) => res.json())
			.then((data) => {
				setInfo(data.response);
			});
	};
	console.log(info);

	return (
		<>
			<h1>Eco information</h1>
			{info?.length &&
				info.map((info) => (
					<div key={info._id}>
						<h3>
							{info.title} - ({info.category})
						</h3>
						<p>{info.description}</p>
						<p>Source: {info.source}</p>
					</div>
				))}
		</>
	);
};

export default InfoPage;
