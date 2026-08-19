import express from "express";
import { orders, validUserIds } from "./data/orders.js";

const app = express();
const PORT = 3000;

app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId);

  // Xử lý yêu cầu: userId không tồn tại trả 404 với code USER_NOT_FOUND
  if (!validUserIds.includes(userId)) {
    return res.status(404).json({
      success: false,
      code: "USER_NOT_FOUND",
      message: "User không tồn tại trong hệ thống",
    });
  }

  // Lấy query string
  const status = req.query.status;
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;

  // Lọc đơn hàng theo userId
  let resultOrders = orders.filter((order) => order.userId === userId);

  // Lọc tiếp theo status nếu có truyền lên
  if (status) {
    resultOrders = resultOrders.filter((order) => order.status === status);
  }

  // Áp dụng giới hạn số bản ghi (limit)
  resultOrders = resultOrders.slice(0, limit);

  // Trả về kết quả đúng format
  res.status(200).json({
    success: true,
    data: resultOrders,
    meta: {
      total: resultOrders.length,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại port ${PORT}`);
});
