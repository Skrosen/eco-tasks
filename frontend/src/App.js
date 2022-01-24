import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import Main from "./components/Main";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import Leaderboard from "./components/LeaderBoard";
import InfoPage from "./components/InfoPage";
import UserProfile from "./components/UserProfile";
import Feedback from "./components/Feedback";
import NotFound from "./components/NotFound";

import user from "./reducers/user";
import tasks from "./reducers/tasks";

const reducer = combineReducers({
	user: user.reducer,
	tasks: tasks.reducer,
});

const store = configureStore({ reducer });

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/eco-information" element={<InfoPage />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/user/:username" element={<UserProfile />} />
					<Route path="/feedback" element={<Feedback />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
