// 🔥 Firebase Auth Imports
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { app } from "./firebase-config.js";

// ⚙️ Initialize Auth
const auth = getAuth(app);

// ✅ Dashboard Setup
window.initializeDashboard = function () {
  const userSpan = document.getElementById("user-name");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const username = user.email.slice(0, 5); // First 5 characters of email
      userSpan.textContent = `Hello, ${username}`;
      showWelcomePopup();
    } else {
      window.location.href = "index.html"; // Not logged in
    }
  });

  // Event Listeners
  document.getElementById("addClothesBtn").addEventListener("click", () => {
    const uploadSection = document.getElementById("upload-section");
    uploadSection.style.display = "block";

    const fileInput = document.getElementById("fileInput");
    fileInput.click(); // Automatically opens file picker
  });

  document.getElementById("fileInput").addEventListener("change", (e) => handleFiles(e.target.files));

  const dropzone = document.getElementById("dropzone");
  dropzone.addEventListener("dragover", (e) => e.preventDefault());
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  });
};

// ✅ Welcome SweetAlert Popup
function showWelcomePopup() {
  Swal.fire({
    title: 'Welcome to ClosetVerse! 👗✨',
    text: 'Your AI stylist is ready to go!',
    confirmButtonText: 'Let’s Go!',
    background: '#1e1e1e',
    color: '#ffffff',
    confirmButtonColor: '#64ffda'
  });
}

// ✅ Preview Uploaded Clothing Images
function handleFiles(files) {
  const previewArea = document.getElementById("previewArea");
  previewArea.innerHTML = "";

  Array.from(files).forEach(file => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.className = "preview-img";
      previewArea.appendChild(img);

      // Trigger animation again
      img.style.animation = "none";
      img.offsetHeight;
      img.style.animation = "popIn 0.4s ease-out forwards";
    };
    reader.readAsDataURL(file);
  });
}

// ✅ Logout Handler
window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Logout failed: " + error.message);
    });
};
