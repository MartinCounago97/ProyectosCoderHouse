const express = require("express");

// Importar rutas de productos y carrito
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./product");

const { createCart, getCart, addProductToCart } = require("./cart");

// Inicialización del servidor
const app = express();
const PORT = 8080;

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.json("Servidor Express funcionando");
});

// PRODUCTOS
app.get("/products", getProducts);
app.get("/products/:id", getProductById);
app.post("/products", addProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

// CARRITO
app.post("/carts", createCart);
app.get("/carts/:cid", getCart);
app.post("/carts/:cid/product/:pid", addProductToCart);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
