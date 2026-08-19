// Mảng dữ liệu lưu trong bộ nhớ
let products = [
  { id: 1, name: "Dien thoai iPhone 15", price: 20000000, quantity: 10 },
  { id: 2, name: "Laptop MacBook Air M3", price: 28000000, quantity: 5 },
];

let nextId = 3;

export const getAll = () => {
  return products;
};

export const create = (data) => {
  const newProduct = {
    id: nextId++,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  };
  products.push(newProduct);
  return newProduct;
};

export const findById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};
