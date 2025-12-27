import express from "express";
import {
  createService,
  getServices,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
const router = express.Router();

// user + admin
router.get("/", getServices);

// admin only
router.post("/", protect, adminOnly, createService);
router.put("/:id", protect, adminOnly, updateService);
router.delete("/:id", protect, adminOnly, deleteService);


export default router;
