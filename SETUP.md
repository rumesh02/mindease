# MindEase - Setup Guide

Complete step-by-step guide to get MindEase running on your machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)

   - Download from: https://nodejs.org/
   - Verify installation:
     ```powershell
     node --version
     npm --version
     ```

2. **Git** (optional, for version control)

   - Download from: https://git-scm.com/

3. **Code Editor**
   - VS Code (recommended): https://code.visualstudio.com/

### For Mobile Development

4. **Expo CLI** (will be installed with frontend dependencies)

   - Or install globally:
     ```powershell
     npm install -g expo-cli
     ```

5. **Mobile Testing Options** (choose one or more):

   **Option A: Physical Device**

   - Install "Expo Go" app from App Store (iOS) or Play Store (Android)
   - Ensure phone and computer are on the same WiFi network

   **Option B: iOS Simulator** (Mac only)

   - Install Xcode from Mac App Store
   - Open Xcode → Preferences → Components → Install iOS Simulator

   **Option C: Android Emulator**

   - Install Android Studio: https://developer.android.com/studio
   - Set up Android Virtual Device (AVD) through Android Studio

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```powershell
cd e:\Projects\mindease\backend
```

### Step 2: Install Dependencies

```powershell
npm install
```

This will install:

- express
- cors
- jsonwebtoken
- bcryptjs
- dotenv
- nodemon (dev dependency)

### Step 3: Verify Environment Configuration

Check that `.env` file exists in the `backend` folder with:

```env
PORT=5000
JWT_SECRET=mindease_super_secret_key_change_in_production
NODE_ENV=development
```

### Step 4: Test Backend

Start the server:

```powershell
npm start
```

You should see:

```
🚀 MindEase API Server running on port 5000
📍 http://localhost:5000
```

### Step 5: Verify API is Working

Open a browser and visit: http://localhost:5000

You should see a JSON response with API information.

**Keep this terminal running!** Open a new terminal for the frontend.

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal** window:

```powershell
cd e:\Projects\mindease\frontend
```

### Step 2: Install Dependencies

```powershell
npm install
```

This will install:

- expo
- react-native
- react-navigation
- redux-toolkit
- axios
- formik & yup
- and all other dependencies

**Note:** This may take a few minutes.

### Step 3: Configure API Connection

Open `frontend/src/services/api.js` in your code editor.

**For localhost testing (default):**

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

**For Android Emulator:**

```javascript
const API_BASE_URL = "http://10.0.2.2:5000/api";
```

**For Physical Device:**

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
2. Look for "IPv4 Address" (e.g., 192.168.1.100)
3. Update the URL:
   ```javascript
   const API_BASE_URL = "http://192.168.1.100:5000/api";
   ```

---

## Running the Application

### Step 1: Ensure Backend is Running

In the backend terminal, you should see the server running on port 5000.

If not, start it:

```powershell
cd backend
npm start
```

### Step 2: Start the Frontend

In the frontend terminal:

```powershell
cd frontend
npm start
```

This will:

1. Start the Metro bundler
2. Open Expo DevTools in your browser
3. Show a QR code in the terminal

### Step 3: Launch the App

Choose one option:

**Option A: iOS Simulator** (Mac only)

```powershell
# Press 'i' in the terminal
# Or in Expo DevTools, click "Run on iOS simulator"
```

**Option B: Android Emulator**

```powershell
# Make sure Android emulator is running
# Press 'a' in the terminal
# Or in Expo DevTools, click "Run on Android device/emulator"
```

**Option C: Physical Device**

1. Open "Expo Go" app on your phone
2. Scan the QR code shown in terminal or browser
3. Wait for the app to load

---

## Testing

### 1. Test User Registration

1. App should open to Login screen
2. Click "Register" link
3. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Register" button
5. You should be logged in and see the Home screen

### 2. Test Wellness Tips

1. Home screen should show wellness tips
2. Scroll through the list
3. Tap on any tip to view details
4. Click the heart icon to add to favourites

### 3. Test Breathing Exercise

1. Tap "Breathing" tab at bottom
2. Click "Start" button
3. Watch the breathing animation
4. Follow the inhale/exhale instructions
5. Click "Pause" or "Stop" to control

