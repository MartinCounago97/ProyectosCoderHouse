const fs = require("fs");

const DATA_PATH = "./data/products.json";

function readData() {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(data);
}

function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function createCart(req, res) {
  const data = readData();

  const newCart = {
    id: data.carts.length + 1,
    products: [],
  };

  data.carts.push(newCart);
  saveData(data);

  res.status(201).json(newCart);
}

function getCart(req, res) {
  const data = readData();
  const cid = parseInt(req.params.cid);

  const cart = data.carts.find((c) => c.id === cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  const detailedProducts = cart.products.map((item) => {
    const productInfo = data.products.find((p) => p.id === item.product);

    return {
      productId: item.product,
      title: productInfo ? productInfo.title : "Producto no encontrado",
      price: productInfo ? productInfo.price : null,
      quantity: item.quantity,
    };
  });

  res.json({
    id: cart.id,
    products: detailedProducts,
  });
}

function addProductToCart(req, res) {
  const data = readData();

  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const cart = data.carts.find((c) => c.id === cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  const productInCart = cart.products.find((p) => p.product === pid);

  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({
      product: pid,
      quantity: 1,
    });
  }

  saveData(data);
  res.json(cart);
}

module.exports = {
  createCart,
  getCart,
  addProductToCart,
};
