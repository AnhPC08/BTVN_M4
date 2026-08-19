import express from "express";
import { versionResolver } from "./middlewares/versionResolver.js";
import { books } from "./data/books.js";

const app = express();
const PORT = 3000;

// Gắn middleware phân giải version cho toàn cục
app.use(versionResolver);

app.get("/api/books", (req, res) => {
  const version = req.apiVersion;

  // Xử lý logic cho Version 1
  if (version === "v1") {
    // Thêm headers cảnh báo ngừng hỗ trợ
    res.setHeader("Deprecation", "true");
    res.setHeader("Sunset", "Wed, 31 Dec 2025 23:59:59 GMT");

    const dataV1 = books.map((b) => ({
      id: b.id,
      title: b.title,
      author: b.authorName,
    }));

    return res.status(200).json({ success: true, data: dataV1 });
  }

  // Xử lý logic cho Version 2
  if (version === "v2") {
    // Format data kiểu mới, nested object
    const dataV2 = books.map((b) => ({
      id: b.id,
      title: b.title,
      author: { id: b.authorId, name: b.authorName },
      publishedYear: b.publishedYear,
    }));

    return res.status(200).json({ success: true, data: dataV2 });
  }

  // Xử lý version không tồn tại
  return res.status(400).json({
    success: false,
    code: "UNSUPPORTED_API_VERSION",
    message: `Hệ thống không hỗ trợ version: ${version}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});
