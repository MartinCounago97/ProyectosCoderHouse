import { db } from "./FireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { addDoc, getDoc, doc } from "firebase/firestore";

export const getProducts = () => {
  const productosCollection = collection(db, "productos");

  return getDocs(productosCollection)
    .then((respuesta) => {
      return respuesta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    })
    .catch((error) => {
      console.error("Error obteniendo productos:", error);
      return [];
    });
};

export const getProductById = (id) => {
  const productoRef = doc(db, "productos", id);

  return getDoc(productoRef)
    .then((snapshot) => {
      if (!snapshot.exists()) return null;

      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    })
    .catch((error) => {
      console.error("Error obteniendo producto:", error);
      return null;
    });
};

export const getProductsByCategory = (category) => {
  const productosCollection = collection(db, "productos");

  return getDocs(productosCollection)
    .then((respuesta) => {
      return respuesta.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((product) => product.category === category);
    })
    .catch((error) => {
      console.error("Error obteniendo productos por categoría:", error);
      return [];
    });
};
export function CargarDatos() {
  const misProductos = [
    {
      name: "Medialuna Dulce Clásica",
      price: 45,
      category: "Dulces",
      image: "/Data/Images/medialuna_dulce.jpg",
    },
    {
      name: "Medialuna Salada Clásica",
      price: 40,
      category: "Salados",
      image: "/Data/Images/salada.jpg",
    },
    {
      name: "Promo 6 Medialunas (Mixto)",
      price: 220,
      category: "Promociones",
      image: "/Data/Images/medialunas_dulce.jpg",
    },
    {
      name: "Medialuna Dulce Rellena de Dulce de Leche",
      price: 65,
      category: "Dulces",
      image: "/Data/Images/medialuna_ddl.jpeg",
    },
    {
      name: "Medialuna Dulce con Crema Pastelera",
      price: 75,
      category: "Dulces",
      image: "/Data/Images/medialuna_crema.jpeg",
    },
    {
      name: "Mini Medialunitas Dulces (Pack x10)",
      price: 120,
      category: "Dulces",
      image: "/Data/Images/medialunas_dulce.jpg",
    },
    {
      name: "Medialuna Salada con Jamón y Queso",
      price: 90,
      category: "Salados",
      image: "/Data/Images/jyq.jpeg",
    },
    {
      name: "Medialuna Salada con Jamón",
      price: 85,
      category: "Salados",
      image: "/Data/Images/jyq.jpeg",
    },
    {
      name: "Medialuna Salada Rellena con Pollo",
      price: 95,
      category: "Salados",
      image: "/Data/Images/medialuna_pollo.jpeg",
    },
    {
      name: "Promo Dulces x6",
      price: 250,
      category: "Promociones",
      image: "/Data/Images/medialunas_dulce.jpg",
    },
    {
      name: "Promo Salados x6",
      price: 260,
      category: "Promociones",
      image: "/Data/Images/medialunas_dulce.jpg",
    },
    {
      name: "Promo Familiar (20 unidades)",
      price: 650,
      category: "Promociones",
      image: "/Data/Images/promo_2.jpeg",
    },
    {
      name: "Promo Desayuno: 2 Medialunas + Café",
      price: 180,
      category: "Promociones",
      image: "/Data/Images/promo_desayuno.jpg",
    },
  ];

  const productosCollection = collection(db, "productos");

  misProductos.forEach((producto) => {
    addDoc(productosCollection, producto)
      .then((res) => console.log("Producto agregado con ID:", res.id))
      .catch((error) => console.error("Error al agregar el producto:", error));
  });
}
