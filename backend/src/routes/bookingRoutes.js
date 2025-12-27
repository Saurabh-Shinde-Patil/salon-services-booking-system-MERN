import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";

const router = express.Router();

// user
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);

// admin
router.get("/", protect, adminOnly, getAllBookings);
router.put("/:id", protect, adminOnly, updateBookingStatus);

export default router;
