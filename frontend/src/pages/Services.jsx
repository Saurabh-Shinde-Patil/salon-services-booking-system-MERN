import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Services</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {[...services].reverse().map((s) => (
          <div key={s._id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{s.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{s.description}</p>
            <p className="font-bold text-gray-900 dark:text-white">₹{s.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.duration} mins</p>

            <button
              onClick={() => navigate(`/book/${s._id}`)}
              className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
