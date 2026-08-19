import AppError from "../utils/AppError.js";

// 1. Xác thực người dùng (Login)
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Chưa đăng nhập", 401));
  }
  // Giả lập giải mã token, lấy trực tiếp text làm role
  req.user = {
    id: 1,
    role: authHeader.trim(),
  };
  next();
};

// 2. Kiểm tra phân quyền
export const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(new AppError("Không đủ quyền truy cập", 403));
    }
    next();
  };
};
