import express from "express";
import { orders, validUserIds } from "./data/orders.js";

const app = express();
const PORT = 3000;

// Middleware phân tích JSON
app.use(express.json());

// Middleware bắt lỗi JSON sai định dạng
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ success: false, message: "JSON sai định dạng" });
  }
  next();
});

// Route GET xử lý lấy danh sách và chặn limit
app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId);

  if (!validUserIds.includes(userId)) {
    return res.status(404).json({ success: false, code: "USER_NOT_FOUND" });
  }

  const limit = req.query.limit ? parseInt(req.query.limit) : 5;

  // Test case: limit vượt giới hạn
  if (limit > 50) {
    return res
      .status(400)
      .json({ success: false, message: "Limit không vượt quá 50" });
  }

  let result = orders.filter((o) => o.userId === userId).slice(0, limit);
  res
    .status(200)
    .json({ success: true, data: result, meta: { total: result.length } });
});

// Route POST xử lý tạo mới đơn hàng
app.post("/api/v1/users/:userId/orders", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "Body rỗng" });
  }
  res.status(201).json({ success: true, data: req.body });
});

app.listen(PORT, () => console.log(`Server BT9 chạy tại port ${PORT}`));
