// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2E-132qkC6sAmuPEAgnOr3QUg2nO7UuM",
  authDomain: "ionic-499116.firebaseapp.com",
  projectId: "ionic-499116",
  storageBucket: "ionic-499116.firebasestorage.app",
  messagingSenderId: "304025860925",
  appId: "1:304025860925:web:14db2210eed0dda37f2354",
  measurementId: "G-XDVVPTPFK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
