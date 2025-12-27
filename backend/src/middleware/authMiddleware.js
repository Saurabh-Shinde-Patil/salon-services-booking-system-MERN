import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token = req.cookies.token;

  // 1️ Check token exists
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // 2️Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️ Get user from DB (without password)
    req.user = await User.findById(decoded.id).select("-password");

    next(); // go to controller
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default protect;




