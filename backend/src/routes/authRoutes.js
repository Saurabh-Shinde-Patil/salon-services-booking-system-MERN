import { logout } from "../controllers/authController.js";
import express from "express";
import { register, login ,getme } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getme",protect, getme);
router.post("/logout", logout);

export default router;




