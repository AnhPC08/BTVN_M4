export const generateLinks = (order) => {
  // Các links mặc định lúc nào cũng có
  const links = {
    self: { href: `/api/v2/orders/${order.id}`, method: "GET" },
    customer: { href: `/api/v2/users/${order.userId}`, method: "GET" },
  };

  // Chỉ thêm link 'cancel' nếu trạng thái đang là pending
  if (order.status === "pending") {
    links.cancel = {
      href: `/api/v2/orders/${order.id}/cancellation`,
      method: "POST",
    };
  }

  return links;
};
