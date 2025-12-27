import User from "../models/User.js";

// GET all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Promote to admin
export const makeAdmin = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = "admin";
  await user.save();

  res.json({ message: "User promoted to admin" });
};

// Remove admin
export const removeAdmin = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = "user";
  await user.save();

  res.json({ message: "Admin access removed" });
};
