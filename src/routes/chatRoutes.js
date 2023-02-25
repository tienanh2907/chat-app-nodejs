import express from "express";
import { accessChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", accessChat);

export default router;
