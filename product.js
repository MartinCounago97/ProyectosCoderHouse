const fs = require("fs");

const DATA_PATH = "./data/products.json";

function readData() {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(data);
}

function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function getProducts(req, res) {
  const data = readData();
  res.json(data.products);
}

function getProductById(req, res) {
  const data = readData();
  const id = parseInt(req.params.id);

  const product = data.products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
}

function addProduct(req, res) {
  const data = readData();

  const newProduct = {
    id: data.products.length + 1,
    ...req.body,
  };

  data.products.push(newProduct);
  saveData(data);

  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const data = readData();
  const id = parseInt(req.params.id);

  const index = data.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  data.products[index] = {
    ...data.products[index],
    ...req.body,
    id,
  };

  saveData(data);
  res.json(data.products[index]);
}

function deleteProduct(req, res) {
  const data = readData();
  const id = parseInt(req.params.id);

  const exists = data.products.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  data.products = data.products.filter((p) => p.id !== id);

  saveData(data);
  res.json({ message: "Producto eliminado" });
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
