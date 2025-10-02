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

### Smart Features
- ⏱️ **60-Second Sampling** - Automated testing with progress tracking
- 📊 **Health Reports** - Persistent data storage and analysis
- 🤖 **AI Health Analysis** - Intelligent insights (coming soon)
- 📱 **PWA Support** - Install on any device, works offline
- 🔐 **Privacy First** - All processing happens on device

### iOS Compatibility
- ✅ iPhone/iPad support via HTTPS
- 📸 Camera persistence - No re-permission needed
- 💡 Smart finger detection - Hover technique guidance
- 🔦 Flashlight control for better readings

## 🚀 Quick Start

### For iPhone Users (Recommended)

1. **Start HTTPS Server** (required for camera access):
   ```bash
   python start-https-server.py
   ```

2. **Connect on iPhone**:
   - Open Safari (Chrome also supported)
   - Navigate to: `https://YOUR-PC-IP:8443/HealthMetrics.html`
   - Accept the self-signed certificate warning
   - Grant camera permissions

3. **Add to Home Screen** for full PWA experience

### For Desktop/Android

Simply open `HealthMetrics.html` in any modern browser.

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
- **Backend**: Python HTTPS server with SSL
- **Storage**: LocalStorage for persistence
- **AI**: Integration ready for health insights

## 📂 Project Structure

```
BluetoothDashboard/
├── HealthMetrics.html          # Main PWA application
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker
├── start-https-server.py       # HTTPS server for iOS
├── FINGER_PLACEMENT_GUIDE.md   # Sensor usage guide
├── IPHONE_SETUP.md            # iOS setup instructions
├── REAL_SENSORS_ANALYSIS.md   # Technical analysis
└── .gitignore                 # Git ignore rules
```

## 🔒 Security & Privacy

- ✅ No data leaves your device
- ✅ SSL certificates auto-generated locally
- ✅ No external API calls (except AI feature when enabled)
- ✅ Camera stream stays on-device
- ✅ No tracking or analytics

## 🚧 Roadmap

### Phase 1 - Core Features (✅ Complete)
- [x] Camera-based heart rate detection
- [x] Real-time health monitoring
- [x] iOS compatibility
- [x] 60-second sampling
- [x] Persistent reports

### Phase 2 - AI Integration (🔄 In Progress)
- [ ] AI health analysis endpoint
- [ ] Personalized recommendations
- [ ] Anomaly detection
- [ ] Historical trend analysis

### Phase 3 - Commercialization (📋 Planned)
- [ ] User accounts & cloud sync
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
