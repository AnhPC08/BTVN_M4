import express from "express";
import * as postController from "../controllers/postController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", upload.single("thumbnail"), postController.createPost);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  postController.deletePost,
);

export default router;
