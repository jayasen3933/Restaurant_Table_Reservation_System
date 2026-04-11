# 🍽️ La Maison - Restaurant Table Reservation System

A full-stack **MERN** (MongoDB, Express.js, React, Node.js) restaurant table reservation system with real-time availability checking, automated booking management, user-specific reservation tracking, and comprehensive admin controls.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [License](#license)

---

## 🎯 Overview

**La Maison** is a modern, full-featured restaurant table reservation platform designed for both customers and restaurant administrators. The system provides:

- **For Customers**: 
  - Seamless table booking with real-time availability
  - Personal reservation dashboard showing booking history
  - Automatic redirection to "My Reservations" after booking
  - Clear display of table number, date, and time for each reservation

- **For Admins**: 
  - Comprehensive reservation management
  - Table and user management
  - Analytics and insights dashboard
  - Database cleanup utilities

All pages are protected with JWT-based authentication and role-based access control (Customer/Admin).

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure password hashing (bcrypt)
- **Protected routes** - Unauthenticated users redirected to login
- **Role-based access control** (Customer / Admin)
- **Forgot Password flow** - Token-based password reset with 15-minute expiry
- **Persistent sessions** with automatic token refresh

### 👤 Customer Features
- **Automated Table Availability** - Dynamic availability based on existing reservations
- **Real-time Availability Check** - See available (green) and reserved (red) tables
- **Seamless Booking Flow** - Select table, fill contact details, confirm reservation
- **Automatic Redirection** - After successful booking, automatically redirected to "My Reservations" page
- **Personal Dashboard** with user-specific booking history:
  - **Current/Upcoming Bookings** - Active and future reservations
  - **Past Bookings** - Completed, cancelled, and historical reservations
  - Displays: Table Number, Date, Time, Number of Guests, Status
- **User-Specific Data** - Backend fetches reservations using authenticated user's ID
- **Quick Reservation Access** - "Make a Reservation" button in dashboard header

### 🔧 Admin Features
- **Reservation Dashboard** - Summary cards and detailed reservation table
- **Optimized Column Order** - Date, Time, Customer Contact, Table, Guests, Status
- **Reservation Management** - Update status (Pending, Confirmed, Seated, Completed, Cancelled)
- **Table Management** - Add/remove tables (availability automated based on bookings)
- **User Management** - Promote/demote roles, manage user accounts
- **Analytics Dashboard** - Statistics, occupancy rates, performance metrics
- **Full Page Scrolling** - All admin pages fully scrollable to view all data
- **Database Cleanup** - Utility to manage old reservations

### 🎨 UI/UX Features
- **Full Page Scrolling** - All pages use `min-h-screen` with natural scrolling
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Premium Restaurant Theme** - Warm amber, stone, and earth tones
- **Frosted Glass Effects** - Modern card components with backdrop blur
- **Google Fonts** - Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Lucide React Icons** - Consistent iconography throughout

### 🚫 Automated Booking Protection
- **Strict Concurrency Control** - Prevents double-booking at database level
- **Real-time Validation** - Checks for existing reservations before confirming
- **User-friendly Error Messages** - "Book at another time, already another customer booked"
- **Maximum Capacity Limits** - 4 reservations per time slot

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.x | UI framework with hooks and context |
| **Vite** | 8.x | Build tool and dev server |
| **React Router** | 7.x | Client-side routing and navigation |
| **Tailwind CSS** | 3.x | Utility-first styling with custom theme |
| **Axios** | Latest | HTTP client with interceptors |
| **Lucide React** | Latest | Icon library |
| **Google Fonts** | - | Playfair Display & Inter typography |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 5.x | Web application framework |
| **MongoDB** | 6+ | NoSQL database |
| **Mongoose** | 9.x | MongoDB ODM with schema validation |
| **JSON Web Tokens** | Latest | Stateless authentication |
| **bcryptjs** | Latest | Password hashing |
| **dotenv** | Latest | Environment variable management |
| **nodemon** | Latest | Development auto-restart |
| **crypto** | Built-in | Password reset token generation |

---

## 📁 Project Structure

```
Restaurant_Table_Reservation_System/
│
├── backend/                          # Node.js/Express backend
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── authController.js         # Authentication (register, login, forgot/reset password)
│   │   ├── reservationController.js  # Reservation CRUD, availability, double-booking prevention
│   │   ├── tableController.js        # Table management (add, delete)
│   │   └── userController.js         # User management, statistics, database cleanup
│   │
│   ├── middleware/
│   │   └── auth.js                   # JWT verification, role authorization
│   │
│   ├── models/
│   │   ├── User.js                   # User schema (name, email, password, role, reset tokens)
│   │   ├── Table.js                  # Table schema (tableNumber, capacity)
│   │   └── Reservation.js            # Reservation schema (customer details, date, time, tableId, userId, status)
│   │
│   ├── routes/
│   │   ├── authRoutes.js             # Authentication endpoints
│   │   ├── reservationRoutes.js      # Reservation endpoints
│   │   ├── tableRoutes.js            # Table management endpoints
│   │   └── userRoutes.js             # User management endpoints
│   │
│   ├── .env                          # Environment variables (PORT, MONGO_URI, JWT_SECRET)
│   ├── server.js                     # Express app entry point
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # React/Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js              # Axios instance with base URL and interceptors
│   │   │   ├── authService.js        # Authentication API calls
│   │   │   ├── reservationService.js # Reservation API calls (includes userId filtering)
│   │   │   ├── tableService.js       # Table management API calls
│   │   │   └── userService.js        # User management API calls
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Global navigation with role-based links
│   │   │   └── ProtectedRoute.jsx    # Route guard component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Global auth state management
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page with reservation search
│   │   │   ├── Booking.jsx           # Table selection, booking confirmation, auto-redirect
│   │   │   ├── Login.jsx             # User login with sign-up link
│   │   │   ├── Register.jsx          # User registration
│   │   │   ├── ForgotPassword.jsx    # Password reset request
│   │   │   ├── ResetPassword.jsx     # New password form (token-based)
│   │   │   ├── CustomerDashboard.jsx # Customer reservation history (userId-based)
│   │   │   ├── AdminDashboard.jsx    # Admin reservation management
│   │   │   ├── AdminSettings.jsx     # Table & user management with full scrolling
│   │   │   └── AdminAnalytics.jsx    # Statistics and insights
│   │   │
│   │   ├── App.jsx                   # Route definitions and layout (min-h-screen)
│   │   ├── main.jsx                  # React DOM entry point
│   │   └── index.css                 # Tailwind directives and custom styles
│   │
│   ├── index.html                    # HTML shell with Google Fonts
│   ├── tailwind.config.js            # Custom theme configuration
│   ├── vite.config.js                # Vite build configuration
│   └── package.json                  # Frontend dependencies
│
└── README.md                         # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Restaurant_Table_Reservation_System.git
cd Restaurant_Table_Reservation_System
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_reservation
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

**Note:** Replace `MONGO_URI` with your MongoDB connection string (local or Atlas). Change `JWT_SECRET` to a secure random string in production.

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## 🏃 Running the Application

### Start the Backend Server

From the `backend/` directory:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`.

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: <your-connection-string>
```

### Start the Frontend Development Server

From the `frontend/` directory (in a separate terminal):

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

**Expected Output:**
```
VITE v8.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You will be redirected to the Login page. Create an account or use existing credentials.

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive JWT | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes |
| `POST` | `/api/auth/forgot-password` | Request password reset token | No |
| `POST` | `/api/auth/reset-password` | Reset password with token | No |

### Tables
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/tables` | Get all tables | No |
| `POST` | `/api/tables` | Create a new table | Admin |
| `DELETE` | `/api/tables/:id` | Delete a table | Admin |

### Reservations
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/reservations/check-availability` | Check table availability for date/time | No |
| `POST` | `/api/reservations` | Create a new reservation (includes userId) | Yes |
| `GET` | `/api/reservations` | Get reservations (supports userId, email, date, status filters) | Yes |
| `GET` | `/api/reservations/:id` | Get reservation by ID | Yes |
| `PUT` | `/api/reservations/:id/status` | Update reservation status | Admin |
| `DELETE` | `/api/reservations/:id` | Delete a reservation | Admin |

**Important:** The `GET /api/reservations` endpoint accepts a `userId` query parameter to fetch reservations for a specific user.

### Users (Admin Only)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users` | Get all users | Admin |
| `GET` | `/api/users/stats` | Get user statistics | Admin |
| `GET` | `/api/users/:id` | Get user by ID | Admin |
| `PUT` | `/api/users/:id` | Update user role | Admin |
| `DELETE` | `/api/users/:id` | Delete a user | Admin |
| `POST` | `/api/users/cleanup` | Cleanup old reservations | Admin |

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  role: String (enum: ['customer', 'admin'], default: 'customer'),
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  timestamps: true
}
```

### Table Model
```javascript
{
  tableNumber: Number (required, unique),
  capacity: Number (required, min: 1),
  timestamps: true
}
```

### Reservation Model
```javascript
{
  customerName: String (required),
  email: String (required, validated),
  phone: String (required),
  date: Date (required),
  time: String (required),
  partySize: Number (required, min: 1),
  tableId: ObjectId (ref: 'Table', required),
  userId: ObjectId (ref: 'User'),  // Links reservation to user
  status: String (enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled'], default: 'pending'),
  timestamps: true
}
```

**Key Feature:** The `userId` field in the Reservation model links each reservation to a specific user, enabling user-specific booking history.

---

## 📖 Usage Guide

### Creating an Account
1. Navigate to `http://localhost:5173` - you'll be redirected to the **Login** page
2. Click **"Don't have an account? Sign up"** at the bottom
3. Fill in your name, email, and password
4. Click **Create Account** - you'll be redirected to Login

### Logging In
1. Enter your registered email and password
2. Click **Sign In**
3. You'll be directed to the Home page (customers) or Admin Dashboard (admins)

### Making a Reservation (Customer)
1. On the **Home** page, select:
   - Date (future dates only)
   - Time (available time slots)
   - Party size (number of guests)
2. Click **Find Available Tables**
3. Browse available tables (green) and reserved tables (red)
4. Click on an available table
5. Fill in your contact details (name, email, phone)
6. Click **Confirm Reservation**
7. **Automatic Redirection**: After 2 seconds, you'll be redirected to "My Reservations"

### Viewing Your Reservations (Customer)
1. After booking, you'll be automatically redirected to **My Reservations**
2. Or click **My Reservations** in the navigation bar anytime
3. View two sections:
   - **Current/Upcoming Bookings** - Active and future reservations
   - **Past Bookings** - Completed, cancelled, and historical bookings
4. Each reservation shows:
   - **Table Number** - Which table you booked
   - **Date** - Exact date of reservation
   - **Time** - Exact time of reservation
   - **Guests** - Number of people
   - **Status** - Current reservation status
5. Click **Make a Reservation** to book a new table
6. Click **Refresh** to update your reservation list

**Important:** The system fetches ONLY your reservations using your authenticated user ID. You will never see reservations made by other customers.

### Managing Reservations (Admin)
1. Log in with admin credentials
2. Navigate to **Dashboard** from the navbar
3. View summary cards showing reservation statistics
4. Scroll through the full reservations table to see all bookings
5. Update reservation status using the dropdown
6. Delete reservations using the trash icon
7. Filter by date using the date picker

### Managing Tables & Users (Admin)
1. Navigate to **Settings** from the navbar
2. **Tables Tab**:
   - Click **Add Table** to create new tables
   - Scroll through the full table list
   - Delete tables using the trash icon
3. **Users Tab**:
   - Scroll through the full user list
   - Update user roles (Customer ↔ Admin)
   - Delete users using the trash icon

### Viewing Analytics (Admin)
1. Navigate to **Analytics** from the navbar
2. View overview cards and statistics
3. Scroll to see all data and charts

---

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Minimum 6 characters required

2. **JWT Authentication**
   - Secure token generation
   - Automatic token expiration

3. **Route Protection**
   - Frontend route guards
   - Backend middleware authorization
   - Role-based access control

4. **Input Validation**
   - Email format validation
   - Phone number validation
   - Date/time validation

5. **Double-Booking Prevention**
   - Database-level concurrency checks
   - Atomic reservation creation
   - Real-time availability validation

6. **User-Specific Data**
   - Backend queries filter by authenticated userId
   - Customers only see their own reservations
   - Admins see all reservations

---

## 🧪 Creating an Admin User

Register an admin account via API:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@restaurant.com",
  "password": "admin123",
  "role": "admin"
}
```

Or promote an existing user from the **Admin Settings > Users** tab.

---

## 🎨 Design Philosophy

### Color Palette
- **Primary**: Amber (#d97706) - Warm, inviting accent
- **Background**: Stone (#f5f5f4) - Neutral, elegant base
- **Text**: Stone-800 (#292524) - High contrast for readability

### Typography
- **Headings**: Playfair Display (serif) - Elegant, classic
- **Body**: Inter (sans-serif) - Modern, readable

### Layout
- **Full Page Scrolling**: All pages use `min-h-screen` for natural scrolling
- **No Overflow Hidden**: Content is never cut off
- **Responsive**: Works on all screen sizes

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **MongoDB** - Database platform
- **Express.js** - Web framework
- **React** - UI library
- **Node.js** - Runtime environment
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Google Fonts** - Typography

---

## 📧 Contact

For questions or support, please contact:
- **Email**: support@lamaison-restaurant.com
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

**Built with ❤️ using the MERN Stack**
