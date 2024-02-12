// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "BIzaSyD_WnwOkGwoDanhxSg7ilII7M1sBplmkVs",
  authDomain: "coder-212ac.firebaseapp.com",
  projectId: "coder-212ac",
  storageBucket: "coder-212ac.appspot.com",
  messagingSenderId: "640195937724",
  appId: "1:640195937724:web:e5641e6fd4ba3dcf47d7b9",
  measurementId: "G-2Z3HWCS3GL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
