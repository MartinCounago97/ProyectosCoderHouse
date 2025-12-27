import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNhbwCUcXa9bgbETMURwTd8Pp-OWFGN5I",
  authDomain: "react-coder-ff9f4.firebaseapp.com",
  projectId: "react-coder-ff9f4",
  storageBucket: "react-coder-ff9f4.firebasestorage.app",
  messagingSenderId: "443850078232",
  appId: "1:443850078232:web:eba503a14362c381106b6d",
  measurementId: "G-DD67HYW4BJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
