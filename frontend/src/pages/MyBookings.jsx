import { useEffect, useState } from "react";
import api from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Bookings</h1>

      {bookings.length === 0 && <p className="text-gray-900 dark:text-white">No bookings yet</p>}

      <div className="space-y-3">
        {[...bookings].reverse().map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {b.service?.name}
            </h2>
            <p className="text-gray-900 dark:text-white">Date: {new Date(b.date).toLocaleDateString()}</p>
            <p className="text-gray-900 dark:text-white">Time: {b.time}</p>
            <p className="text-gray-900 dark:text-white">Status: {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
