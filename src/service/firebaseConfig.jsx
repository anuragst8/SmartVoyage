// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8EoKIaHWmGW8MTpwV8dSHCQeoPYFWNso",
  authDomain: "journeywiz.firebaseapp.com",
  projectId: "journeywiz",
  storageBucket: "journeywiz.appspot.com",
  messagingSenderId: "497516056285",
  appId: "1:497516056285:web:f41a9acb33d7cf047c9534",
  measurementId: "G-8L56HZ302Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
