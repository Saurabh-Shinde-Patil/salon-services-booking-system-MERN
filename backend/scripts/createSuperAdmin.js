import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../src/models/User.js";
dotenv.config({ path: "../.env" });

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // 1️ Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    // 2️ Check if superadmin already exists
    const exists = await User.findOne({ role: "superadmin" });
    if (exists) {
      console.log("Superadmin already exists");
      process.exit();
    }

    // 3️ Create superadmin
    const admin = await User.create({
      name: process.env.SUPERADMIN_NAME,
      email: process.env.SUPERADMIN_EMAIL,
      password: await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10),
      role: "superadmin"
    });

    console.log("Superadmin created:");
    console.log({
      email: admin.email,
      role: admin.role
    });

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createSuperAdmin();
