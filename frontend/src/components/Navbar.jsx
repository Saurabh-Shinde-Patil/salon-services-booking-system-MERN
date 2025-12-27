import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Services</Link>
                <Link to="/my-bookings" className="hover:underline">My Bookings</Link>

                {(user.role === "admin" || user.role === "superadmin") && (
                    <>
                        <Link to="/admin/services" className="hover:underline">ADD SERVICES</Link>
                        <Link to="/admin/bookings" className="hover:underline">Manage Bookings</Link>
                    </>
                )}

                {user.role === "superadmin" && (
                    <Link to="/superadmin/users" className="hover:underline">Manage Users</Link>
                )}

            </div>

            <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
