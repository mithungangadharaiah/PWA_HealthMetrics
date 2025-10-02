// Firebase Configuration for GitHub Pages Production
// This file contains the actual Firebase config and can be safely committed to GitHub
// (Firebase config values are meant to be public for client-side apps)

const firebaseConfig = {
  apiKey: "AIzaSyD9-gosI2xQFo5mcGD6wG1xwqQshBm6lfM",
  authDomain: "healthmetrics-10bdf.firebaseapp.com",
  projectId: "healthmetrics-10bdf",
  storageBucket: "healthmetrics-10bdf.firebasestorage.app",
  messagingSenderId: "1067329596935",
  appId: "1:1067329596935:web:b2d57c733737b98c51c4a2"
};

// Admin Configuration
const ADMIN_EMAILS = [
    "mithunglares@gmail.com"
];

// Analytics Configuration
const ANALYTICS_ENABLED = true;

// Export configuration
window.FIREBASE_CONFIG = firebaseConfig;
window.ADMIN_EMAILS = ADMIN_EMAILS;
window.ANALYTICS_ENABLED = ANALYTICS_ENABLED;

console.log("Firebase production config loaded successfully");
