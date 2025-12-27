import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const BookService = () => {
  const { id } = useParams(); // serviceId
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    await api.post("/bookings", {
      serviceId: id,
      date,
      time
    });

    alert("Booking created");
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleBooking}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-semibold mb-4">
          Book Service
        </h2>

        <label className="block mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 border px-3 py-2 rounded"
          required
        />

        <label className="block mb-2">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 border px-3 py-2 rounded"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookService;
