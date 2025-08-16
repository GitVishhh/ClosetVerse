// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkNt6z40JnXCQ_I8JhBenULE8Dps8ob0I",
  authDomain: "closetverse7.firebaseapp.com",
  projectId: "closetverse7",
  storageBucket: "closetverse7.firebasestorage.app",
  messagingSenderId: "838844962987",
  appId: "1:838844962987:web:a27afcf04bf3af17723fee",
  measurementId: "G-XW77VJYEZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
