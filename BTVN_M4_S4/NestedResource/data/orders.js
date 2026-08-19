export const orders = [
  { id: 1, userId: 1, status: "pending", total: 100 },
  { id: 2, userId: 1, status: "paid", total: 200 },
  { id: 3, userId: 1, status: "cancelled", total: 50 },
  { id: 4, userId: 1, status: "paid", total: 300 },
  { id: 5, userId: 2, status: "pending", total: 150 },
  { id: 6, userId: 2, status: "paid", total: 250 },
  { id: 7, userId: 2, status: "paid", total: 120 },
  { id: 8, userId: 3, status: "pending", total: 80 },
  { id: 9, userId: 3, status: "cancelled", total: 90 },
  { id: 10, userId: 3, status: "paid", total: 400 },
];

// Mảng giả lập kiểm tra user có tồn tại hay không
export const validUserIds = [1, 2, 3];
