# La Maison - Restaurant Table Reservation System

A full-stack **MERN** application for reserving restaurant tables online, checking real-time availability, and managing reservations through a comprehensive admin dashboard. Styled with a warm, premium restaurant theme featuring amber and stone tones, serif typography, and frosted-glass UI elements.

---

## Project Overview

La Maison is an end-to-end table reservation platform designed for both customers and restaurant administrators:

- **Customers** create an account, log in, search for available tables by date/time/party size, confirm bookings with contact details, and view their personal reservation history in a dedicated dashboard.
- **Admins** manage reservations (approve, seat, complete, or cancel), add or remove tables, manage users and roles, and review analytics from a dedicated dashboard.

All pages are protected behind authentication — users **must** log in before accessing any part of the application.

---

## Features

### Authentication & Security
- JWT-based authentication with secure password hashing (bcrypt)
- **Protected routes** — unauthenticated visitors are redirected to the Login page
- Separate registration and login flow — new users are redirected to Login after sign-up and must manually authenticate before accessing the app
- Role-based access control (Customer / Admin)
- Persistent error messages on login failure (visible until the user types again or retries)
- **Forgot Password** flow — token-based password reset with email lookup, time-limited reset tokens (15 min), and redirect back to Login with a success notification

### Customer Features
- Search available tables by date, time, and party size
- Real-time table availability checking with visual indicators (green = available, red = reserved)
- Select a table and confirm the reservation with contact details
- **Automatic redirection to "My Reservations"** dashboard after successful booking (2-second delay)
- **Personal Dashboard** showing user-specific reservation history:
  - **Current/Upcoming Bookings** — Active and future reservations
  - **Past Bookings** — Completed, cancelled, and historical reservations
  - Displays: Table Number, Date, Time, Number of Guests, Status
- **User-specific data** — Backend queries filter by authenticated user's ID (customers only see their own reservations)
- Quick access to make new reservations from dashboard header
- Full page scrolling enabled on all pages

