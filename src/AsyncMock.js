import { db } from "./FireBaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getProducts = () => {
  const productosCollection = collection(db, "productos");
  return getDocs(productosCollection)
    .then((respuesta) => {
      const productsFormateados = [];
      respuesta.docs.forEach((doc) => {
        productsFormateados.push(doc.data());
      });
      return productsFormateados;
    })
    .catch((error) => {
      console.error("Error obteniendo productos:", error);
    });
};

getProducts();

export const getProductById = (id) => {};

export const getProductsByCategory = (category) => {};
