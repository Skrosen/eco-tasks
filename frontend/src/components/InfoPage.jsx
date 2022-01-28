import React, { useState } from "react";
import { API_URL } from "../utils/urls";

import { Button } from "./reusable-components/Buttons";

const InfoPage = () => {
	// const [info, setInfo] = useState({});
	// const getEcoInfo = () => {
	// 	fetch(API_URL("information"))
	// 		.then((res) => res.json())
	// 		.then((data) => setInfo(data));
	// };
	return (
		<>
			<h1>Eco information</h1>
			<img src="#" alt="pic goes here" />
			<p></p>
			<Button text="click to get random eco-info" />
		</>
	);
};

export default InfoPage;
