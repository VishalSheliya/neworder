// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9LfdqD0kXvE4S01MO-7Ha04xIOy1sDUQ",
  authDomain: "neworder-cf564.firebaseapp.com",
  projectId: "neworder-cf564",
  storageBucket: "neworder-cf564.appspot.com",
  messagingSenderId: "624583701493",
  appId: "1:624583701493:web:3d611effd5cee4743fe6bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

export { db, storage };