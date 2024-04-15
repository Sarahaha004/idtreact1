// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa_UixcarSXAH3PK-8mVWuFYH6M1aQ_Mk",
  authDomain: "login-a54b8.firebaseapp.com",
  projectId: "login-a54b8",
  storageBucket: "login-a54b8.appspot.com",
  messagingSenderId: "96359984764",
  appId: "1:96359984764:web:31a9265cc3e9eb7418a3f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;