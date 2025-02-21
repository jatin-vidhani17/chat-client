// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU7KmGG-Wg26i8ZDySZ8lJB6sIUAbfb3A",
  authDomain: "ascendant-might-436706-e8.firebaseapp.com",
  databaseURL: "https://ascendant-might-436706-e8-default-rtdb.firebaseio.com",
  projectId: "ascendant-might-436706-e8",
  storageBucket: "ascendant-might-436706-e8.firebasestorage.app",
  messagingSenderId: "765615203237",
  appId: "1:765615203237:web:44a19b6850b5d19f6ffe4c",
  measurementId: "G-E077KZFKS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);