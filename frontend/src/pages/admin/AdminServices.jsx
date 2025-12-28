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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await api.delete(`/services/${id}`);
      fetchServices();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Manage Services</h1>

      {/* Add Service Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded mb-6 max-w-md bg-white dark:bg-gray-800"
      >
        <input
          name="name"
          placeholder="Service name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-2 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-2 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full mb-2 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
        <input
          name="duration"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Service
        </button>
      </form>

      {/* Services List */}
      <div className="grid gap-3 md:grid-cols-3">
        {services.map((s) => (
          <div key={s._id} className="border p-3 rounded bg-white dark:bg-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">{s.name}</h2>
            <p className="text-gray-900 dark:text-white">₹{s.price}</p>
            <p className="text-gray-900 dark:text-white">{s.duration} mins</p>
            <button
              onClick={() => handleDelete(s._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
