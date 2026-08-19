import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3000;

// 1. Cấu hình nơi lưu trữ và quy tắc đặt tên file tránh trùng lặp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// 2. Cấu hình bộ lọc chỉ chấp nhận JPEG, PNG, WEBP
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Chấp nhận file
  } else {
    // Trả về một lỗi tùy chỉnh nếu sai định dạng
    cb(new Error("INVALID_FILE_TYPE"), false);
  }
};

// 3. Khởi tạo cấu hình Multer kèm giới hạn dung lượng 2MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
}).single("avatar");

// 4. Route POST /upload/avatar xử lý upload
app.post("/upload/avatar", (req, res) => {
  upload(req, res, (err) => {
    // Bắt và xử lý các lỗi xảy ra trong quá trình upload file
    if (err) {
      // Trường hợp file sai định dạng MIME type
      if (err.message === "INVALID_FILE_TYPE") {
        return res.status(400).json({
          message: "Chỉ chấp nhận file ảnh JPEG/PNG/WEBP",
        });
      }
      // Trường hợp file vượt quá dung lượng giới hạn 2MB của Multer
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File vượt quá dung lượng cho phép (2MB)",
        });
      }
      // Các lỗi hệ thống khác nếu có
      return res.status(500).json({
        message: err.message,
      });
    }

    // Trường hợp client không gửi file nào lên
    if (!req.file) {
      return res.status(400).json({
        message: "Vui lòng chọn file ảnh để upload",
      });
    }

    // Trả về response thành công đúng format yêu cầu
    res.status(200).json({
      message: "Upload thành công",
      filename: req.file.filename,
      size: req.file.size,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});
