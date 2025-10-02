# 🔥 Firebase Setup Guide - For Complete Beginners
**Simple step-by-step instructions to set up Google Authentication**

---

## ⏱️ Time Required: **15-20 minutes**
## 💰 Cost: **FREE** (for first 10,000 users/month)

---

## 📋 What You'll Need
- ✅ A Google account (Gmail)
- ✅ Your project files (you already have these!)
- ✅ 20 minutes of your time

---

## 🚀 Step 1: Create a Firebase Project

### 1.1 Go to Firebase Console
1. Open your web browser
2. Go to: **https://console.firebase.google.com/**
3. Click **"Get started"** or **"Go to console"**

### 1.2 Create New Project
1. Click **"Add project"** or **"Create a project"**
2. **Project Name**: Enter any name (e.g., "HealthMetrics" or "MyHealthApp")
   - This is just for you, users won't see it
3. Click **"Continue"**

### 1.3 Google Analytics (Optional)
1. **Toggle OFF** "Enable Google Analytics" (you don't need it now)
2. Click **"Create project"**
3. ⏳ Wait 30-60 seconds while Firebase sets up
4. Click **"Continue"** when ready

✅ **Done!** Your Firebase project is created.

---

## 🔐 Step 2: Enable Google Authentication

### 2.1 Go to Authentication
1. In the left sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"** button

### 2.2 Enable Google Sign-In
1. Click the **"Sign-in method"** tab at the top
2. Find **"Google"** in the list
3. Click on **"Google"**
4. Toggle the **"Enable"** switch to ON (it turns blue)
5. **Project support email**: Select your email from dropdown
6. Click **"Save"**

✅ **Done!** Google sign-in is now enabled.

---

## 🗄️ Step 3: Set Up Firestore Database

### 3.1 Create Database
1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**

### 3.2 Choose Security Rules
1. Select **"Start in test mode"** (we'll secure it later)
2. Click **"Next"**

### 3.3 Choose Location
1. Select a location close to you (e.g., "us-central" for USA, "europe-west" for Europe)
   - ⚠️ You can't change this later!
2. Click **"Enable"**
3. ⏳ Wait 1-2 minutes while Firestore is created

✅ **Done!** Your database is ready.

---

## 🔑 Step 4: Get Your Firebase Configuration

### 4.1 Go to Project Settings
1. Click the **⚙️ gear icon** (top left, next to "Project Overview")
2. Click **"Project settings"**

### 4.2 Register Your Web App
1. Scroll down to **"Your apps"** section
2. Click the **</> Web icon** (third icon)
3. **App nickname**: Enter "Health Metrics PWA" (or any name)
4. ✅ Check **"Also set up Firebase Hosting"** (optional, but recommended)
5. Click **"Register app"**

### 4.3 Copy Configuration
You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnop",
  authDomain: "my-health-app.firebaseapp.com",
  projectId: "my-health-app",
  storageBucket: "my-health-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789:web:abcdef123456"
};
```

**📋 Keep this window open!** You'll need these values in the next step.

✅ **Done!** You have your configuration keys.

---

## 📝 Step 5: Configure Your Project

### 5.1 Open Your Project Folder
1. Open the folder where you saved your Health Metrics app
2. Find the file: **`firebase-config.js`**

### 5.2 Edit firebase-config.js
1. Open `firebase-config.js` in any text editor (Notepad, VS Code, etc.)
2. **Replace** the placeholder values with YOUR values from Step 4.3:

```javascript
const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY_HERE",              
    authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",    
    projectId: "PASTE_YOUR_PROJECT_ID_HERE",             
    storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",     
    messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",      
    appId: "PASTE_YOUR_APP_ID_HERE"                      
};
```

3. **Replace** `"your-email@gmail.com"` with YOUR actual email:

```javascript
const ADMIN_EMAILS = [
    "youremail@gmail.com"  // ⚠️ Change this to YOUR email!
];
```

4. **Save** the file

✅ **Done!** Your app is configured.

---

## 🔒 Step 6: Secure Your Firestore Database

### 6.1 Go to Firestore Rules
1. In Firebase Console, go to **"Firestore Database"**
2. Click the **"Rules"** tab at the top

### 6.2 Replace Rules
Delete everything and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Health sessions - users can write their own, admins can read all
    match /healthSessions/{sessionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Sessions - same as health sessions
    match /sessions/{sessionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Page views - same
    match /pageViews/{viewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Errors - anyone can log errors
    match /errors/{errorId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

✅ **Done!** Your database is secure.

---

## 🧪 Step 7: Test Your Setup

### 7.1 Open Your App
1. If using HTTPS server: Run `python start-https-server.py`
2. Or open `HealthMetrics.html` directly

### 7.2 Try Signing In
1. You should see a **"Sign in with Google"** button
2. Click it
3. Choose your Google account
4. Grant permissions
5. You should see: **"Welcome, [Your Name]! 🎉"**

### 7.3 Check Firebase Console
1. Go back to Firebase Console
2. Click **"Authentication"** → **"Users"** tab
3. You should see YOUR account listed!

✅ **Success!** Authentication is working!

---

## 📊 Step 8: Check the Admin Dashboard

1. Open `admin-dashboard.html` in your browser
2. Sign in with YOUR email (the one in `ADMIN_EMAILS`)
3. You should see the dashboard with user statistics!

---

## 🎉 You're Done!

Your Health Metrics app now has:
- ✅ Google sign-in
- ✅ Secure user tracking
- ✅ Admin analytics dashboard
- ✅ GDPR-compliant data storage

---

## ❓ Troubleshooting

### "Firebase config not loaded"
- ✅ Make sure `firebase-config.js` is in the same folder as `HealthMetrics.html`
- ✅ Check that you saved your edits to `firebase-config.js`

### "Sign-in popup blocked"
- ✅ Allow pop-ups for your site in browser settings
- ✅ Try again

### "Access Denied! You are not authorized as an admin"
- ✅ Check that your email in `firebase-config.js` matches your Google account email EXACTLY
- ✅ No typos, no extra spaces

### "Permission denied" errors in console
- ✅ Make sure you published the Firestore security rules (Step 6)
- ✅ Make sure you're signed in

---

## 🆘 Still Stuck?

1. **Check the browser console** (Press F12, click "Console" tab)
2. **Look for error messages** - they usually tell you what's wrong
3. **Double-check all steps** - most issues are typos or skipped steps

---

## 🚀 Next Steps

1. **Deploy to GitHub Pages** - See `GITHUB_PAGES_DEPLOYMENT.md`
2. **Add your app URL to Firebase**:
   - Go to Firebase Console → Authentication → Settings → Authorized domains
   - Add: `yourusername.github.io`
3. **Share with friends** - They can now use your app!

---

## 💡 Tips

- **FREE tier limits**: 10,000 sign-ins per month (perfect for starting!)
- **Costs**: $0/month for first ~10,000 users
- **Upgrade later**: Only if you get REALLY popular (good problem to have!)
- **Security**: Never share your `firebase-config.js` publicly (it's in `.gitignore`)

---

**Need help?** Check the official Firebase docs: https://firebase.google.com/docs/auth
