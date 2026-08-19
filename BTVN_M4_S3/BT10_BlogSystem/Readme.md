Báo cáo: Hệ Thống Blog API - Phân Quyền Vai Trò

Phần 1: Danh sách Endpoints

Method: GET
Endpoint: /api/posts
Middleware: Không
Mô tả: Lấy danh sách toàn bộ bài viết.

Method: POST
Endpoint: /api/posts
Middleware: upload.single(thumbnail)
Mô tả: Tạo bài viết mới có đính kèm ảnh (tối đa 2MB).

Method: DELETE
Endpoint: /api/posts/:id
Middleware: authenticate, authorize(admin)
Mô tả: Xóa bài viết và toàn bộ comment liên quan (Chỉ admin).

Method: GET
Endpoint: /api/comments/:postId
Middleware: Không
Mô tả: Xem danh sách bình luận của một bài viết.

Method: POST
Endpoint: /api/comments
Middleware: authenticate
Mô tả: Đăng bình luận vào bài viết (Yêu cầu đăng nhập).

Phần 2: 5 Kịch bản Test trên Postman

Test 1: Tạo bài viết (Thành công)
Thao tác: Gửi POST /api/posts. Chọn body form-data, điền title, content và file thumbnail.
Kết quả mong đợi: Trả về mã 201 kèm link ảnh thumbnailUrl.

Test 2: Lỗi xác thực (Chưa đăng nhập)
Thao tác: Gửi POST /api/comments. Không gửi header Authorization.
Kết quả mong đợi: Trả về mã 401 kèm thông báo Chưa đăng nhập.

Test 3: Lỗi liên kết (Bài viết không tồn tại)
Thao tác: Gửi POST /api/comments. Gửi header Authorization là user. Body có postId là 99.
Kết quả mong đợi: Trả về mã 404 kèm thông báo Bài viết không tồn tại.

Test 4: Lỗi phân quyền (User đi xóa bài)
Thao tác: Gửi DELETE /api/posts/1. Gửi header Authorization là user.
Kết quả mong đợi: Trả về mã 403 kèm thông báo Không đủ quyền truy cập.

Test 5: Xóa bài viết và Comment (Thành công)
Thao tác: Gửi DELETE /api/posts/1. Gửi header Authorization là admin.
Kết quả mong đợi: Trả về mã 200. Bảng bài viết và bảng bình luận đều đã bị xóa dữ liệu tương ứng.
