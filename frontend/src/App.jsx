import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import Register
import Services from "./pages/Services";
import BookService from "./pages/BookService";
import MyBookings from "./pages/MyBookings";
import AdminServices from "./pages/admin/AdminServices";
import AdminBookings from "./pages/admin/AdminBookings";
import Navbar from "./components/Navbar";
import SuperAdminUsers from "./pages/superadmin/SuperAdminUsers";
import UserProfile from "./pages/UserProfile";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen grid place-items-center">
  <div className="flex flex-col items-center gap-3 ">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700"></div>
    <p className="text-gray-900 dark:text-white font-semibold ">Loading...</p>
    <p className="text-gray-900 dark:text-white font-extrabold">SHREE MEN'S SALON</p>
  </div>
</div>


  return (
    <div>
      {user && <Navbar />}
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* User routes */}
            <Route path="/" element={<Services />} />
            <Route path="/book/:id" element={<BookService />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<UserProfile />} />

            {/* Admin routes - accessible by admin and superadmin */}
            {(user.role === "admin" || user.role === "superadmin") && (
              <>
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
              </>
            )}

            {/* Superadmin-only routes */}
            {user.role === "superadmin" && (
              <Route path="/superadmin/users" element={<SuperAdminUsers />} />
            )}
            
            {/* Redirect logged-in users from auth pages */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
