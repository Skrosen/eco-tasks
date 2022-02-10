import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import UserTasks from "./tasks/UserTasks";
import Leaderboard from "./LeaderBoard";
import InfoPage from "./InfoPage";
import UserProfile from "./user/UserProfile";
import UserSearch from "./UserSearch";
import NotFound from "./NotFound";
import Loader from "./Loader";

const Container = () => {
  const loading = useSelector((store) => store.ui.isLoading);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eco-facts" element={<InfoPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/tasks" element={<UserTasks />} />
        <Route path="/user/:username" element={<UserSearch />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Container;
