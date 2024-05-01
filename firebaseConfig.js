// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO8b3q6vjWx1_JtGp_6DU1V7Bkvth4aPM",
  authDomain: "notepad-860c6.firebaseapp.com",
  databaseURL: "https://notepad-860c6-default-rtdb.firebaseio.com",
  projectId: "notepad-860c6",
  storageBucket: "notepad-860c6.appspot.com",
  messagingSenderId: "546760625900",
  appId: "1:546760625900:web:e752bf27c39c86fcf3dfc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
