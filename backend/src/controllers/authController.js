import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1️Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // 2️ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️ Create user (ROLE IS FIXED)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user" //  IMPORTANT
  });

  res.status(201).json({
    message: "User registered successfully"
  });
};


 
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User is not registered" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  
  res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",   // 🔥 KEY FIX
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000
});

  res.json({
    message: "Login successful",
    user
  });
};


export const getme = async (req, res) => {
  res.status(200).json(req.user);
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
  res.json({ message: "Logged out successfully" });
};
