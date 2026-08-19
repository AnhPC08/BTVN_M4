import * as Comment from "../models/Comment.js";
import * as Post from "../models/Post.js";
import AppError from "../utils/AppError.js";

export const createComment = (req, res, next) => {
  try {
    const { postId, text } = req.body;

    if (!postId || !text) {
      throw new AppError("Thiếu postId hoặc text", 400);
    }

    // Kiểm tra Post có tồn tại không
    const post = Post.findById(postId);
    if (!post) {
      throw new AppError("Bài viết không tồn tại", 404);
    }

    const newComment = Comment.create({
      postId: parseInt(postId),
      text,
      userId: req.user.id, // Lấy từ authMiddleware
    });

    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPostId = (req, res, next) => {
  try {
    const comments = Comment.findByPostId(req.params.postId);
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};
