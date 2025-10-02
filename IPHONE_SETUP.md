# 📱 iPhone PWA Setup Guide

## ✅ Your HTTPS Server is Running!

**Access URL:** `https://192.168.1.8:8443/HealthMetrics.html`

---

## 🔧 Fix "Network Connection Lost" Error

### **Step 1: Test on Your PC First**
1. Open your PC browser and go to: `https://localhost:8443/HealthMetrics.html`
2. You'll see a security warning - click "Advanced" → "Proceed"
3. If the page loads on PC, the server works!

### **Step 2: Check Same WiFi**
- Make sure your iPhone and PC are on the **same WiFi network**
- Check iPhone WiFi settings shows same network name

### **Step 3: Windows Firewall (If needed)**
If you still get "connection lost", Windows Firewall might be blocking it.

**Option A: Allow in Firewall (Easy)**
1. Open **Windows Defender Firewall**
2. Click **"Allow an app through firewall"**
3. Click **"Change settings"** (need admin)
4. Click **"Allow another app"**
5. Browse to Python: `C:\Users\mithun.gangadharaiah\AppData\Local\Programs\Python\Python313\python.exe`
6. Add it and check both "Private" and "Public"

**Option B: Temporary Disable (Testing only)**
1. Open Windows Settings → Update & Security → Windows Security → Firewall
2. Turn off firewall temporarily
3. Test iPhone connection
4. **Remember to turn it back ON!**

### **Step 4: Safari Certificate Trust**
When you open the URL in Safari:

1. You'll see: **"This Connection Is Not Private"**
2. Tap **"Show Details"** (small text at bottom)
3. Tap **"Visit This Website"** (blue link)
4. Another warning appears
5. Tap **"Visit Website"** to confirm
6. Page should load! ✅

If page doesn't load:
- **Close Safari completely** (swipe up from bottom, swipe Safari away)
- **Reopen Safari** and try the URL again
- The certificate should now be trusted

---

## 📸 Enable Camera Access

Once the page loads:

1. Safari will ask: **"HealthMetrics.html Would Like to Access the Camera"**
2. Tap **"Allow"**
3. Camera feed should appear in the heart rate card

If camera doesn't work:
- Go to **Settings → Safari → Camera** → Set to **"Ask"** or **"Allow"**
- Reload the page

---

## 🏠 Add to Home Screen (Best Experience)

For full PWA features:

1. In Safari, tap the **Share button** (box with ↑)
2. Scroll down and tap **"Add to Home Screen"**
3. Tap **"Add"**
4. Open the app from your home screen
5. Works like a native app! 🎉

Benefits:
- ✅ Full screen (no browser UI)
- ✅ Faster loading
- ✅ Better camera access
- ✅ Offline support

---

## 🐛 Still Having Issues?

### Test Server Status:
```powershell
# On PC, check if server is running:
netstat -ano | findstr :8443
```

### Check Your Local IP:
```powershell
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter. Should match `192.168.1.8`

### Restart Server:
1. Stop: Press `Ctrl+C` in the terminal running the server
2. Start: `python start-https-server.py`

### Alternative: Use Mobile Hotspot
If nothing works:
1. Create a mobile hotspot on your iPhone
2. Connect your PC to the iPhone hotspot
3. Run `ipconfig` to get new PC IP address
4. Access that new IP from iPhone Safari

---

## 📞 Common Error Solutions

| Error | Solution |
|-------|----------|
| "Connection Lost" | Check firewall, same WiFi, restart server |
| "Cannot Connect" | Verify IP address is correct (192.168.1.8) |
| "Not Private" | Normal for self-signed cert - click "Visit Website" |
| "Camera Not Ready" | Allow camera in Settings → Safari → Camera |
| Page won't load | Close Safari completely and reopen |

---

## ✨ Server Commands

**Start Server:**
```powershell
cd "C:\Users\mithun.gangadharaiah\OneDrive - Dynatrace\Documents\GitHub\BluetoothDashboard"
python start-https-server.py
```

**Stop Server:**
Press `Ctrl+C` in the terminal

**Check if running:**
```powershell
netstat -ano | findstr :8443
```

---

**Good luck! Your health monitoring PWA should work perfectly now! 🎉**
