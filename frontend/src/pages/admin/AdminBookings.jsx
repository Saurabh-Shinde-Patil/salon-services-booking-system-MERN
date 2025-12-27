import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    fetchBookings();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-semibold">
              {b.service.name}
            </h2>
            <p>User: {b.user.name}</p>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
            <p>Status: {b.status}</p>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateStatus(b._id, "approved")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(b._id, "completed")}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Complete
              </button>
              <button
                onClick={() => updateStatus(b._id, "cancelled")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
