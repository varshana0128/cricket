import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const finalBooking = JSON.parse(localStorage.getItem("finalBooking"));
    if (!finalBooking) {
      alert("No booking found! Please select seats first.");
      navigate("/");
      return;
    }
    setBooking(finalBooking);
  }, [navigate]);

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv) {
      alert("Please fill all payment details.");
      return;
    }

    // For mock app, we just show modal
    setShowModal(true);
    localStorage.removeItem("finalBooking");
  };

  if (!booking) return null;

  const totalPrice = booking.seats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="center">
      <h1>Payment Page</h1>
      <p>Match: {booking.match}</p>
      <p>Seats: {booking.seats.map((s) => s.number).join(", ")}</p>
      <p>Total Amount: ₹{totalPrice}</p>
      <p>Name: {booking.name}</p>
      <p>Email: {booking.email}</p>

      <h3>Enter Payment Details</h3>
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={paymentInfo.cardNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="expiry"
        placeholder="Expiry (MM/YY)"
        value={paymentInfo.expiry}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={paymentInfo.cvv}
        onChange={handleChange}
      />
      <button onClick={handlePayment}>Pay Now</button>

      {/* Payment Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎉 Payment Successful!</h2>
            <p>Your tickets are confirmed.</p>
            <p>Match: {booking.match}</p>
            <p>Seats: {booking.seats.map((s) => s.number).join(", ")}</p>
            <p>Total Paid: ₹{totalPrice}</p>
            <button onClick={() => navigate("/")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
