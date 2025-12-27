import { useEffect, useState } from "react";
import api from "../../services/api";

const SuperAdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    await api.post("/admin/make-admin", { userId: id });
    fetchUsers();
  };

  const removeAdmin = async (id) => {
    await api.post("/admin/remove-admin", { userId: id });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        User Management (Superadmin)
      </h1>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm">{u.email}</p>
              <p className="text-xs text-gray-600">
                Role: {u.role}
              </p>
            </div>

            <div className="space-x-2">
              {u.role === "user" && (
                <button
                  onClick={() => makeAdmin(u._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Make Admin
                </button>
              )}

              {u.role === "admin" && (
                <button
                  onClick={() => removeAdmin(u._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminUsers;
