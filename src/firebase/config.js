import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI1PHEPjYqHCoez2mU1CLQQp8WR_o6NA8",
  authDomain: "virtual-hero-43d82.firebaseapp.com",
  projectId: "virtual-hero-43d82",
  storageBucket: "virtual-hero-43d82.firebasestorage.app",
  messagingSenderId: "618779313323",
  appId: "1:618779313323:web:90bd5b14ee684b386863ee",
  measurementId: "G-SFT4E0BR2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);