import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MatchDetails from "./pages/MatchDetails";
import SeatSelection from "./pages/SeatSelection";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
        <Route path="/seats/:match" element={<SeatSelection />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} /> {/* New payment route */}
      </Routes>
    </Router>
  );
}

export default App;
