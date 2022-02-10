import React from "react";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";

import { GlobalStyle } from "./components/reusable-components/GlobalStyles";

import { theme } from "./components/reusable-components/GlobalStyles";

import user from "./reducers/user";
import tasks from "./reducers/tasks";
import { ui } from "./reducers/ui";
import checkedTasks from "./reducers/checkedTasks";
import Container from "./components/Container";

const reducer = combineReducers({
  user: user.reducer,
  tasks: tasks.reducer,
  ui: ui.reducer,
  checkedTasks: checkedTasks.reducer,
});

let persistedState;

const getWithExpiry = () => {
  const persistedStateJSON = localStorage.getItem("myAppReduxState");

  if (!persistedStateJSON) {
    return {};
  }
  persistedState = JSON.parse(persistedStateJSON);
  // compare the expiry time of the item with the current time
  if (new Date().getTime() > persistedState?.user?.expiry) {
    // If the item is expired, delete the item from storage
    // and return empty object
    localStorage.removeItem("myAppReduxState");
    persistedState = {};
  }
};
getWithExpiry();

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
  localStorage.setItem(
    "myAppReduxState",
    JSON.stringify(store.getState())
  );
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
