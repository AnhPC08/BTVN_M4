import * as ProductModel from "../models/Product.js";

export const getProducts = (req, res) => {
  try {
    const products = ProductModel.getAll();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    // Validate dữ liệu đầu vào cơ bản
    if (!name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Thieu thong tin ten, gia hoac so luong san pham",
      });
    }

    const newProduct = ProductModel.create({ name, price, quantity });
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