### 4. Test Favourites

1. Tap "Favourites" tab
2. You should see the tip you favourited
3. Tap the X to remove from favourites

### 5. Test Profile

1. Tap "Profile" tab
2. View your user information
3. Check the statistics
4. Tap "Logout" to test logout functionality

---

## Troubleshooting

### Backend Issues

**Problem: Port 5000 already in use**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

- Change PORT in `.env` file to a different port (e.g., 5001)
- Update API_BASE_URL in frontend accordingly

**Problem: Module not found errors**

```
Error: Cannot find module 'express'
```

**Solution:**

```powershell
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

---

### Frontend Issues

**Problem: Cannot connect to backend**

```
Network Error
```

**Solutions:**

1. Verify backend is running
2. Check API_BASE_URL in `src/services/api.js`
3. For Android emulator, use `10.0.2.2` instead of `localhost`
4. For physical device, use your computer's IP address
5. Ensure phone and computer are on same WiFi network

**Problem: Expo app crashes on start**

```
Error: Unable to resolve module...
```

**Solution:**

```powershell
cd frontend
expo start -c  # Clear cache
```

**Problem: Dependencies installation fails**
**Solution:**

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install
```

**Problem: "Expo Go" shows "Could not connect to Metro"**
**Solution:**

- Ensure `npm start` is running in frontend folder
- Try restarting the Expo development server
- Check firewall settings

---

### Common Development Issues

**Problem: Changes not reflecting in app**
**Solution:**

- Press `r` in terminal to reload
- Or shake device and tap "Reload"

**Problem: Login/Register not working**
**Solution:**

1. Check browser console/terminal for errors
2. Verify backend is running
3. Check API_BASE_URL is correct
4. Test API directly: `http://localhost:5000/api/tips`

**Problem: Favourites not persisting**
**Solution:**

- Clear AsyncStorage: In app, go to Profile → Logout
- AsyncStorage is device-specific, won't transfer between devices

---

## Development Tips

### Useful Commands

**Backend:**

```powershell
npm start          # Start server
npm run dev        # Start with nodemon (auto-restart)
```

**Frontend:**

```powershell
npm start          # Start Expo dev server
npm run android    # Start on Android
npm run ios        # Start on iOS
expo start -c      # Clear cache and start
```

### Keyboard Shortcuts

**Expo DevTools:**

- `r` - Reload app
- `m` - Toggle menu
- `d` - Open developer menu
- `i` - Open iOS simulator
- `a` - Open Android emulator
- `w` - Open in web browser

**React Native Debugger:**

- Shake device or `Cmd+D` (iOS) / `Ctrl+M` (Android)
- Enable "Debug JS Remotely"

### Hot Reloading

Expo has Fast Refresh enabled by default. Just save your files and changes will appear automatically.

---

## Next Steps

### For Development

1. **Add more wellness tips** - Edit `backend/data/tips.json`
2. **Customize styling** - Modify colors in screen files
3. **Add features** - See Future Enhancements in main README
4. **Create components** - Add reusable components in `frontend/src/components`

### For Production

1. **Change JWT Secret** - Update `.env` with a secure key
2. **Set up database** - Migrate from JSON files to MongoDB/PostgreSQL
3. **Add error tracking** - Integrate Sentry or similar
4. **Build app** - Use `expo build:android` or `expo build:ios`
5. **Deploy backend** - Deploy to Heroku, DigitalOcean, AWS, etc.

---

## Getting Help

1. **Check logs** - Look at terminal output for errors
2. **Read documentation** - Check README files
3. **Search issues** - Look for similar problems online
4. **Console debugging** - Add `console.log()` to track issues
5. **React Native Debugger** - Use for step-by-step debugging

---

## Success Checklist

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend Expo server running
- [ ] App loads on device/simulator
- [ ] Can register new user
- [ ] Can login
- [ ] Tips display on Home screen
- [ ] Breathing exercise works
- [ ] Can add/remove favourites
- [ ] Profile shows user info
- [ ] Can logout

---

**Congratulations! Your MindEase app should now be running! 🎉**

If you encounter any issues not covered here, check the main README or create an issue.

Happy developing! 🚀
