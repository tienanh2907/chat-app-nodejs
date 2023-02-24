import express from "express";
import {
    sendMessage,
    fetchMessage,
} from "../controllers/messageRoomController.js";
const router = express.Router();

router.post("/", sendMessage);
router.get("/:roomName", fetchMessage);

export default router;
