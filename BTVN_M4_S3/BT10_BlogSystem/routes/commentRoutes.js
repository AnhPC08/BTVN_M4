import express from "express";
import * as commentController from "../controllers/commentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:postId", commentController.getCommentsByPostId);
router.post("/", authenticate, commentController.createComment);

export default router;
