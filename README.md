# La Maison - Restaurant Table Reservation System

A production-grade, full-stack **MERN** application for online restaurant table reservations with real-time availability tracking and comprehensive administrative controls. Built with enterprise-level architecture and styled with a sophisticated restaurant aesthetic featuring amber and stone color palettes, serif typography, and glassmorphic UI components.

**🚀 Live Deployment:** Continuously deployed with frontend on **Vercel** and backend on **Render**, connected to **MongoDB Atlas**.

---

## Project Overview

La Maison is a scalable, end-to-end table reservation platform engineered for both customer-facing operations and administrative management:

* **Customers** authenticate securely, search available tables by date/time/party size with dynamic time slot generation, complete bookings with validated contact information, and access personalized reservation dashboards with historical data.
* **Administrators** orchestrate reservation workflows (approval, seating, completion, cancellation), manage table inventory, control user roles and permissions, and analyze operational metrics through dedicated dashboards.

*All routes are protected by JWT-based authentication middleware — unauthorized access attempts are intercepted and redirected to the login portal.*

---

## Features

### Authentication & Security
* **JWT-based stateless authentication** with bcrypt password hashing (10 salt rounds).
* **Route protection middleware** — unauthorized requests are intercepted and redirected to authentication portal.
* **Decoupled registration and login flows** — new users complete registration, then authenticate separately to receive JWT tokens.
* **Role-based access control (RBAC)** — granular permissions for Customer and Admin roles.
* **Contextual error handling** — specific, user-friendly error messages for failed authentication attempts.
* **Password recovery system** — secure, token-based password reset with email verification, time-limited tokens (15-minute expiry), and confirmation notifications.
* **Enhanced UX controls** — password visibility toggle with eye icon for improved form usability.

### Customer Features
* **Intelligent search interface** — query available tables by date, time, and party size with instant results.
* **Dynamic time slot generation** — business hours adapt based on day of week:
    * **Weekdays (Mon-Fri)**: 11:00 AM - 10:00 PM (30-minute intervals).
    * **Weekends (Sat-Sun)**: 10:00 AM - 11:00 PM (30-minute intervals).
    * **IST timezone validation** — past time slots automatically disabled for current day bookings.
* **Real-time availability engine** — visual status indicators (green = available, red = reserved) with instant updates.
* **Streamlined booking flow** — table selection with validated contact information (10-digit phone validation, email verification).
* **Post-booking automation** — automatic redirection to personal dashboard with 2-second confirmation delay.
* **Personalized reservation dashboard** — user-scoped data with segregated views:
    * *Current/Upcoming Bookings* — Active and scheduled reservations.
    * *Past Bookings* — Historical records (completed, cancelled).
    * **Data display**: Table number, date, time, party size, reservation status.
    * **Manual refresh control** — circular refresh icon for on-demand data synchronization.
* **Customer review system**:
    * **5-star rating mechanism** with categorical feedback (Food Quality, Service, Ambiance, Cleanliness, Overall Experience).
    * **500-character limit** for detailed comments.
    * **Reservation-gated reviews** — only completed bookings eligible (one review per reservation).
    * **Session persistence** — reliable submission handling with user context preservation.
* **Integrated support portal**:
    * **Click-to-call functionality** — direct phone dialer integration (+91 6300251692, +91 6301716173).
    * **Click-to-email links** — instant email client launch (support@lamaison.com, chadajayasenareddy123@gmail.com).
    * **Google Maps integration** — one-click navigation to restaurant location (2-7-303, Excise Colony, Hanamkonda, 506001).
    * **Operating hours display**: Mon-Fri (11 AM - 10 PM), Sat-Sun (10 AM - 11 PM).
    * **FAQ section** — common issues guide with quick access from dashboard navigation.
* **Data isolation** — backend implements user ID filtering to ensure customers only access their own reservation data.

### Admin Features
* **Centralized reservation dashboard** — comprehensive view with date-based filtering and status management (Pending, Confirmed, Seated, Completed, Cancelled).
* **Workflow-optimized layout** — column ordering prioritizes operational efficiency: Date, Time, Customer Contact, Table, Party Size, Status.
* **System configuration panel** — table inventory management, user administration, and role-based permission controls.
    * **Automated availability tracking** — table status dynamically updates based on reservation state (eliminates manual status management).
* **Business intelligence dashboard** — real-time metrics with overview cards:
    * **Key performance indicators**: Total reservations, daily bookings, user count, table inventory.
    * **Status distribution analytics** — visual breakdown of reservation states.
    * **Operational insights**: Occupancy rate, completion rate, cancellation rate.
* **Review moderation system** — comprehensive feedback management with multi-filter views (All, Approved, Rejected):
    * **Approval workflow** — accept or reject customer reviews.
    * **Content moderation** — delete inappropriate or policy-violating reviews.
    * **Rich data display** — customer name, star rating, category, comment text, submission timestamp.
    * **Navigation integration** — accessible via admin navbar between Analytics and Settings.
* **Responsive data presentation** — all admin interfaces support full-page scrolling for large datasets without content truncation.

