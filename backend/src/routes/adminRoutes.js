import express from "express";
import protect from "../middleware/authMiddleware.js";
import superAdminOnly from "../middleware/superAdminMiddleware.js";
import {
    getAllUsers,
    makeAdmin,
    removeAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, superAdminOnly, getAllUsers);
router.post("/make-admin", protect, superAdminOnly, makeAdmin);
router.post("/remove-admin", protect, superAdminOnly , removeAdmin);

export default router;





