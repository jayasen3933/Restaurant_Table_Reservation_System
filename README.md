# La Maison - Restaurant Table Reservation System

A full-stack **MERN** application for reserving restaurant tables online, checking real-time availability, and managing reservations through a comprehensive admin dashboard. Styled with a warm, premium restaurant theme featuring amber and stone tones, serif typography, and frosted-glass UI elements.

---

## Project Overview

La Maison is an end-to-end table reservation platform designed for both customers and restaurant administrators:

* **Customers** create an account, log in, search for available tables by date/time/party size, confirm bookings with contact details, and view their personal reservation history in a dedicated dashboard.
* **Admins** manage reservations (approve, seat, complete, or cancel), add or remove tables, manage users and roles, and review analytics from a dedicated dashboard.

*All pages are protected behind authentication — users must log in before accessing any part of the application.*

---

## Features

### Authentication & Security
* JWT-based authentication with secure password hashing (bcrypt).
* Protected routes — unauthenticated visitors are redirected to the Login page.
* Separate registration and login flow — new users are redirected to Login after sign-up and must manually authenticate.
* Role-based access control (Customer / Admin).
* Persistent error messages on login failure.
* **Forgot Password flow** — token-based password reset with email lookup, time-limited reset tokens (15 min), and success notifications.
* **Show/Hide Password toggle** — Eye icon and checkbox on login page for better UX.

### Customer Features
* Search available tables by date, time, and party size.
* **Dynamic time slots** based on day of week:
    * **Weekdays (Mon-Fri)**: 11:00 AM - 10:00 PM (30-minute intervals).
    * **Weekends (Sat-Sun)**: 10:00 AM - 11:00 PM (30-minute intervals).
* Real-time table availability checking with visual indicators (green = available, red = reserved).
* Select a table and confirm the reservation with contact details.
* Automatic redirection to "My Reservations" dashboard after successful booking (2-second delay).
* **Personal Dashboard** showing user-specific reservation history:
    * *Current/Upcoming Bookings* — Active and future reservations.
    * *Past Bookings* — Completed, cancelled, and historical reservations.
    * Displays: Table Number, Date, Time, Number of Guests, Status.
    * **Refresh button** with circular refresh icon (↻) to update reservation list.
* **Review System**:
    * 5-star rating system with categories (Food, Service, Ambiance, Cleanliness, Overall).
    * 500-character review comments.
    * Only available for completed reservations (one review per reservation).
    * Fixed user session handling for reliable review submission.
* **Support & Contact Page**:
    * **Clickable phone numbers** — Opens phone dialer (+91 6300251692, +91 6301716173).
    * **Clickable email addresses** — Opens email client (support@lamaison.com, chadajayasenareddy123@gmail.com).
    * **Clickable address** — Opens Google Maps (2-7-303, Excise Colony, Hanamkonda, 506001).
    * Business hours: Mon-Fri (11 AM - 10 PM), Sat-Sun (10 AM - 11 PM).
    * Common issues guide and quick access from dashboard header.
* User-specific data — Backend queries filter by authenticated user's ID (customers only see their own reservations).

### Admin Features
* **Dashboard** — View, filter (by date), and manage all reservations with status updates (Pending, Confirmed, Seated, Completed, Cancelled).
* **Optimized column order** — Date, Time, Customer Contact, Table, Guests, Status for better workflow.
* **Settings** — Add/remove tables, manage users, and promote or demote user roles.
    * **Automated table booking** — Tables are automatically marked as booked/available based on reservations (no manual status management required).
