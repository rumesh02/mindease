# MindEase - Health & Wellness App

A complete full-stack mobile application for mental health and wellness, featuring guided breathing exercises, daily wellness tips, and personalized favourites.

## 📱 Project Overview

MindEase is a React Native mobile app with a Node.js backend API that helps users improve their mental health through:

- Daily wellness tips across multiple categories
- Interactive guided breathing exercises
- Personalized favourite tips
- User authentication and profiles
- Clean, intuitive UI with Feather icons

## 🏗️ Project Structure

```
mindease/
├── backend/                    # Node.js + Express API
│   ├── controllers/           # Business logic
│   ├── routes/               # API endpoints
│   ├── data/                 # JSON data storage
│   ├── app.js               # Express configuration
│   ├── server.js            # Server entry point
│   └── package.json
│
└── frontend/                  # React Native (Expo) app
    ├── src/
    │   ├── screens/          # App screens
    │   ├── navigation/       # Navigation setup
    │   ├── store/           # Redux state management
    │   └── services/        # API integration
    ├── App.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (for mobile app)
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository** (if using git):

```powershell
git clone <your-repo-url>
cd mindease
```

2. **Install Backend Dependencies:**

```powershell
cd backend
npm install
```

3. **Install Frontend Dependencies:**

```powershell
cd ../frontend
npm install
```

### Running the Application

**Step 1: Start the Backend Server**

Open a terminal in the `backend` folder:

```powershell
cd backend
npm start
```

The API will run on `http://localhost:5000`

**Step 2: Start the Frontend App**

Open a **new terminal** in the `frontend` folder:

```powershell
cd frontend
npm start
```

This will open Expo DevTools. Choose your preferred platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## 📚 Detailed Documentation

For detailed setup, API documentation, and development guides:

- **Backend Documentation:** See [`backend/README.md`](./backend/README.md)
- **Frontend Documentation:** See [`frontend/README.md`](./frontend/README.md)

## 🎯 Features

### User Authentication

- Secure registration with email validation
- JWT-based login
- Persistent sessions

### Wellness Tips

- 8 pre-loaded wellness tips
- Categories: meditation, breathing, nutrition, exercise, sleep, relaxation
- Beautiful card-based UI with images
- Detailed view with full content

### Breathing Exercise

- Interactive animated breathing guide
- 5-second inhale / 2-second hold / 5-second exhale
- Start/pause/stop controls
- Visual feedback with smooth animations

### Favourites System

- Save tips for quick access
- Offline storage with AsyncStorage
- Easy management and removal
- Syncs with backend

### User Profile

- View account information
- Statistics dashboard
- Settings and preferences
- Secure logout

## 🛠️ Tech Stack

### Frontend

- React Native (Expo)
- Redux Toolkit (State Management)
- React Navigation (Navigation)
- Formik + Yup (Form Validation)
- Axios (HTTP Client)
- AsyncStorage (Local Storage)
- Expo Vector Icons

### Backend

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcryptjs (Password Hashing)
- CORS
- File-based JSON storage

## 🎨 Design System

- **Primary Color:** `#6366f1` (Indigo)
- **Success:** `#10b981` (Green)
- **Error:** `#ef4444` (Red)
- **Background:** `#f8f9fa`
- **Icons:** Feather Icons throughout

## 📱 Screenshots & Features

### Authentication Flow

- Clean login/register screens
- Form validation with error messages
- Auto-login on app restart

### Home Screen

- Scrollable wellness tips cards
- Pull-to-refresh functionality
- Category badges and difficulty levels

### Breathing Screen

- Full-screen breathing animation
- Visual expanding/contracting circle
- Phase indicators (Inhale/Hold/Exhale)
- Benefits information

### Favourites

- Grid of saved tips
- Quick remove functionality
- Empty state with CTA

### Profile

- User stats (favourites, completed, streak)
- Settings menu items
- Logout option

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env`:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend Configuration

Edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:5000/api"; // Change for your environment
```

**For Android Emulator:** Use `http://10.0.2.2:5000/api`  
**For Physical Device:** Use `http://YOUR_COMPUTER_IP:5000/api`

## 🐛 Troubleshooting

### Backend won't start

- Check if port 5000 is already in use
- Verify all dependencies are installed: `npm install`
- Check for syntax errors in code

### Frontend won't connect to backend

- Ensure backend is running on port 5000
- Check `API_BASE_URL` in `frontend/src/services/api.js`
- For physical device, use your computer's local IP
- Ensure phone and computer are on same WiFi network

### App crashes

- Clear Expo cache: `expo start -c`
- Reinstall node_modules:
  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  ```

### Authentication issues

- Clear AsyncStorage data
- Check JWT token generation in backend
- Verify password hashing is working

## 📖 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tips

- `GET /api/tips` - Get all tips
- `GET /api/tips/:id` - Get single tip
- `GET /api/tips/daily/random` - Get random tip

### Favourites

- `GET /api/favourites?userId=123` - Get user favourites
- `POST /api/favourites` - Add to favourites
- `DELETE /api/favourites/:id?userId=123` - Remove favourite

## 🚦 Development Workflow

1. **Start Backend:** `cd backend && npm start`
2. **Start Frontend:** `cd frontend && npm start`
3. **Make Changes:** Edit code in your preferred editor
4. **Test:** Use Expo DevTools and test on device/simulator
5. **Debug:** Check terminal logs and React Native debugger

## 📦 Building for Production

### Android

```powershell
cd frontend
expo build:android
```

### iOS

```powershell
cd frontend
expo build:ios
```

Note: Requires Expo account and Apple Developer account (iOS).

## 🎯 Future Enhancements

- [ ] Dark mode support
- [ ] Push notifications for daily reminders
- [ ] Progress tracking with charts
- [ ] Achievement system and badges
- [ ] Social features (share tips)
- [ ] Multiple breathing patterns
- [ ] Meditation timer with sounds
- [ ] Journal/notes feature
- [ ] Database migration (MongoDB/PostgreSQL)
- [ ] Cloud storage for user data

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or building your own app.

## 🙏 Acknowledgments

- Wellness tips content inspired by health and mindfulness research
- Images from Unsplash
- Icons by Feather Icons
- Built with React Native and Expo

## 📧 Support

For questions or issues:

- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---

**Made with ❤️ for Mental Health and Wellness**

Happy coding and wellness journey! 🌟
