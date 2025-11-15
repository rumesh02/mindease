# MindEase - Health & Wellness Mobile App

A React Native mobile application for mental health and wellness, featuring guided breathing exercises, daily wellness tips, and personalized favourites.

## Features

✨ **User Authentication**

- Secure registration and login
- JWT token-based authentication
- Persistent sessions with AsyncStorage

🌟 **Wellness Tips**

- Daily curated wellness tips
- Categories: meditation, nutrition, breathing, exercise, sleep
- Beautiful card-based UI with images
- Detailed view for each tip

🫁 **Breathing Exercises**

- Interactive guided breathing animations
- 5-5-5 breathing pattern (Inhale 5s, Hold 2s, Exhale 5s)
- Real-time visual feedback
- Start/pause/stop controls

❤️ **Favourites System**

- Save tips for later
- Offline access to favourites
- Easy management and removal

👤 **User Profile**

- View account details
- Track statistics
- Settings and preferences
- Logout functionality

## Tech Stack

- **Framework:** React Native (Expo)
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **State Management:** Redux Toolkit
- **Forms:** Formik + Yup validation
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **Icons:** Expo Vector Icons (Feather)

## Project Structure

```
frontend/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js          # User login
│   │   ├── RegisterScreen.js       # User registration
│   │   ├── HomeScreen.js           # Main tips feed
│   │   ├── TipDetailsScreen.js     # Tip details view
│   │   ├── BreathingScreen.js      # Breathing exercise
│   │   ├── FavouritesScreen.js     # Saved favourites
│   │   └── ProfileScreen.js        # User profile
│   ├── navigation/
│   │   └── AppNavigator.js         # Navigation structure
│   ├── store/
│   │   ├── index.js                # Redux store config
│   │   ├── authSlice.js            # Auth state
│   │   └── tipsSlice.js            # Tips & favourites state
│   └── services/
│       └── api.js                  # API service layer
├── App.js                          # Root component
├── app.json                        # Expo configuration
├── package.json
└── babel.config.js
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio (for emulator)
- Expo Go app (for physical device testing)

### Setup Steps

1. Navigate to the frontend directory:

```powershell
cd frontend
```

2. Install dependencies:

```powershell
npm install
```

3. Configure the API endpoint:
   - Open `src/services/api.js`
   - Update `API_BASE_URL` to your backend URL:
     - Local development: `http://localhost:5000/api`
     - Android emulator: `http://10.0.2.2:5000/api`
     - iOS simulator: `http://localhost:5000/api`
     - Physical device: `http://YOUR_COMPUTER_IP:5000/api`

## Running the App

### Start Expo Development Server:

```powershell
npm start
```

This will open Expo DevTools in your browser.

### Run on iOS Simulator:

```powershell
npm run ios
```

### Run on Android Emulator:

```powershell
npm run android
```

### Run on Physical Device:

1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code shown in terminal/browser
3. App will load on your device

## Backend Connection

**Important:** Make sure the backend server is running before using the app.

```powershell
# In a separate terminal, navigate to backend folder
cd backend

# Start the backend server
npm start
```

The backend should be running on `http://localhost:5000`

### Testing with Physical Device

If testing on a physical device, you need to update the API URL:

1. Find your computer's IP address:

```powershell
ipconfig
```

2. Look for "IPv4 Address" (e.g., 192.168.1.100)

3. Update `src/services/api.js`:

```javascript
const API_BASE_URL = "http://192.168.1.100:5000/api";
```

4. Ensure your phone and computer are on the same WiFi network

## App Navigation

### Unauthenticated Users:

- **Login Screen** → Enter credentials
- **Register Screen** → Create new account

### Authenticated Users (Bottom Tabs):

- **Home** → Browse wellness tips
  - Tap any tip to view details
  - Add tips to favourites
- **Breathing** → Guided breathing exercise
- **Favourites** → View saved tips
- **Profile** → Account settings and logout

## Redux State Structure

```javascript
{
  auth: {
    user: { id, username, email },
    token: "jwt_token",
    isAuthenticated: true/false,
    loading: false,
    error: null
  },
  tips: {
    allTips: [...],
    currentTip: {...},
    favourites: [...],
    loading: false,
    error: null
  }
}
```

## Key Features Explained

### Form Validation

- Uses Formik for form management
- Yup for schema validation
- Real-time error messages
- Email format validation
- Password strength requirements

### Persistent Authentication

- JWT tokens stored in AsyncStorage
- Auto-login on app restart
- Secure token-based API requests

### Offline Favourites

- Favourites cached locally
- Works without internet
- Syncs with backend when online

### Breathing Animation

- Smooth scale and opacity animations
- Timed phases (inhale/hold/exhale)
- Visual feedback with color changes
- Auto-cycle mode

## Styling

The app uses a consistent design system:

- **Primary Color:** `#6366f1` (Indigo)
- **Success Color:** `#10b981` (Green)
- **Error Color:** `#ef4444` (Red)
- **Background:** `#f8f9fa` (Light gray)
- **Text:** `#333` (Dark gray)

## Troubleshooting

### Cannot connect to backend

- Verify backend is running on port 5000
- Check API_BASE_URL in `src/services/api.js`
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use your computer's IP address

### App crashes on start

- Clear Expo cache: `expo start -c`
- Delete `node_modules` and reinstall:
  ```powershell
  Remove-Item -Recurse -Force node_modules; npm install
  ```

### Redux errors

- Check that Redux store is properly configured
- Verify all slices are imported in `store/index.js`

### Navigation issues

- Ensure React Navigation dependencies are installed
- Check that all screens are properly registered

## Development Tips

1. **Hot Reload:** Shake device or press `R` in terminal to reload
2. **Debug Menu:** Shake device or press `Ctrl+M` (Android) / `Cmd+D` (iOS)
3. **Console Logs:** View in terminal where `npm start` is running
4. **Redux DevTools:** Use Flipper or React Native Debugger

## Building for Production

### Android APK:

```powershell
expo build:android
```

### iOS IPA:

```powershell
expo build:ios
```

Note: You'll need an Expo account and Apple Developer account (for iOS).

## Future Enhancements

- [ ] Dark mode theme
- [ ] Push notifications for daily tips
- [ ] Progress tracking and streaks
- [ ] Achievement badges
- [ ] Social sharing
- [ ] More breathing patterns
- [ ] Custom tip creation
- [ ] Meditation timer
- [ ] Journal feature

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT

## Support

For issues or questions:

- Create an issue on GitHub
- Check the documentation
- Review existing issues

---

**Happy Wellness Journey! 🌟**
