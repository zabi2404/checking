// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5f093.firebaseapp.com",
  projectId: "mern-estate-5f093",
  storageBucket: "mern-estate-5f093.appspot.com", // ✅ FIXED
  messagingSenderId: "82599492391",
  appId: "1:82599492391:web:7c332af3687d8ca7b40702"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