* **Analytics** — Overview cards (total reservations, today's bookings, total users, total tables), reservation status breakdown, and quick insight metrics (occupancy, completion, and cancellation rates).
* **Review Management** — View all customer reviews with filtering (All, Pending, Approved, Rejected):
    * Approve or reject reviews.
    * Delete inappropriate reviews.
    * Display customer name, rating stars, category, comment, and submission date.
    * Accessible via admin navbar (Reviews link between Analytics and Settings).
* Full page scrolling — All admin pages fully scrollable to view complete data sets.

### Automated Booking Protection
* **Strict concurrency control** — Prevents double-booking at the database level.
* **Real-time validation** — Checks for existing reservations before confirming.
* **User-friendly error messages** — "Book at another time, already another customer booked."
* **Maximum capacity limits** — 4 reservations per time slot.

### UI / UX
* Warm restaurant theme with amber, stone, and earth tones.
* Playfair Display (serif) headings and Inter (sans-serif) body text via Google Fonts.
* Frosted-glass card components with subtle backdrop blur.
* Full page scrolling — All pages use `min-h-screen` with natural scrolling (no content cut off).
* Responsive layout across desktop and mobile.
* Lucide React icons throughout the interface (including RefreshCw, Eye, EyeOff, Star, Phone, MapPin).

---

## Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI framework |
| **Vite 8** | Build tool and dev server |
| **React Router 7** | Client-side routing and protected routes |
| **Tailwind CSS 3** | Utility-first styling with custom theme |
| **Axios** | HTTP client with request/response interceptors |
| **Lucide React** | Icon library |
| **Google Fonts** | Playfair Display & Inter typography |

### Backend
| Technology | Purpose |
| :--- | :--- |
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

```text
Restaurant_Table_Reservation_System/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, forgot/reset password
│   │   ├── reservationController.js # Reservation CRUD, availability, userId filtering
│   │   ├── reviewController.js    # Review CRUD, status updates
│   │   ├── tableController.js     # Table management
│   │   └── userController.js      # User CRUD, stats
│   ├── middleware/
│   │   └── auth.js                # JWT verify, role authorization
│   ├── models/
│   │   ├── User.js                # User schema with role and reset tokens
│   │   ├── Table.js               # Table schema (tableNumber, capacity)
│   │   ├── Reservation.js         # Reservation schema with userId field
│   │   └── Review.js              # Review schema (rating, category, status)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── reservationRoutes.js   # Allows customers to fetch their own reservations
│   │   ├── reviewRoutes.js        # Review endpoints
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
│   │   │   ├── authService.js     # Auth API calls
│   │   │   ├── reservationService.js # Reservation API calls
│   │   │   ├── reviewService.js   # Review API calls
│   │   │   ├── tableService.js    # Table API calls
│   │   │   └── userService.js     # User API calls
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Global navigation bar with Reviews link
│   │   │   └── ProtectedRoute.jsx # Auth guard for routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state provider
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Hero + reservation search (dynamic time slots)
│   │   │   ├── Booking.jsx        # Table selection and booking
│   │   │   ├── Login.jsx          # User login with show/hide password
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── ForgotPassword.jsx # Email submission for password reset
│   │   │   ├── ResetPassword.jsx  # New password form (token-based)
│   │   │   ├── CustomerDashboard.jsx # User-specific reservation history
│   │   │   ├── Support.jsx        # Support & contact page (clickable links)
│   │   │   ├── AdminDashboard.jsx # Reservation management (full scrolling)
│   │   │   ├── AdminSettings.jsx  # Table & user management (full scrolling)
│   │   │   ├── AdminAnalytics.jsx # Stats & insights
│   │   │   └── AdminReviews.jsx   # Review moderation (filter, approve, reject)
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
* **Node.js** v18 or higher
* **MongoDB** (local instance or MongoDB Atlas)
* **npm**

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

Open a **new terminal** window:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Usage Guide

### Creating an Account
1. Click **"Sign up"**, fill in your details, and log in.

### Booking a Table
1. Select a date/time on the Home page, choose a table, and confirm.
2. You will be auto-redirected to your dashboard.

### Viewing Reservations
1. Go to **"My Reservations"** to see upcoming and past bookings.
2. **Note:** You will only see your own reservations.

### Leaving a Review
1. Find a completed reservation in **"Past Bookings"** and click **"Leave Review"**.
2. Select rating (1-5 stars), category, and write your comment (up to 500 characters).
3. Submit to share your experience.

### Getting Support
1. Click **"Support"** in your dashboard header.
2. Access clickable phone numbers, email addresses, and Google Maps location.
3. View business hours and common issues guide.

### Admin Access
1. Log in with an admin account to access the **Admin Dashboard**, **Settings**, **Analytics**, and **Reviews**.
2. Admin pages support full scrolling for large data sets.

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Log in and receive JWT | Public |
| `GET` | `/api/auth/me` | Get current user profile | Protected |
| `POST` | `/api/auth/forgot-password` | Request a password reset token | Public |
| `POST` | `/api/auth/reset-password` | Reset password with token | Public |

### Tables & Reservations
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tables` | Get all tables | Public |
| `POST` | `/api/reservations` | Create a reservation (includes userId) | Public |
| `GET` | `/api/reservations` | Get reservations (supports filtering) | Protected |
| `PUT` | `/api/reservations/:id/status` | Update reservation status | Admin |

### Reviews & Users
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/reviews` | Create a new review | Protected |
| `PUT` | `/api/reviews/:id/status` | Update review status (approve/reject) | Admin |
| `GET` | `/api/users` | Get all users | Admin |
| `PUT` | `/api/users/:id` | Update user role | Admin |

---

## Creating an Admin User

Register an admin account via your API client (like Postman):

```http
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
