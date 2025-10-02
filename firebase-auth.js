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
            console.error('[ERROR] Firebase config not loaded. Make sure firebase-config-production.js is included first.');
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
        
        // Show subtle success message instead of alert
        const status = document.getElementById('status');
        if (status) {
            status.textContent = ' Welcome ' + (user.displayName || user.email) + '!';
            status.style.background = 'rgba(100,255,100,0.3)';
            status.style.color = 'white';
            setTimeout(() => {
                status.style.background = '';
                status.style.color = '';
                status.textContent = 'Ready to monitor your health';
            }, 3000);
        }
        
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
        
        // Log session start for analytics
        if (window.ANALYTICS_ENABLED && db) {
            try {
                await db.collection('analytics').add({
                    userId: user.uid,
                    userEmail: user.email,
                    action: 'session_start',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    userAgent: navigator.userAgent,
                    platform: navigator.platform
                });
                console.log('[OK] Session start logged');
            } catch (error) {
                console.error('[ERROR] Failed to log session start:', error);
            }
        }
    } catch (error) {
        console.error('[ERROR] Error handling signed-in user:', error);
    }
}

// Save user profile to Firestore with better tracking
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
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            // Track additional session info
            lastUserAgent: navigator.userAgent,
            lastPlatform: navigator.platform,
            totalSessions: firebase.firestore.FieldValue.increment(1)
        };
        
        await db.collection('users').doc(user.uid).set(userProfile, { merge: true });
        console.log('[OK] User profile saved with session tracking');
    } catch (error) {
        console.error('[ERROR] Failed to save user profile:', error);
    }
}

// Update UI for signed-in user - FIXED for actual HTML elements
function updateUIForSignedInUser(user) {
    try {
        const loginPrompt = document.getElementById('login-prompt');
        const userInfo = document.getElementById('user-info');
        const mainContent = document.getElementById('main-content');
        const logoutBtn = document.getElementById('logout-btn');
        const adminLink = document.getElementById('admin-link');
        
        // Hide login prompt, show main content
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (adminLink) adminLink.style.display = 'inline-block';
        
        // Update user info in header
        const userEmail = document.getElementById('user-email');
        const userName = document.getElementById('user-name');
        const userPhoto = document.getElementById('user-photo');
        
        if (userName) userName.textContent = user.displayName || 'User';
        if (userEmail) userEmail.textContent = user.email;
        if (userPhoto && user.photoURL) {
            userPhoto.src = user.photoURL;
            userPhoto.style.display = 'block';
        }
        
        console.log('[OK] UI updated for signed-in user');
    } catch (error) {
        console.error('[ERROR] Failed to update UI for signed-in user:', error);
    }
}

// Update UI for signed-out user
function updateUIForSignedOutUser() {
    try {
        const loginPrompt = document.getElementById('login-prompt');
        const userInfo = document.getElementById('user-info');
        const mainContent = document.getElementById('main-content');
        const logoutBtn = document.getElementById('logout-btn');
        const adminLink = document.getElementById('admin-link');
        
        // Show login prompt, hide main content
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
        
        console.log('[OK] UI updated for signed-out user');
    } catch (error) {
        console.error('[ERROR] Failed to update UI for signed-out user:', error);
    }
}

// Show error message - use status div instead of alert
function showError(message) {
    try {
        console.error('[ERROR] ' + message);
        const status = document.getElementById('status');
        if (status) {
            status.textContent = ' ' + message;
            status.style.background = 'rgba(255,100,100,0.3)';
            status.style.color = 'white';
            setTimeout(() => {
                status.style.background = '';
                status.style.color = '';
            }, 5000);
        } else {
            // Fallback to alert only if status div not found
            alert(' ' + message);
        }
    } catch (error) {
        console.error('[ERROR] Failed to show error message:', error);
    }
}

// Export functions to global scope
window.initFirebase = initFirebase;
window.signInWithGoogle = signInWithGoogle;
window.showError = showError;
