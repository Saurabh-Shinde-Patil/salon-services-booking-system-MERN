import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: ""
  });

  const fetchServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/services", form);
    setForm({ name: "", description: "", price: "", duration: "" });
    fetchServices();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      {/* Add Service Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded mb-6 max-w-md"
      >
        <input
          name="name"
          placeholder="Service name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-2 border px-3 py-2 rounded"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-2 border px-3 py-2 rounded"
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full mb-2 border px-3 py-2 rounded"
        />
        <input
          name="duration"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Service
        </button>
      </form>

      {/* Services List */}
      <div className="grid gap-3 md:grid-cols-3">
        {services.map((s) => (
          <div key={s._id} className="border p-3 rounded">
            <h2 className="font-semibold">{s.name}</h2>
            <p>₹{s.price}</p>
            <p>{s.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
