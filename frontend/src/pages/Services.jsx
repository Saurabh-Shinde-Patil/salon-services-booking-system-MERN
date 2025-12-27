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
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s) => (
          <div key={s._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{s.name}</h2>
            <p className="text-gray-600">{s.description}</p>
            <p>₹{s.price}</p>
            <p>{s.duration} mins</p>

            <button
              onClick={() => navigate(`/book/${s._id}`)}
              className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
