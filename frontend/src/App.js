import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "@reduxjs/toolkit";

import Main from "./components/Main";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import Leaderboard from "./components/LeaderBoard";
import InfoPage from "./components/InfoPage";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

import user from "./reducers/user";
import tasks from "./reducers/tasks";

const reducer = combineReducers({
	user: user.reducer,
	tasks: tasks.reducer,
});

// Retrieve localstorage as initial state
const persistedStateJSON = localStorage.getItem("userReduxState");
let persistedState = {};

if (persistedStateJSON) {
	persistedState = JSON.parse(persistedStateJSON);
}

const store = createStore(
	reducer,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Store the state in localstorage when Redux state change
store.subscribe(() => {
	localStorage.setItem("userReduxState", JSON.stringify(store.getState()));
});

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
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
