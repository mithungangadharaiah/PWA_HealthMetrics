# 🏥 Health Metrics Dashboard - PWA

A Progressive Web App for comprehensive health monitoring using device sensors and camera-based pulse detection.

## 🎯 Features

### Real-Time Health Monitoring
- ❤️ **Heart Rate Detection** - Camera-based pulse oximetry with flashlight
- 🏃 **Step Counter** - Motion sensor tracking
- 🧘 **Activity Recognition** - Movement pattern analysis
- 😰 **Stress Levels** - Heart rate variability monitoring
- 🫁 **Blood Oxygen** - Camera-based SpO2 estimation
- 🩺 **Blood Pressure** - Estimated from heart rate data

### Authentication & Analytics
- 🔐 **Google Sign-In** - Secure OAuth 2.0 authentication
- 👥 **User Tracking** - Track who uses your app (with consent)
- 📊 **Admin Dashboard** - View user statistics and analytics
- 🔒 **Privacy Compliant** - GDPR & CCPA compliant data handling
- 💾 **Cloud Storage** - Firebase Firestore for data persistence

### Smart Features
- ⏱️ **60-Second Sampling** - Automated testing with progress tracking
- 📊 **Health Reports** - Persistent data storage and analysis
- 🤖 **AI Health Analysis** - Intelligent insights (coming soon)
- 📱 **PWA Support** - Install on any device, works offline
- 🌍 **Cross-Platform** - Works on iOS, Android, and Desktop

### iOS Compatibility
- ✅ iPhone/iPad support via HTTPS
- 📸 Camera persistence - No re-permission needed
- 💡 Smart finger detection - Hover technique guidance
- 🔦 Flashlight control for better readings

## 🚀 Quick Start

### 🔥 Firebase Setup (First-Time Only)

**For authentication and user tracking:**

1. **Follow the beginner-friendly guide**: See `FIREBASE_SETUP.md`
2. **Time required**: 15-20 minutes
3. **Cost**: FREE for first 10,000 users/month

Quick steps:
```bash
# 1. Create Firebase project at https://console.firebase.google.com/
# 2. Enable Google Authentication
# 3. Create Firestore database
# 4. Copy your config to firebase-config.js
```

Detailed instructions in: **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** ← Click here!

### For iPhone Users (Recommended)

1. **Start HTTPS Server** (required for camera access):
   ```bash
   python start-https-server.py
   ```

2. **Connect on iPhone**:
   - Open Safari (Chrome also supported)
   - Navigate to: `https://YOUR-PC-IP:8443/HealthMetrics.html`
   - Accept the self-signed certificate warning
   - **Sign in with Google** (new!)
   - Grant camera permissions

3. **Add to Home Screen** for full PWA experience

### For Desktop/Android

1. Open `HealthMetrics.html` in any modern browser
2. **Sign in with Google**
3. Start monitoring!

### Admin Dashboard

Access user analytics:
1. Open `admin-dashboard.html`
2. Sign in with your admin email (configured in `firebase-config.js`)
3. View user statistics, test results, and usage patterns

## 📱 Usage Instructions

### Camera-Based Heart Rate Detection

**⚠️ IMPORTANT - Finger Placement:**
- **HOVER** your finger 2-3mm ABOVE the camera lens
- Do NOT press finger on the lens
- Keep flashlight ON for best results
- You should see a red glow through your finger
- Optimal brightness: 60-220 range

### Testing Workflow

1. **Start Test** - Begins 60-second automated sampling
2. **Position Finger** - Hover over camera with flashlight on
3. **Wait** - Progress bar shows remaining time
4. **Auto-Stop** - Test completes automatically
5. **View Report** - Persistent health data and trends

### Control Panel

All controls in one place:
- ▶️ **Start Test** / ⏹️ **Stop Test** - Control monitoring
- 🔦 **Flashlight** - Toggle torch for camera detection
- 📷 **Release Camera** - Free camera for other apps
- 🔄 **Reset Data** - Clear all health samples
- 🤖 **AI Analysis** - Get intelligent insights (coming soon)

## 🛠️ Technical Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (no frameworks)
- **APIs**: Camera API, MediaStream, Sensor APIs, Service Workers
- **Authentication**: Firebase Auth with Google OAuth 2.0
- **Database**: Firebase Firestore (NoSQL cloud database)
- **Backend**: Python HTTPS server with SSL
- **Storage**: LocalStorage + Firestore for persistence
- **Security**: HTTPS, OAuth 2.0 with PKCE, Firestore security rules
- **AI**: Integration ready for health insights

## 📂 Project Structure

```
BluetoothDashboard/
├── HealthMetrics.html          # Main PWA application
├── admin-dashboard.html        # Admin analytics dashboard (NEW!)
├── privacy-policy.html         # Privacy policy & GDPR compliance (NEW!)
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker
├── firebase-config.js          # Firebase configuration (excluded from git)
├── firebase-config.template.js # Template for Firebase config (NEW!)
├── firebase-auth.js            # Authentication module (NEW!)
├── firebase-analytics.js       # Analytics tracking module (NEW!)
├── start-https-server.py       # HTTPS server for iOS
├── FIREBASE_SETUP.md           # Beginner-friendly Firebase guide (NEW!)
├── FINGER_PLACEMENT_GUIDE.md   # Sensor usage guide
├── IPHONE_SETUP.md            # iOS setup instructions
├── REAL_SENSORS_ANALYSIS.md   # Technical analysis
└── .gitignore                 # Git ignore rules
```

## 🔒 Security & Privacy

- ✅ **Google OAuth 2.0** - Industry-standard authentication
- ✅ **Encrypted data** - HTTPS + Firebase encryption at rest
- ✅ **GDPR Compliant** - User consent, right to delete, data export
- ✅ **Privacy Policy** - Full transparency on data usage
- ✅ **No data selling** - Your data is never sold to third parties
- ✅ **On-device processing** - Health calculations happen locally
- ✅ **Secure database** - Firestore security rules protect user data
- ✅ **Admin access control** - Email whitelist for dashboard access

**Privacy Policy**: See `privacy-policy.html` for full details

## 🚧 Roadmap

### Phase 1 - Core Features (✅ Complete)
- [x] Camera-based heart rate detection
- [x] Real-time health monitoring
- [x] iOS compatibility
- [x] 60-second sampling
- [x] Persistent reports

### Phase 2 - Authentication & Analytics (✅ Complete)
- [x] Google Sign-In integration
- [x] User tracking with consent
- [x] Admin dashboard
- [x] Firebase Firestore database
- [x] Privacy policy & GDPR compliance

### Phase 3 - AI Integration (🔄 In Progress)
- [ ] AI health analysis endpoint
- [ ] Personalized recommendations
- [ ] Anomaly detection
- [ ] Historical trend analysis

### Phase 4 - Commercialization (📋 Planned)
- [ ] Cloud sync across devices
- [ ] Premium features
- [ ] Integration with health platforms
- [ ] API for third-party apps
- [ ] Medical device compliance research

## 🤝 Contributing

This project is currently in development. Contributions welcome!

## 📄 License

Copyright © 2025. All rights reserved.
*License type to be determined for commercial release*

## 📧 Contact

For commercial inquiries or partnership opportunities, please contact: [Your contact info]

---

**⚕️ Medical Disclaimer**: This app is for informational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional for medical advice.
