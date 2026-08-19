import express from "express";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [{ id: 1, name: "Nguyen Van A", email: "a@gmail.com" }];

// 1. GET /users/secret (Bắt lỗi 401 Unauthorized)
// Lưu ý: Route tĩnh (/secret) phải đặt trước Route động (/:id)
app.get("/users/secret", (req, res, next) => {
  if (!req.headers.authorization) {
    // Chủ động ném lỗi nếu không có token xác thực
    return next(new AppError("Chưa xác thực", 401));
  }
  res
    .status(200)
    .json({ success: true, message: "Ban da truy cap vao vung kin" });
});

// 2. GET /users/:id (Bắt lỗi 404 Not Found)
app.get("/users/:id", (req, res, next) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return next(new AppError("Không tìm thấy user", 404));
  }
  res.status(200).json({ success: true, data: user });
});

// 3. POST /users (Bắt lỗi 400 Bad Request)
app.post("/users", (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Thiếu trường email", 400));
  }
  res.status(201).json({ success: true, message: "Tao user thanh cong" });
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;

  // Format JSON trả về chuẩn theo yêu cầu
  res.status(status).json({
    success: false,
    message: err.message || "Lỗi server nội bộ",
  });
});

app.listen(PORT, () => {
  console.log(`Server dang chay tai port ${PORT}`);
});
