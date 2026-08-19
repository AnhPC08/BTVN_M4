import express from "express";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Gắn routes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File vượt quá dung lượng cho phép (2MB)",
    });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Lỗi server nội bộ",
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});
