// src/Firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOtDlBTe1mhv9eHe7UN4GmVauj0UJdKG8",
  authDomain: "client-side-plateshare.firebaseapp.com",
  projectId: "client-side-plateshare",
  storageBucket: "client-side-plateshare.appspot.com",
  messagingSenderId: "578505308608",
  appId: "1:578505308608:web:9209ed6d28631c5fda7025"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
