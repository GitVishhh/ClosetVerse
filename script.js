// 🔥 Firebase Auth Imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// 🔥 App Import
import { app } from "./firebase-config.js";

// ⚙️ Initialize Auth
const auth = getAuth(app);



// ----------------- SIGNUP FUNCTION ------------------
window.signup = function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html"; // ✅ Auto-login & redirect
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
      document.getElementById("signup-btn")?.addEventListener("click", signup);

    });
};



// ----------------- LOGIN FUNCTION ------------------
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // ✅ Redirect after login
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};



// ------------- SHOW USER ON DASHBOARD ----------------
window.showUserInfo = function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("user-email").textContent = user.email;
    } else {
      // ❌ Not logged in, redirect to login
      window.location.href = "index.html";
    }
  });
};



// ----------------- LOGOUT FUNCTION ------------------
window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Logout failed: " + error.message);
    });
};