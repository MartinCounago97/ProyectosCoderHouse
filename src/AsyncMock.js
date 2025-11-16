export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("/Data/Data.json")
        .then((response) => response.json())
        .then((data) => {
          resolve(data.products);
        })
        .catch((error) => console.error("Error cargando productos:", error));
    }, 1000); // Simula un retraso de 1 segundo
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/Data/Data.json")
        .then((response) => response.json())
        .then((data) => {
          const product = data.products.find((p) => p.id === id);
          if (product) {
            resolve(product);
          } else {
            reject("Producto no encontrado");
          }
        })
        .catch((error) => console.error("Error cargando producto:", error));
    }, 1000); // Simula un retraso de 1 segundo
  });
};
