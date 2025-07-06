import express from "express";
import { sendMessage, getMessages } from "../controllers/MessageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/send/:id", protect, sendMessage);
router.get("/get/:id", protect, getMessages);

export default router;
