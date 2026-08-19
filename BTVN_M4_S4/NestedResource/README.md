Báo cáo: Bài tập Nested Resource và Query String

Kịch bản 1: Đủ tham số query (status và limit)

- URL Test: GET http://localhost:3000/api/v1/users/1/orders?status=paid&limit=1
- Kết quả mong đợi: Trả về HTTP Status 200.
- Dữ liệu trả về: { success: true, data: [{id: 2, userId: 1, status: 'paid', total: 200}], meta: { total: 1 } }.

Kịch bản 2: Không truyền tham số query

- URL Test: GET http://localhost:3000/api/v1/users/2/orders
- Kết quả mong đợi: Trả về HTTP Status 200.
- Dữ liệu trả về: Lấy toàn bộ đơn hàng của user 2, giới hạn mặc định ở 5 bản ghi. Meta total báo chính xác số lượng trong mảng data.

Kịch bản 3: userId không tồn tại

- URL Test: GET http://localhost:3000/api/v1/users/99/orders
- Kết quả mong đợi: Trả về HTTP Status 404.
- Dữ liệu trả về: { success: false, code: 'USER_NOT_FOUND', message: 'User không tồn tại trong hệ thống' } (Không trả về mảng rỗng).
