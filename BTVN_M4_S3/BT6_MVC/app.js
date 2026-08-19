import express from "express";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

// Middleware bat buoc de doc body dang JSON
app.use(express.json());

// Gan router voi tien to URL theo yeu cau
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server dang chay tai port ${PORT}`);
});
