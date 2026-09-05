# Quick Start Guide - Get Running in 5 Minutes

## Option 1: Run Frontend Only (Fastest)

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000`

**What you'll see:**
- Input field for Year/Make/Model (e.g., "2015 Honda Civic")
- Input field for diagnostic code (e.g., "P0300") or part name (e.g., "alternator")
- Mock AR view showing part location
- Step-by-step repair instructions

## Option 2: Run Full Stack (Frontend + Backend)

### Terminal 1 - Start Backend API

```bash
cd backend
npm install
npm start
```

Runs on `http://localhost:5000`

### Terminal 2 - Start Frontend

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000`

---

## What to Test First

1. **Enter Vehicle**: Type "2015 Honda Civic"
2. **Enter Code/Part**: Type "P0300" or "spark plug"
3. **View AR**: Click "Start AR Guide"
4. **Follow Steps**: Click through each repair step

---

## Mobile Testing

### Option A: Chrome DevTools Device Emulation (Desktop)
```
1. Open http://localhost:3000 in Chrome
2. Press F12 (DevTools)
3. Click device icon (top-left of DevTools)
4. Select "iPhone 12"
5. Test on mobile view
```

### Option B: Real Phone (Recommended)
```
1. Find your computer's IP: 
   - Windows: ipconfig (look for IPv4)
   - Mac/Linux: ifconfig (look for inet)
   
2. On your phone, visit: http://YOUR_IP:3000

3. Grant camera permissions when prompted

4. Test AR overlay
```

### Option C: Android Emulator
```
# Install Android Studio, then:
cd frontend
npm install -g expo-cli
expo start --tunnel
```

### Option D: iOS Simulator
```
# Requires Mac + Xcode
cd frontend
npm install -g expo-cli
expo start --ios
```

---

## File Structure to Know

```
AutoRepair-AR/
├── frontend/
│   ├── src/
│   │   ├── App.js              ← Main app component
│   │   ├── components/
│   │   │   ├── VehicleInput.js ← Year/Make/Model input
│   │   │   ├── DiagnosticInput.js ← Code/Part input
│   │   │   ├── ARViewer.js     ← AR display
│   │   │   └── Instructions.js ← Step-by-step guide
│   │   └── data/
│   │       └── mockData.js     ← Test data
│   └── public/
│       └── models/            ← 3D engine models
│
├── backend/
│   ├── server.js              ← API server
│   ├── routes/
│   │   ├── vehicles.js
│   │   ├── diagnostics.js
│   │   └── repairs.js
│   └── data/
│       └── repairDatabase.json ← Repair guides
```

---

## Common Issues & Fixes

**"npm not found"**
- Install Node.js from nodejs.org

**"Port 3000 already in use"**
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

**"Camera not working"**
- Must use HTTPS (not HTTP) for camera on production
- Desktop testing uses mock camera
- Use real phone for real camera access

**"AR overlay not showing"**
- Check browser console for errors (F12)
- Ensure AR.js loaded correctly
- Try a different browser

---

## Next Steps After Getting It Running

1. ✅ Test vehicle lookup (2015 Honda Civic, 2010 Ford F-150, etc.)
2. ✅ Test diagnostic codes (P0300, P0171, P0401, etc.)
3. ✅ Test part names (alternator, starter, battery, water pump, etc.)
4. ✅ Test AR viewer and step progression
5. ✅ Test on mobile device

---

## Troubleshooting

**Check if ports are available:**
```bash
# Frontend port 3000
# Backend port 5000
```

**Clear node_modules cache:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Check Node version:**
```bash
node --version  # Should be 16 or higher
```

---

**Questions?** Check the issues section or open a new one!
