# 🍽️ La Maison - Restaurant Table Reservation System

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

**A premium, full-stack restaurant table reservation platform with real-time availability, dynamic time slots, and comprehensive admin management.**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation--setup) • [Usage](#-usage)

</div>

---

## 📋 Project Overview

**La Maison** is an end-to-end table reservation system built with the MERN stack, designed for both customers and restaurant administrators. The application features a sophisticated, premium UI with frosted-glass effects, warm amber and stone tones, and elegant serif typography.

### What Makes It Special?

- 🔐 **Secure Authentication** - JWT-based auth with role-based access control
- ⏰ **Dynamic Time Slots** - Weekday (11 AM - 10 PM) and Weekend (10 AM - 11 PM) scheduling
- 🎯 **Real-time Availability** - Instant table availability checking with concurrency control
- 📊 **Admin Analytics** - Comprehensive dashboard with reservation insights
- ⭐ **Review System** - Customer feedback with 5-star ratings and categorization
- 📱 **Responsive Design** - Fully optimized for desktop and mobile devices

---

## ✨ Key Features

### 👤 Customer Features

- **🔐 Authentication & Account Management**
  - Secure registration and login with JWT tokens
  - Password reset via email with time-limited tokens (15 min)
  - Show/hide password toggle for better UX
  - Role-based access control (Customer/Admin)

- **📅 Smart Reservation System**
  - Search available tables by date, time, and party size
  - **Dynamic time slots** based on day of week:
    - Weekdays (Mon-Fri): 11:00 AM - 10:00 PM
    - Weekends (Sat-Sun): 10:00 AM - 11:00 PM
  - Real-time availability checking with visual indicators
  - Automatic redirect to "My Reservations" after booking
  - Concurrency control prevents double-booking

- **📊 Personal Dashboard**
  - View all your reservations in one place
  - **Current/Upcoming Bookings** - Active and future reservations
  - **Past Bookings** - Completed and cancelled history
  - Displays: Table Number, Date, Time, Guests, Status
  - One-click refresh to update reservation list

- **⭐ Review & Feedback System**
  - Leave reviews for completed reservations
  - 5-star rating system
  - Multiple categories: Food, Service, Ambiance, Cleanliness, Overall
  - 500-character detailed comments
  - One review per reservation limit

- **📞 Support & Contact**
  - Clickable phone numbers (opens dialer)
  - Clickable email addresses (opens email client)
  - Clickable address (opens Google Maps)
  - Business hours and common issues guide
  - Quick access from dashboard header

### 🔧 Admin Features

- **📈 Comprehensive Dashboard**
  - View and manage all reservations
  - Filter by date and status
  - Update reservation status (Pending → Confirmed → Seated → Completed)
  - Optimized column layout for efficient workflow
  - Full-page scrolling for large datasets

- **⚙️ Settings & Management**
  - Add/remove tables with capacity settings
  - Manage user accounts and roles
  - Promote/demote users (Customer ↔ Admin)
  - **Automated table booking** - No manual status management needed
  - Database cleanup utilities

- **📊 Analytics Dashboard**
  - Total reservations, today's bookings, users, and tables
  - Reservation status breakdown (pie charts)
  - Key metrics: Occupancy rate, completion rate, cancellation rate
  - Real-time insights for business decisions

- **⭐ Review Management**
  - View all customer reviews
  - Filter by status (All, Pending, Approved, Rejected)
  - Approve or reject reviews
  - Delete inappropriate reviews
  - Moderate customer feedback

### 🎨 UI/UX Features

- **Premium Design**
  - Warm amber and stone color palette
  - Frosted-glass card components with backdrop blur
  - Playfair Display (serif) for headings
  - Inter (sans-serif) for body text
  - Lucide React icons throughout

- **Responsive & Accessible**
  - Fully responsive on desktop and mobile
  - Full-page scrolling (no content cut-off)
  - Smooth transitions and hover effects
  - Intuitive navigation and user flows

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI framework with hooks and context API |
| **Vite** | 8.x | Lightning-fast build tool and dev server |
| **React Router** | 7.x | Client-side routing with protected routes |
| **Tailwind CSS** | 3.x | Utility-first CSS with custom theme (amber/stone palette) |
| **Axios** | Latest | HTTP client with interceptors for auth tokens |
| **Lucide React** | Latest | Modern icon library (500+ icons) |
| **Google Fonts** | - | Playfair Display (serif) & Inter (sans-serif) |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 5.x | Fast, minimalist web framework |
| **MongoDB** | Latest | NoSQL database for flexible data storage |
| **Mongoose** | 9.x | Elegant MongoDB object modeling (ODM) |
| **JWT** | Latest | Secure, stateless authentication tokens |
| **bcryptjs** | Latest | Password hashing with salt rounds |
| **dotenv** | Latest | Environment variable management |
| **nodemon** | Latest | Auto-restart server during development |
| **cors** | Latest | Cross-Origin Resource Sharing middleware |

### Development Tools

- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **Git** - Version control
- **Postman** - API testing and documentation

---

## 📁 Project Structure

```
Restaurant_Table_Reservation_System/
│
├── backend/                        # Node.js + Express API
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── reservationController.js # Reservation CRUD & availability
│   │   ├── reviewController.js    # Review management
│   │   ├── tableController.js     # Table management
│   │   └── userController.js      # User management & stats
│   ├── middleware/
│   │   └── auth.js                # JWT verification & authorization
│   ├── models/
│   │   ├── User.js                # User schema (role, tokens)
│   │   ├── Table.js               # Table schema (number, capacity)
│   │   ├── Reservation.js         # Reservation schema (userId, tableId)
│   │   └── Review.js              # Review schema (rating, category)
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth endpoints
│   │   ├── reservationRoutes.js   # /api/reservations endpoints
│   │   ├── reviewRoutes.js        # /api/reviews endpoints
│   │   ├── tableRoutes.js         # /api/tables endpoints
│   │   └── userRoutes.js          # /api/users endpoints
│   ├── .env                       # Environment variables (not in repo)
│   ├── server.js                  # Express app entry point
│   └── package.json               # Backend dependencies
│
├── frontend/                       # React + Vite SPA
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js           # Axios instance with auth interceptors
│   │   │   ├── authService.js     # Auth API calls
│   │   │   ├── reservationService.js # Reservation API calls
│   │   │   ├── reviewService.js   # Review API calls
│   │   │   ├── tableService.js    # Table API calls
│   │   │   └── userService.js     # User API calls
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Global navigation
│   │   │   └── ProtectedRoute.jsx # Route authentication guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page with search
│   │   │   ├── Booking.jsx        # Table selection & booking
│   │   │   ├── Login.jsx          # User login
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── ForgotPassword.jsx # Password reset request
│   │   │   ├── ResetPassword.jsx  # Password reset form
│   │   │   ├── CustomerDashboard.jsx # Customer reservations
│   │   │   ├── Support.jsx        # Support & contact page
│   │   │   ├── AdminDashboard.jsx # Admin reservation management
│   │   │   ├── AdminSettings.jsx  # Admin table & user management
│   │   │   ├── AdminAnalytics.jsx # Admin analytics dashboard
│   │   │   └── AdminReviews.jsx   # Admin review moderation
│   │   ├── App.jsx                # Main app with routes
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Tailwind directives
│   ├── index.html                 # HTML template
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── vite.config.js             # Vite configuration
│   └── package.json               # Frontend dependencies
│
└── README.md                       # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Download |
|-------------|---------|----------|
| **Node.js** | 18.x or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x or higher | Comes with Node.js |
| **MongoDB** | 6.x or higher | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

> **Note:** You can use MongoDB Atlas (cloud) instead of a local MongoDB installation.

---

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/Restaurant_Table_Reservation_System.git
cd Restaurant_Table_Reservation_System
```

---

### ⚙️ Step 2: Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/restaurant_reservation
# For MongoDB Atlas, use:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant_reservation

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Email Configuration (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@lamaison.com
```

> **Security Note:** Never commit the `.env` file to version control. Use strong, unique values for `JWT_SECRET` in production.

#### Start the Backend Server

```bash
npm run dev
```

✅ Backend API running at: **http://localhost:5000**

---

### 🎨 Step 3: Frontend Setup

Open a **new terminal** window:

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Configure Environment Variables (Optional)

Create a `.env` file in the `frontend/` directory if you need to customize the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note:** By default, the frontend is configured to use `http://localhost:5000/api`.

#### Start the Frontend Development Server

```bash
npm run dev
```

✅ Frontend application running at: **http://localhost:5173**

---

### 🎉 Step 4: Access the Application

1. Open your browser and navigate to **http://localhost:5173**
2. You'll be redirected to the **Login** page
3. Click **"Sign Up"** to create a new account
4. Start making reservations!

#### Create an Admin Account

To access admin features, you can either:

**Option 1: Via API (Recommended)**

Use Postman or curl to create an admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@lamaison.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Option 2: Via MongoDB**

Update an existing user's role directly in MongoDB:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

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

### Leaving a Review
1. After your reservation is completed, go to **My Reservations** (Customer Dashboard).
2. In the **Past Bookings** section, find your completed reservation.
3. Click the **Leave Review** button next to the reservation.
4. In the review modal:
   - Select a rating (1-5 stars)
   - Choose a category (Overall, Food, Service, Ambiance, Cleanliness)
   - Write your review (up to 500 characters)
5. Click **Submit Review** to share your experience.
6. You can only review each reservation once.

### Getting Support
1. Click the **Support** button in your dashboard header.
2. View restaurant contact information:
   - Phone numbers for immediate assistance
   - Email addresses for detailed inquiries
   - Physical address and business hours
3. Browse the common issues guide for:
   - Table-related problems
   - Food quality concerns
   - Service and staff behavior issues
   - Reservation modifications
   - Any other complaints or feedback

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

### Reviews
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/reviews/can-review` | Check if user can review a reservation | Public |
| `POST` | `/api/reviews` | Create a new review | Protected |
| `GET` | `/api/reviews` | Get all reviews (supports userId, status filters) | Protected |
| `GET` | `/api/reviews/:id` | Get review by ID | Protected |
| `PUT` | `/api/reviews/:id/status` | Update review status (approve/reject) | Admin |
| `DELETE` | `/api/reviews/:id` | Delete a review | Admin |

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

## 🌐 Deployment

### Frontend Deployment (Vercel - Recommended)

The React frontend is optimized for deployment on **Vercel**:

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Set Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy!** Vercel will automatically deploy on every push to main.

**Alternative:** Netlify, GitHub Pages, or any static hosting service.

---

### Backend Deployment (Render/Railway - Recommended)

The Express backend can be deployed on **Render**, **Railway**, or **Heroku**:

#### Render Deployment

1. **Create a new Web Service** on [render.com](https://render.com)

2. **Connect your GitHub repository**

3. **Configure settings:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Set Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://your-atlas-connection-string
   JWT_SECRET=your-production-secret-key
   JWT_EXPIRE=7d
   ```

5. **Deploy!** Render will build and start your server.

#### Important Notes

- Use **MongoDB Atlas** for production database (free tier available)
- Set `NODE_ENV=production` in production
- Use strong, unique `JWT_SECRET` (min 32 characters)
- Enable CORS for your frontend domain
- Consider using environment-specific configs

---

## 📚 API Documentation

Complete API documentation is available in the codebase. Key endpoints:

- **Authentication:** `/api/auth/*`
- **Reservations:** `/api/reservations/*`
- **Tables:** `/api/tables/*`
- **Reviews:** `/api/reviews/*`
- **Users:** `/api/users/*` (Admin only)

For detailed endpoint documentation, see the [API Endpoints](#api-endpoints) section above.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Code Style

- Follow existing code conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Test your changes before submitting

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- **MongoDB** - Database platform
- **Express.js** - Web framework
- **React** - UI library
- **Node.js** - Runtime environment
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Vite** - Build tool

---

## 📞 Support

For support, email support@lamaison.com or create an issue in the GitHub repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Your Name]

</div>
