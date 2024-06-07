import React, { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";
import { http_GET } from "../../services/httpService";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorCard from "../Error/ErrorCard";

const ScoreBoardPage = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLeaderBoard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await http_GET("/Bordtennis/GetLeaderBoard");
      setStats(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <>
      {loading && <LinearProgress />}
      <ScoreTable data={stats} />
      {error && <ErrorCard error={error} />}
    </>
  );
};

export default ScoreBoardPage;
