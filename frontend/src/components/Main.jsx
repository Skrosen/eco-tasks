import React from "react";

import { MainContainer } from "./reusable-components/Containers";
import { SmallP, StyledANoMargin } from "./reusable-components/Text";

const Main = () => {
	return (
		<MainContainer>
			<h1>Welcome to EcoTasks</h1>
			<p>
				Do you struggle to find what you can do for the environment in your
				day-to-day life? &#9989;
			</p>
			<p>
				Do you want to keep track of what you have done for the environment,
				while getting points for every task you perform? &#9989;
			</p>
			<p>
				Then welcome to EcoTasks! We have gathered several different tasks which
				you can check of, like biking to work instead of taking the car, or
				washing your clothes in lower temperatures. It is also possible to see a
				leaderboard with top 10 users, and visit their profiles.
			</p>
			<p>
				EcoTasks exists to help you do things that are better for the
				environment, while allowing you to keep track of each and every task you
				have checked earlier. It is often easy to forget the small things that
				you do every day for the planet.
			</p>
			<SmallP>
				EcoTasks was created by{" "}
				<StyledANoMargin href="https://github.com/Skrosen">
					Linnéa Wilhelmsson
				</StyledANoMargin>{" "}
				and{" "}
				<StyledANoMargin href="https://github.com/sofiawillebrand">
					Sofia Willebrand
				</StyledANoMargin>{" "}
				as part of the Technigo Bootcamp fall 21'.
			</SmallP>
		</MainContainer>
	);
};

export default Main;
