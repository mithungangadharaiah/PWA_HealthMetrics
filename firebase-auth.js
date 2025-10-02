// Firebase Authentication Module
// ========================================
// This handles Google Sign-In for your health app

let auth = null;
let db = null;
let currentUser = null;

// Initialize Firebase
async function initFirebase() {
    try {
        // Check if Firebase config is loaded
        if (!window.FIREBASE_CONFIG) {
            console.error('[ERROR] Firebase config not loaded. Make sure firebase-config.js is included first.');
            return false;
        }

        // Initialize Firebase App
        const app = firebase.initializeApp(window.FIREBASE_CONFIG);
        auth = firebase.auth();
        db = firebase.firestore();

        console.log('[OK] Firebase initialized successfully!');

        // Listen for authentication state changes
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                currentUser = user;
                console.log('[OK] User signed in:', user.email);
                await onUserSignedIn(user);
            } else {
                currentUser = null;
                console.log('User signed out');
                updateUIForSignedOutUser();
            }
        });

        return true;
    } catch (error) {
        console.error('[ERROR] Firebase initialization failed:', error);
        showError('Failed to initialize Firebase: ' + error.message);
        return false;
    }
}

// Google Sign-In
async function signInWithGoogle() {
    try {
        if (!auth) {
            showError('Firebase authentication not loaded');
            return;
        }

        console.log('Starting Google Sign-In...');
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');

        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        console.log('[OK] Sign-in successful:', user.email);
        await saveUserProfile(user);
        showSuccess('Welcome ' + user.displayName + '!');
        
    } catch (error) {
        console.error('[ERROR] Sign-in failed:', error);
        let errorMessage = 'Sign-in failed. ';
        
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage += 'Sign-in was cancelled.';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage += 'Pop-up was blocked by browser. Please allow pop-ups and try again.';
        } else {
            errorMessage += error.message;
        }
        
        showError(errorMessage);
    }
}

// Handle user signed in
async function onUserSignedIn(user) {
    try {
        await saveUserProfile(user);
        updateUIForSignedInUser(user);
        if (window.logSessionStart) {
            window.logSessionStart(user.uid, user.email);
        }
    } catch (error) {
        console.error('[ERROR] Error handling signed-in user:', error);
    }
}

// Save user profile to Firestore
async function saveUserProfile(user) {
    try {
        if (!db) {
            console.warn('[WARNING] Firestore not available');
            return;
        }
        const userProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('users').doc(user.uid).set(userProfile, { merge: true });
        console.log('[OK] User profile saved');
    } catch (error) {
        console.error('[ERROR] Failed to save user profile:', error);
    }
}

// Update UI for signed-in user
function updateUIForSignedInUser(user) {
    try {
        const signInSection = document.getElementById('sign-in-section');
        const userSection = document.getElementById('user-section');
        const mainContent = document.getElementById('main-content');
        
        if (signInSection) signInSection.style.display = 'none';
        if (userSection) userSection.style.display = 'block';
        if (mainContent) mainContent.style.display = 'block';
        
        const userEmail = document.getElementById('user-email');
        const userName = document.getElementById('user-name');
        if (userEmail) userEmail.textContent = user.email;
        if (userName) userName.textContent = user.displayName || 'User';
    } catch (error) {
        console.error('[ERROR] Failed to update UI for signed-in user:', error);
    }
}

// Update UI for signed-out user
function updateUIForSignedOutUser() {
    try {
        const signInSection = document.getElementById('sign-in-section');
        const userSection = document.getElementById('user-section');
        const mainContent = document.getElementById('main-content');
        
        if (signInSection) signInSection.style.display = 'block';
        if (userSection) userSection.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
    } catch (error) {
        console.error('[ERROR] Failed to update UI for signed-out user:', error);
    }
}

// Show success message
function showSuccess(message) {
    try {
        console.log('[OK] ' + message);
        alert('[OK] ' + message);
    } catch (error) {
        console.error('[ERROR] Failed to show success message:', error);
    }
}

// Show error message
function showError(message) {
    try {
        console.error('[ERROR] ' + message);
        alert('[ERROR] ' + message);
    } catch (error) {
        console.error('[ERROR] Failed to show error message:', error);
    }
}

// Export functions to global scope
window.initFirebase = initFirebase;
window.signInWithGoogle = signInWithGoogle;
window.showError = showError;
window.showSuccess = showSuccess;
