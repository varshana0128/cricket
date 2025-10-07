import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Example match data
const matches = [
  {
    id: 1,
    name: "India vs Australia",
    type: "T20 International",
    date: "12 Oct 2025",
    time: "7:30 PM",
    venue: "Eden Gardens, Kolkata",
    team1Logo: "🏏",
    team2Logo: "🏏"
  },
  {
    id: 2,
    name: "India vs England",
    type: "ODI",
    date: "18 Oct 2025",
    time: "3:00 PM",
    venue: "Wankhede Stadium, Mumbai",
    team1Logo: "🏏",
    team2Logo: "🏏"
  },
  {
    id: 3,
    name: "India vs South Africa",
    type: "Test Match",
    date: "22 Oct 2025",
    time: "10:00 AM",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    team1Logo: "🏏",
    team2Logo: "🏏"
  }
];

const MatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const match = matches.find(m => m.id === parseInt(matchId));
  if (!match) {
    return <h2 className="center">Match not found!</h2>;
  }

  const handleBook = () => {
    navigate(`/seats/${encodeURIComponent(match.name)}`);
  };

  return (
    <div className="center">
      <h1>Match Details</h1>
      <h2>{match.team1Logo} {match.name} {match.team2Logo}</h2>
      <p>Type: {match.type}</p>
      <p>Date: {match.date}</p>
      <p>Time: {match.time}</p>
      <p>Venue: {match.venue}</p>
      <button onClick={handleBook}>Book Seats</button>
    </div>
  );
};

export default MatchDetails;
