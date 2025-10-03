// Firebase Authentication Module
// Pure ASCII - No special characters to prevent encoding issues

// Initialize Firebase Authentication
async function initFirebase() {
    try {
        console.log('[INIT] Initializing Firebase Authentication...');
        
        // Wait for Firebase SDK to be loaded
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK not loaded');
        }
        console.log('[OK] Firebase SDK loaded');
        
        // Check if Firebase config is available
        if (!window.FIREBASE_CONFIG) {
            throw new Error('Firebase configuration not found. Make sure firebase-config.js is loaded first.');
        }
        console.log('[OK] Firebase config found');
        
        // Initialize Firebase App (CRITICAL - must be done before using any Firebase service)
        if (!firebase.apps.length) {
            firebase.initializeApp(window.FIREBASE_CONFIG);
            console.log('[OK] Firebase App initialized successfully');
        } else {
            console.log('[OK] Firebase App already initialized');
        }
        
        // Initialize Firebase Auth
        const auth = firebase.auth();
        console.log('[OK] Firebase Auth initialized successfully');
        
        // Set up auth state observer
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                handleUserSignedIn(user);
            } else {
                handleUserSignedOut();
            }
        });
        
        // Set up sign-in button
        const signInBtn = document.getElementById('google-signin-btn');
        if (signInBtn) {
            signInBtn.addEventListener('click', signInWithGoogle);
        }
        
        // Set up sign-out button
        const signOutBtn = document.getElementById('signout-btn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', signOut);
        }
        
        console.log('[OK] Firebase Authentication setup complete');
    } catch (error) {
        console.error('[ERROR] Firebase initialization error:', error);
        alert('Failed to initialize Firebase: ' + error.message);
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        console.log('[ACTION] Starting Google Sign-In...');
        const provider = new firebase.auth.GoogleAuthProvider();
        
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('[OK] Sign-in successful:', result.user.email);
        
        alert('Welcome ' + result.user.displayName + '!');
    } catch (error) {
        console.error('[ERROR] Sign-in failed:', error);
        let message = 'Sign-in failed: ';
        if (error.code === 'auth/popup-closed-by-user') {
            message += 'You closed the popup';
        } else if (error.code === 'auth/popup-blocked') {
            message += 'Popup was blocked. Please allow popups for this site.';
        } else {
            message += error.message;
        }
        alert(message);
    }
}

// Sign out
async function signOut() {
    try {
        await firebase.auth().signOut();
        console.log('[OK] User signed out');
        alert('Signed out successfully');
    } catch (error) {
        console.error('[ERROR] Sign-out failed:', error);
        alert('Sign-out failed: ' + error.message);
    }
}

// Handle user signed in
function handleUserSignedIn(user) {
    console.log('[USER] Signed in:', user.email);
    
    // Save user profile to Firestore
    saveUserData(user);
    
    // Update UI
    const signInSection = document.getElementById('sign-in-section');
    const userSection = document.getElementById('user-section');
    const mainContent = document.getElementById('main-content');
    
    if (signInSection) signInSection.style.display = 'none';
    if (userSection) {
        userSection.style.display = 'block';
        const userEmail = document.getElementById('user-email');
        const userName = document.getElementById('user-name');
        if (userEmail) userEmail.textContent = user.email;
        if (userName) userName.textContent = user.displayName || 'User';
    }
    if (mainContent) {
        mainContent.style.display = 'block';
        
        // Initialize camera AFTER main-content is visible
        if (typeof initCamera === 'function') {
            console.log('[INIT] Initializing camera after sign-in...');
            setTimeout(() => {
                initCamera();
            }, 500); // Small delay to ensure DOM is ready
        } else {
            console.warn('[WARNING] initCamera function not found');
        }
    }
}

// Handle user signed out
function handleUserSignedOut() {
    console.log('[USER] Signed out');
    
    const signInSection = document.getElementById('sign-in-section');
    const userSection = document.getElementById('user-section');
    const mainContent = document.getElementById('main-content');
    
    if (signInSection) signInSection.style.display = 'block';
    if (userSection) userSection.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
}

// Save user data to Firestore
async function saveUserData(user) {
    try {
        if (typeof firebase.firestore === 'undefined') {
            console.warn('[WARNING] Firestore not available');
            return;
        }
        
        const db = firebase.firestore();
        await db.collection('users').doc(user.uid).set({
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        console.log('[OK] User data saved to Firestore');
    } catch (error) {
        console.error('[ERROR] Failed to save user data:', error);
    }
}

// Save health session to Firestore
async function saveHealthSessionToFirebase(sessionData) {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            console.warn('[WARNING] No user signed in - cannot save session');
            return;
        }
        
        if (typeof firebase.firestore === 'undefined') {
            console.warn('[WARNING] Firestore not available');
            return;
        }
        
        const db = firebase.firestore();
        await db.collection('healthSessions').add({
            userId: user.uid,
            userEmail: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            ...sessionData
        });
        
        console.log('[OK] Health session saved to Firestore');
    } catch (error) {
        console.error('[ERROR] Failed to save health session:', error);
    }
}

// Initialize when page loads
window.addEventListener('load', initFirebase);

// Export functions to global scope
window.initFirebase = initFirebase;
window.signInWithGoogle = signInWithGoogle;
window.signOut = signOut;
window.saveHealthSessionToFirebase = saveHealthSessionToFirebase;
