import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import AddGame from "../addGame/AddGame";
import AddPlayer from "../addPlayer/AddPlayer";
import HomePage from "../HomePage/HomePage";
import ScoreBoardPage from "../Scoreboard/ScoreboardPage";
import NavBar from "../NavBar/NavBar";
import Settings from "../settings/Settings";

interface Props {
  children?: React.ReactNode;
}
const Router: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}>
          Home
        </Route>
        <Route path="/addgame" element={<AddGame />}>
          Add game
        </Route>
        <Route path="/addplayer" element={<AddPlayer />}>
          Add player
        </Route>
        <Route path="/leaderboard" element={<ScoreBoardPage />}>
          Leaderboard
        </Route>
        <Route path="/settings" element={<Settings />}>
          Settings
        </Route>
      </Routes>
      {children}
    </>
  );
};

export default Router;
