export const versionResolver = (req, res, next) => {
  // Đọc header (Express tự động chuyển key header về chữ thường)
  req.apiVersion = req.headers["api-version"] || "v1";
  next();
};
