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

// Google Gemini AI Configuration
const GEMINI_API_KEY = 'AIzaSyC34bRrVdXL9Y8Mw7_n8f4HSduUrmfNWOU';
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Export configuration
window.FIREBASE_CONFIG = firebaseConfig;
window.ADMIN_EMAILS = ADMIN_EMAILS;
window.ANALYTICS_ENABLED = ANALYTICS_ENABLED;
window.GEMINI_API_KEY = GEMINI_API_KEY;
window.GEMINI_MODEL = GEMINI_MODEL;
window.GEMINI_URL = GEMINI_URL;

console.log("Firebase production config loaded successfully");
console.log("Google Gemini AI enabled for production");
