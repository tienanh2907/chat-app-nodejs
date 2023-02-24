import express from "express";
import {
    registerUser,
    loginUser,
    getUser,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