### Automated Booking Protection
* **Database-level concurrency control** — atomic operations prevent race conditions and double-booking scenarios.
* **Pre-commit validation layer** — real-time conflict detection before reservation persistence.
* **Contextual error messaging** — clear, actionable feedback ("This time slot is already booked. Please select a different time.").
* **Capacity management** — enforced limit of 4 concurrent reservations per time slot to maintain service quality.

### UI / UX
* **Premium design system** — warm color palette with amber, stone, and earth tones for sophisticated restaurant branding.
* **Typography hierarchy** — Playfair Display (serif) for headings, Inter (sans-serif) for body text, loaded via Google Fonts CDN.
* **Glassmorphic components** — frosted-glass card elements with backdrop blur effects for modern depth perception.
* **Responsive architecture** — fluid layouts with `min-h-screen` containers, natural scrolling, and mobile-first breakpoints.
* **Cross-device compatibility** — optimized for desktop, tablet, and mobile viewports with Tailwind CSS responsive utilities.
* **Icon system** — Lucide React library for consistent, scalable vector icons (RefreshCw, Eye, EyeOff, Star, Phone, MapPin, etc.).
* **Mobile optimizations** — horizontal scroll prevention, touch-friendly controls, 10-digit phone validation with real-time feedback.

---

## Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based UI framework with hooks and context API |
| **Vite 8** | Next-generation build tool with HMR and optimized bundling |
| **React Router 7** | Declarative client-side routing with protected route guards |
| **Tailwind CSS 3** | Utility-first CSS framework with custom design tokens |
| **Axios** | Promise-based HTTP client with interceptors for auth headers |
| **Lucide React** | Lightweight, customizable icon library |
| **Google Fonts** | Web font service for Playfair Display & Inter typography |
| **Vercel** | Continuous deployment platform with edge network CDN |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment (v18+) |
| **Express 5** | Minimalist web application framework with middleware support |
| **MongoDB Atlas** | Cloud-hosted NoSQL database with automated backups |
| **Mongoose 9** | Elegant MongoDB object modeling with schema validation |
| **JSON Web Tokens** | Secure, stateless authentication with signed tokens |
| **bcryptjs** | Adaptive password hashing with configurable salt rounds |
| **dotenv** | Environment variable loader for configuration management |
| **nodemon** | Development utility for automatic server restarts |
| **Render** | Cloud platform for backend hosting with auto-scaling |

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
* **MongoDB Atlas** account (or local MongoDB instance for development)
* **npm** or **yarn** package manager

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
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/restaurant_reservation?retryWrites=true&w=majority
JWT_SECRET=<your_cryptographically_secure_jwt_secret>
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
```

**Environment Variable Descriptions:**
* `PORT` — Server port (default: 5000)
* `MONGO_URI` — MongoDB Atlas connection string with credentials
* `JWT_SECRET` — Cryptographically secure secret for token signing (use `openssl rand -base64 32`)
* `FRONTEND_URL` — Deployed frontend URL for CORS configuration
* `NODE_ENV` — Environment mode (`development` or `production`)

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

Open a **new terminal** window:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**For production deployment**, update to your backend URL:
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Usage Guide

### Creating an Account
1. Navigate to the registration page and complete the sign-up form with validated inputs.
2. After successful registration, authenticate via the login portal to receive your JWT token.

### Booking a Table
1. Use the intelligent search interface on the Home page to select date, time, and party size.
2. Review available tables with real-time status indicators.
3. Select your preferred table and complete the booking form with validated contact information.
4. Receive instant confirmation and automatic redirection to your personalized dashboard.

### Viewing Reservations
1. Access **"My Reservations"** from the navigation menu.
2. View segregated lists of current/upcoming and past bookings.
3. Use the refresh button for on-demand data synchronization.
4. **Data Isolation:** You will only see reservations associated with your authenticated user account.

### Leaving a Review
1. Navigate to **"Past Bookings"** and locate a completed reservation.
2. Click **"Leave Review"** to open the feedback form.
3. Select a star rating (1-5), choose a category, and compose your comment (500-character limit).
4. Submit to contribute to the restaurant's review database.

### Getting Support
1. Click **"Support"** in the dashboard navigation.
2. Utilize click-to-call, click-to-email, and Google Maps integration for instant contact.
3. Review operating hours and FAQ section for common inquiries.

### Admin Access
1. Authenticate with an admin-role account to unlock administrative features.
2. Access **Admin Dashboard** for reservation management, **Settings** for system configuration, **Analytics** for business intelligence, and **Reviews** for content moderation.
3. All admin interfaces support full-page scrolling for comprehensive data visualization.

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

**Method 1: Direct API Registration**

Use an API client (Postman, Insomnia, or cURL) to register an admin account:

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@restaurant.com",
  "password": "SecureAdminPassword123!",
  "role": "admin"
}
```

**Method 2: Role Promotion**

Authenticate with an existing admin account and promote any user via **Admin Settings > Users** tab using the role management interface.

---

## License

MIT
