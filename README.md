# La Maison - Restaurant Table Reservation System

A full-stack **MERN** application for reserving restaurant tables online, checking real-time availability, and managing reservations through a comprehensive admin dashboard. Styled with a warm, premium restaurant theme featuring amber and stone tones, serif typography, and frosted-glass UI elements.

---

## Project Overview

La Maison is an end-to-end table reservation platform designed for both customers and restaurant administrators:

- **Customers** create an account, log in, search for available tables by date/time/party size, and confirm bookings with contact details.
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

### Customer Features
- Search available tables by date, time, and party size
- Real-time table availability checking
- Select a table and confirm the reservation with contact details
- View reservation confirmation with booking summary

### Admin Features
- **Dashboard** — View, filter (by date), and manage all reservations with status updates (Pending, Confirmed, Seated, Completed, Cancelled)
- **Settings** — Add/remove tables, update table status (available/occupied), manage users, and promote or demote user roles
- **Analytics** — Overview cards (total reservations, today's bookings, total users, total tables), reservation status breakdown, and quick insight metrics (occupancy, completion, and cancellation rates)
- Database cleanup utility

### UI / UX
- Warm restaurant theme with amber, stone, and earth tones
- Playfair Display (serif) headings and Inter (sans-serif) body text via Google Fonts
- Frosted-glass card components with subtle backdrop blur
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
│   │   ├── authController.js      # Register, login, get current user
│   │   ├── reservationController.js
│   │   ├── tableController.js
│   │   └── userController.js      # User CRUD, stats, DB cleanup
│   ├── middleware/
│   │   └── auth.js                # JWT verify, role authorization
│   ├── models/
│   │   ├── User.js
│   │   ├── Table.js
│   │   └── Reservation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── reservationRoutes.js
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
│   │   │   ├── authService.js     # Login, register, logout helpers
│   │   │   ├── reservationService.js
│   │   │   ├── tableService.js
│   │   │   └── userService.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Global navigation bar
│   │   │   └── ProtectedRoute.jsx # Auth guard for routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state provider
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Hero + reservation search form
│   │   │   ├── Booking.jsx        # Table selection & booking confirmation
│   │   │   ├── Login.jsx          # User login
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── AdminDashboard.jsx # Reservation management
│   │   │   ├── AdminSettings.jsx  # Table & user management
│   │   │   └── AdminAnalytics.jsx # Stats & insights
│   │   ├── App.jsx                # Route definitions
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
2. Click **Sign up** to navigate to the registration form.
3. Fill in your name, email, and password, then click **Create Account**.
4. You will be redirected back to the **Login** page.

### Logging In
1. Enter the email and password you registered with.
2. Click **Sign In** to access the application.
3. If credentials are invalid, the error message remains visible until you start typing or submit again.

### Booking a Table
1. On the **Home** page, select a date, time, and party size, then click **Find Available Tables**.
2. Browse the available tables and select one.
3. Fill in your contact details (name, email, phone) and click **Confirm Reservation**.
4. A confirmation screen will display your booking summary.

### Admin Access
1. Register an admin user via the API (see below) or promote an existing user from the Admin Settings panel.
2. Log in with admin credentials — you will be directed to the **Admin Dashboard**.
3. From the dashboard, navigate to **Settings** (manage tables and users) or **Analytics** (view performance metrics).

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Log in and receive JWT | Public |
| `GET` | `/api/auth/me` | Get current user profile | Protected |

### Tables
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/tables` | Get all tables | Public |
| `POST` | `/api/tables` | Create a new table | Admin |
| `PUT` | `/api/tables/:id` | Update table status | Admin |
| `DELETE` | `/api/tables/:id` | Delete a table | Admin |

### Reservations
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/reservations/check-availability` | Check table availability | Public |
| `POST` | `/api/reservations` | Create a reservation | Public |
| `GET` | `/api/reservations` | Get all reservations | Admin |
| `GET` | `/api/reservations/:id` | Get reservation by ID | Protected |
| `PUT` | `/api/reservations/:id/status` | Update reservation status | Admin |
| `DELETE` | `/api/reservations/:id` | Delete a reservation | Admin |

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
