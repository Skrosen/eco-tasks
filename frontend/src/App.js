import React from "react";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware,
} from "@reduxjs/toolkit";

import { GlobalStyle } from "./components/reusable-components/GlobalStyles";

import Menu from "./components/Menu";

import Main from "./components/Main";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import Leaderboard from "./components/LeaderBoard";
import InfoPage from "./components/InfoPage";
import UserProfile from "./components/UserProfile";
import UserSearch from "./components/UserProfile";
import NotFound from "./components/NotFound";

import user from "./reducers/user";
import tasks from "./reducers/tasks";

const reducer = combineReducers({
	user: user.reducer,
	tasks: tasks.reducer,
});

const persistedStateJSON = localStorage.getItem("myAppReduxState");
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
	(process.env.NODE_ENV !== "production" &&
		typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	reducer,
	persistedState,
	composedEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
	localStorage.setItem("myAppReduxState", JSON.stringify(store.getState()));
});

const App = () => {
	return (
		<Provider store={store}>
			<GlobalStyle />
			<BrowserRouter>
				<Menu>Menu</Menu>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/eco-information" element={<InfoPage />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/userprofile" element={<UserProfile />} />
					<Route path="/user/:username" element={<UserSearch />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
