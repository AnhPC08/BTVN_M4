import express from "express";
import { orders } from "./data/orders.js";
import { generateLinks } from "./utils/links.js";

const app = express();
const PORT = 3000;

app.get("/api/v2/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Không tìm thấy đơn hàng" });
  }

  // Format dữ liệu trả về kèm khối _links
  const responseData = {
    id: order.id,
    userId: order.userId,
    status: order.status,
    total: order.total,
    _links: generateLinks(order),
  };

  res.status(200).json({ success: true, data: responseData });
});

app.listen(PORT, () => {
  console.log(`Server BT10 đang chạy tại port ${PORT}`);
});
