import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const { match } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seats with type and price
  const seats = Array.from({ length: 30 }, (_, i) => {
    if (i < 5) return { number: i + 1, type: "VIP", price: 1000 };
    if (i < 15) return { number: i + 1, type: "Regular", price: 500 };
    return { number: i + 1, type: "Economy", price: 250 };
  });

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seatNumber) => {
    const seat = seats.find((s) => s.number === seatNumber);
    return sum + (seat ? seat.price : 0);
  }, 0);

  const handleNext = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    localStorage.setItem(
      "bookingData",
      JSON.stringify({ match, seats: selectedSeats })
    );
    localStorage.setItem(
      "seatPrices",
      JSON.stringify(selectedSeats.map((n) => seats.find((s) => s.number === n)))
    );
    navigate("/booking");
  };

  const getSeatColor = (seatNumber) => {
    const seat = seats.find((s) => s.number === seatNumber);
    if (seat.type === "VIP") return "#FFD700"; // Gold
    if (seat.type === "Regular") return "#32CD32"; // Lime green
    return "#00CED1"; // Dark cyan
  };

  return (
    <div className="center">
      <h1>{match}</h1>
      <h3>Select Your Seats</h3>
      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            key={seat.number}
            className={`seat ${selectedSeats.includes(seat.number) ? "selected" : ""}`}
            style={{
              backgroundColor: selectedSeats.includes(seat.number)
                ? "#e74c3c"
                : getSeatColor(seat.number),
            }}
            onClick={() => toggleSeat(seat.number)}
          >
            {seat.number}
          </div>
        ))}
      </div>
      <h3>Total Price: ₹{totalPrice}</h3>
      <button onClick={handleNext}>Next</button>

      {/* Seat Legend */}
      <div className="seat-legend">
        <span className="legend-item legend-vip">VIP</span>
        <span className="legend-item legend-regular">Regular</span>
        <span className="legend-item legend-economy">Economy</span>
        <span className="legend-item legend-selected">Selected</span>
      </div>
    </div>
  );
};

export default SeatSelection;
