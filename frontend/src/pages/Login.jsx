import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submission
    try {
      await login(form);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      alert(errorMessage); // Show alert as requested
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-80 rounded shadow"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
