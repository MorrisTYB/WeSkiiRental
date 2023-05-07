// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMSpfYgzpXtDYhPgzjh37LrZ3kZaL0xd8",
  authDomain: "csc430-bcc87.firebaseapp.com",
  projectId: "csc430-bcc87",
  storageBucket: "csc430-bcc87.appspot.com",
  messagingSenderId: "649727629205",
  appId: "1:649727629205:web:1a85ba1ef3ab983080489c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;



