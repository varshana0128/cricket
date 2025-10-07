import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [seatPrices, setSeatPrices] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));
    const seats = JSON.parse(localStorage.getItem("seatPrices"));

    if (!data || !seats) {
      alert("No booking data found! Please select seats first.");
      navigate("/");
      return;
    }

    setBookingData(data);
    setSeatPrices(seats);
  }, [navigate]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    if (!userInfo.name || !userInfo.email) {
      alert("Please enter your name and email.");
      return;
    }

    // Save booking data to localStorage for payment page
    localStorage.setItem(
      "finalBooking",
      JSON.stringify({ ...bookingData, seats: seatPrices, ...userInfo })
    );

    // Navigate to Payment page
    navigate("/payment");
  };

  if (!bookingData) return null; // Prevent errors before data loads

  const totalPrice = seatPrices.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="center">
      <h1>Enter Your Details</h1>
      <p>Match: {bookingData.match}</p>
      <p>Seats: {seatPrices.map((s) => s.number).join(", ")}</p>
      <p>Total Price: ₹{totalPrice}</p>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={userInfo.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={userInfo.email}
        onChange={handleChange}
      />
      <button onClick={handleBooking}>Book Ticket & Proceed to Payment</button>
    </div>
  );
};

export default BookingPage;