### Admin Features
- **Dashboard** — View, filter (by date), and manage all reservations with status updates (Pending, Confirmed, Seated, Completed, Cancelled)
- **Optimized column order** — Date, Time, Customer Contact, Table, Guests, Status for better workflow
- **Settings** — Add/remove tables, manage users, and promote or demote user roles
- **Analytics** — Overview cards (total reservations, today's bookings, total users, total tables), reservation status breakdown, and quick insight metrics (occupancy, completion, and cancellation rates)
- **Full page scrolling** — All admin pages fully scrollable to view complete data sets
- Database cleanup utility

### Automated Booking Protection
- **Strict concurrency control** — Prevents double-booking at database level
- **Real-time validation** — Checks for existing reservations before confirming
- **User-friendly error messages** — "Book at another time, already another customer booked"
- **Maximum capacity limits** — 4 reservations per time slot

### UI / UX
- Warm restaurant theme with amber, stone, and earth tones
- Playfair Display (serif) headings and Inter (sans-serif) body text via Google Fonts
- Frosted-glass card components with subtle backdrop blur
- **Full page scrolling** — All pages use `min-h-screen` with natural scrolling (no content cut off)
- Responsive layout across desktop and mobile
- Lucide React icons throughout the interface

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool and dev server |
| **React Router 7** | Client-side routing and protected routes |
| **Tailwind CSS 3** | Utility-first styling with custom theme |
| **Axios** | HTTP client with request/response interceptors |
| **Lucide React** | Icon library |
| **Google Fonts** | Playfair Display & Inter typography |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web server framework |
| **MongoDB** | NoSQL database |
| **Mongoose 9** | ODM for MongoDB |
| **JSON Web Tokens** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variable management |
| **nodemon** | Development auto-restart |

---

## Folder Structure

```
Restaurant_Table_Reservation_System/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, forgot/reset password
│   │   ├── reservationController.js # Reservation CRUD, availability, userId filtering
│   │   ├── tableController.js     # Table management
│   │   └── userController.js      # User CRUD, stats, DB cleanup
│   ├── middleware/
│   │   └── auth.js                # JWT verify, role authorization
│   ├── models/
│   │   ├── User.js                # User schema with role and reset tokens
│   │   ├── Table.js               # Table schema (tableNumber, capacity)
│   │   └── Reservation.js         # Reservation schema with userId field
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── reservationRoutes.js   # Updated: allows customers to fetch their own reservations
│   │   ├── tableRoutes.js
│   │   └── userRoutes.js
│   ├── .env                       # Environment variables
│   ├── server.js                  # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js           # Axios instance with interceptors
│   │   │   ├── authService.js     # Login, register, logout, forgot/reset password
│   │   │   ├── reservationService.js # Includes userId filtering support
│   │   │   ├── tableService.js
│   │   │   └── userService.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Global navigation bar with "Sign Up" button
│   │   │   └── ProtectedRoute.jsx # Auth guard for routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state provider
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Hero + reservation search form (min-h-screen)
│   │   │   ├── Booking.jsx        # Table selection, booking, auto-redirect to dashboard
│   │   │   ├── Login.jsx          # User login with sign-up link
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── ForgotPassword.jsx # Email submission for password reset
│   │   │   ├── ResetPassword.jsx  # New password form (token-based)
│   │   │   ├── CustomerDashboard.jsx # User-specific reservation history
│   │   │   ├── AdminDashboard.jsx # Reservation management (full scrolling)
│   │   │   ├── AdminSettings.jsx  # Table & user management (full scrolling)
│   │   │   └── AdminAnalytics.jsx # Stats & insights
│   │   ├── App.jsx                # Route definitions (min-h-screen layout)
│   │   ├── main.jsx               # React DOM entry point
│   │   └── index.css              # Tailwind directives & custom utilities
│   ├── index.html                 # HTML shell with Google Fonts
│   ├── tailwind.config.js         # Custom theme (colors, fonts)
│   └── package.json
│
└── README.md
```

---

## Installation & Setup

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **npm**

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Restaurant_Table_Reservation_System.git
cd Restaurant_Table_Reservation_System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_reservation
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

Start the server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Usage

### Creating an Account
1. Open `http://localhost:5173` — you will be redirected to the **Login** page.
2. Click **Sign up** (top-right navbar button) or the **"Don't have an account? Sign up"** link at the bottom of the login form to navigate to the registration page.
3. Fill in your name, email, and password, then click **Create Account**.
4. You will be redirected back to the **Login** page.

### Logging In
1. Enter the email and password you registered with.
2. Click **Sign In** to access the application.
3. If credentials are invalid, the error message remains visible until you start typing or submit again.

### Resetting Your Password
1. On the Login page, click **Forgot Password?** below the password field.
2. Enter your registered email address and click **Send Reset Instructions**.
3. On the success screen, click **Reset Password Now**.
4. Enter and confirm your new password, then click **Reset Password**.
5. You will be redirected to the Login page with a green success notification.

### Booking a Table
1. On the **Home** page, select a date, time, and party size, then click **Find Available Tables**.
2. Browse the available tables (green = available, red = reserved) and select one.
3. Fill in your contact details (name, email, phone) and click **Confirm Reservation**.
4. A confirmation screen will display your booking summary.
5. **After 2 seconds**, you will be **automatically redirected** to your **"My Reservations"** dashboard.

### Viewing Your Reservations
1. After booking, you'll be automatically redirected to **My Reservations** (Customer Dashboard).
2. Or click **My Reservations** in the navigation bar anytime.
3. View two sections:
   - **Current/Upcoming Bookings** — Active and future reservations
   - **Past Bookings** — Completed, cancelled, and historical bookings
4. Each reservation shows:
   - **Table Number** — Which table you booked
   - **Date** — Exact date of reservation
   - **Time** — Exact time of reservation
   - **Guests** — Number of people
   - **Status** — Current reservation status (Pending, Confirmed, Seated, Completed, Cancelled)
5. Click **Make a Reservation** to book a new table.
6. Click **Refresh** to update your reservation list.

**Important:** The system fetches ONLY your reservations using your authenticated user ID. You will never see reservations made by other customers.

### Admin Access
1. Register an admin user via the API (see below) or promote an existing user from the Admin Settings panel.
2. Log in with admin credentials — you will be directed to the **Admin Dashboard**.
3. From the dashboard, navigate to **Settings** (manage tables and users) or **Analytics** (view performance metrics).
4. All admin pages support **full scrolling** to view complete data sets.

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Log in and receive JWT | Public |
| `GET` | `/api/auth/me` | Get current user profile | Protected |
| `POST` | `/api/auth/forgot-password` | Request a password reset token | Public |
| `POST` | `/api/auth/reset-password` | Reset password with token | Public |

### Tables
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/tables` | Get all tables | Public |
| `POST` | `/api/tables` | Create a new table | Admin |
| `DELETE` | `/api/tables/:id` | Delete a table | Admin |

### Reservations
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/reservations/check-availability` | Check table availability | Public |
| `POST` | `/api/reservations` | Create a reservation (includes userId) | Public |
| `GET` | `/api/reservations` | Get reservations (supports userId, email, date, status filters) | **Protected** |
| `GET` | `/api/reservations/:id` | Get reservation by ID | Protected |
| `PUT` | `/api/reservations/:id/status` | Update reservation status | Admin |
| `DELETE` | `/api/reservations/:id` | Delete a reservation | Admin |

**Important:** The `GET /api/reservations` endpoint now allows **authenticated customers** to fetch their own reservations by passing `userId` as a query parameter. Admins can view all reservations.

### Users (Admin Only)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/users` | Get all users | Admin |
| `GET` | `/api/users/stats` | Get user statistics | Admin |
| `GET` | `/api/users/:id` | Get user by ID | Admin |
| `PUT` | `/api/users/:id` | Update user role | Admin |
| `DELETE` | `/api/users/:id` | Delete a user | Admin |
| `POST` | `/api/users/cleanup` | Cleanup database | Admin |

---

## Creating an Admin User

Register an admin account via the API:

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

Alternatively, log in as an existing admin and promote any user from the **Admin Settings > Users** tab.

---

## License

MIT
