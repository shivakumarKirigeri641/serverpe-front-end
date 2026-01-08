# ServerPe - Student Project Management Platform

A comprehensive React application for students to browse, subscribe, and purchase academic projects with complete authentication, payment integration, and project management features.

## 🚀 Features

- **Modern UI/UX** - Premium design with Tailwind CSS, gradient backgrounds, and smooth animations
- **Complete Authentication** - OTP-based subscription and login system
- **Project Marketplace** - Browse and purchase academic projects
- **Razorpay Payment Integration** - Secure payment processing with GST calculation
- **Purchase History** - Track and download purchased projects
- **User Profile Management** - Update profile information
- **Responsive Design** - Works perfectly on all devices

## 📋 Prerequisites

- Node.js 14+ installed
- Backend API running on `http://localhost:8888`
- Razorpay account (for payment integration)

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create/update `.env` file in the root directory:
```env
REACT_APP_API_BASE_URL=http://localhost:8888
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
serverpe-front-end/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (Button, Input, Card, Loader)
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.js   # Global authentication state
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── AboutMe.jsx
│   │   ├── ContactMe.jsx
│   │   ├── AuthPage.jsx     # Subscribe/Login
│   │   ├── ProjectsPage.jsx
│   │   └── dashboard/       # Protected dashboard pages
│   ├── services/
│   │   ├── api.js           # Axios instance
│   │   └── authService.js   # Authentication API methods
│   ├── App.js               # Main routing
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── .env
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔑 Key Pages

### Public Pages
- **Landing Page** (`/`) - Hero section, features, and project showcase
- **About** (`/about`) - Company information and values
- **Contact** (`/contact`) - Contact form with category selection
- **Projects** (`/projects`) - Browse all available projects
- **Auth** (`/auth`) - Subscribe and login with OTP verification

### Protected Dashboard Pages
- **Dashboard Home** (`/dashboard`) - Personalized welcome and quick stats
- **Explore Projects** (`/dashboard/explore-projects`) - Browse and filter projects
- **Purchase Details** (`/dashboard/purchase-details/:id`) - Review and agree to terms
- **Summary** (`/dashboard/summary`) - Payment summary with Razorpay integration
- **Payment Success** (`/dashboard/payment-success`) - Order confirmation and downloads
- **Purchase History** (`/dashboard/purchase-history`) - View purchased projects
- **Profile** (`/dashboard/profile`) - Manage user profile

## 🔐 Authentication Flow

### Subscribe
1. Fill in personal details (name, email, mobile, college, state)
2. Request OTP (sent to both email and mobile)
3. Verify OTP for both email and mobile
4. Account created → redirected to login

### Login
1. Enter email or mobile number
2. Request OTP
3. Verify OTP
4. Logged in → redirected to dashboard

## 💳 Payment Integration

The application integrates with Razorpay for secure payment processing:
1. User selects a project and proceeds to purchase
2. Reviews purchase details and disclaimers
3. Views payment summary with GST calculation
4. Clicks "Pay Now" to open Razorpay checkout
5. Completes payment
6. Redirected to success page with download options

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9)
- **Secondary**: Purple gradient (#d946ef)
- **Accent**: Orange gradient (#f97316)

### Typography
- **Display**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)

### Components
- Glass morphism effects
- Gradient backgrounds
- Smooth animations (fade-in, slide-up, scale-in)
- Custom hover effects

## 📡 API Integration

The app connects to backend API at `http://localhost:8888` with the following endpoints:

### Public Endpoints
- `GET /serverpeuser/mystudents/states` - Load states
- `GET /serverpeuser/mystudents/project-list` - Load projects
- `GET /serverpeuser/mystudents/disclaimer-before-buy-list` - Load disclaimers
- `GET /serverpeuser/mystudents/contact-categories` - Load contact categories
- `POST /serverpeuser/mystudents/contact-categories` - Submit contact form
- `POST /serverpeuser/mystudents/subscription/send-otp` - Send subscription OTP
- `POST /serverpeuser/mystudents/subscription/verify-otp` - Verify subscription OTP
- `POST /serverpeuser/mystudents/login/send-otp` - Send login OTP
- `POST /serverpeuser/mystudents/login/verify-otp` - Verify login OTP

### Protected Endpoints (Authenticated)
- `POST /serverpeuser/loggedinstudent/logout` - Logout
- `GET /serverpeuser/loggedinstudent/user-profile` - Get user profile
- `PATCH /serverpeuser/loggedinstudent/user-profile` - Update profile
- `GET /serverpeuser/loggedinstudent/purchase-history` - Get purchase history

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🧪 Testing

Make sure the backend API is running at `http://localhost:8888` before testing:

1. **Landing Page**: Verify states and projects load
2. **Subscribe Flow**: Test OTP sending and verification
3. **Login Flow**: Test with registered email/mobile
4. **Browse Projects**: Check filtering and project details
5. **Purchase Flow**: Test complete flow (requires backend)
6. **Profile Management**: Test profile updates
7. **Logout**: Verify session is cleared

## 📝 Notes

- **College Dropdown**: Currently uses placeholder data. Update when API is available.
- **Payment**: Requires valid Razorpay API keys for production
- **Downloads**: Project and invoice downloads are placeholders awaiting backend implementation

## 🤝 Support

For questions or issues, please contact support@serverpe.in

## 📄 License

Copyright © 2026 ServerPe. All rights reserved.
