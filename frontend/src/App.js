import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Leaderboard from "./components/LeaderBoard";
import InfoPage from "./components/InfoPage";
import UserProfile from "./components/UserProfile";
import Feedback from "./components/Feedback";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eco-information" element={<InfoPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/:user" element={<UserProfile />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
