import { useEffect, useState } from "react";
import api from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 && <p>No bookings yet</p>}

      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-semibold">
              {b.service?.name}
            </h2>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
