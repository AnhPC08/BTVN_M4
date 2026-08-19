import express from "express";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Logger middleware toàn cục
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2. Định tuyến API
app.use("/api/employees", employeeRoutes);

// 3. Global Error Handling Middleware (Đặt cuối cùng)
app.use((err, req, res, next) => {
  // Bắt lỗi kích thước file của Multer
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ message: "File vượt quá dung lượng cho phép (2MB)" });
  }

  // Bắt lỗi từ AppError hoặc lỗi hệ thống mặc định 500
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Lỗi server nội bộ",
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});
