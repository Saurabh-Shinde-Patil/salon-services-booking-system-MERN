import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 flex justify-between items-center">
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Services</Link>
                {user && (
                    <>
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
                    </>
                )}
            </div>

            <div className="space-x-4 flex items-center">
                <button
                    onClick={toggleTheme}
                    className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                    {theme === 'light' ? 'Dark' : 'Light'}
                </button>
                {user ? (
                    <>
                        <Link to="/profile" className="">Hello! <span  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">{user.name}</span> </Link>
                        <button
                            onClick={logout}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
