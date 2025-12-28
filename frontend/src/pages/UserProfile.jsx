import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">User Profile</h1>
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">Name</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">Email</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
