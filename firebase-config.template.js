// 🔥 Firebase Configuration TEMPLATE
// ========================================
// THIS IS A TEMPLATE FILE FOR GITHUB
// Copy this to firebase-config.js and replace with YOUR Firebase project details

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",              
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",    
    projectId: "YOUR_PROJECT_ID",             
    storageBucket: "YOUR_PROJECT_ID.appspot.com",     
    messagingSenderId: "YOUR_SENDER_ID",      
    appId: "YOUR_APP_ID"                      
};

// 🔧 Admin Configuration
const ADMIN_EMAILS = [
    "your-email@gmail.com"  // Replace with YOUR email address
];

// 📊 Analytics Configuration
const ANALYTICS_ENABLED = true;  

// Export configuration
window.FIREBASE_CONFIG = firebaseConfig;
window.ADMIN_EMAILS = ADMIN_EMAILS;
window.ANALYTICS_ENABLED = ANALYTICS_ENABLED;
