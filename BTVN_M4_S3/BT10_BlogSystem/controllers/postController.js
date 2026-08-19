import * as Post from "../models/Post.js";
import * as Comment from "../models/Comment.js";
import AppError from "../utils/AppError.js";

export const getPosts = (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: Post.getAll() });
  } catch (error) {
    next(error);
  }
};

export const createPost = (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new AppError("Thiếu title hoặc content", 400);
    }

    let thumbnailUrl = null;
    if (req.file) {
      thumbnailUrl = req.file.filename;
    }

    const newPost = Post.create({ title, content, thumbnailUrl });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

export const deletePost = (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = Post.findById(postId);

    if (!post) {
      throw new AppError("Không tìm thấy bài viết", 404);
    }

    // Xóa bài viết
    Post.deleteById(postId);
    // Cascade delete: Xóa toàn bộ comment của bài viết này
    Comment.deleteByPostId(postId);

    res.status(200).json({
      success: true,
      message: "Đã xóa bài viết và các bình luận liên quan",
    });
  } catch (error) {
    next(error);
  }
};
