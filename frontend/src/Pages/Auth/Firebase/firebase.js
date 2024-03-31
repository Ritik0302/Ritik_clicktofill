// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEaoXdg9U1lNvEMW7HauHUoPszlBwnbJM",
  authDomain: "hirewynkcrm.firebaseapp.com",
  projectId: "hirewynkcrm",
  storageBucket: "hirewynkcrm.appspot.com",
  messagingSenderId: "837698696044",
  appId: "1:837698696044:web:d84a6bf264519553cab949",
  measurementId: "G-Y0JLD76NWY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// export { db };
export { analytics, app, db };
