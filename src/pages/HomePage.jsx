import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const matches = [
    { id: 1, name: "India vs Australia" },
    { id: 2, name: "India vs England" },
    { id: 3, name: "India vs South Africa" }
  ];

  return (
    <div className="center">
      <h1>Upcoming Cricket Matches</h1>
      {matches.map((match) => (
        <div key={match.id} className="match-card">
          <h2>{match.name}</h2>
          <button onClick={() => navigate(`/match/${match.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
