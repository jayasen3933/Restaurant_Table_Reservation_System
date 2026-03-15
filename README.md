# Restaurant Table Reservation System

A full-stack MERN application that enables customers to reserve restaurant tables online, view availability, and manage reservations with an admin dashboard. Built with a minimalist Notion-like UI design.

## Features

### Customer Features
- Browse available tables by date, time, and party size
- Real-time table availability checking
- Guest checkout (no login required for booking)
- Reservation confirmation with contact details

### Admin Features
- Secure admin login with JWT authentication
- Dashboard to view all reservations
- Filter reservations by date
- Update reservation status (Pending → Confirmed → Seated → Completed/Cancelled)
- Real-time reservation management

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** (Vite) - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **Bootstrap** - Component structure
- **Lucide React** - Icon library

## Project Structure

```
Restaurant_Table_Reservation_System/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tableController.js
│   │   └── reservationController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Table.js
│   │   └── Reservation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tableRoutes.js
│   │   └── reservationRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── authService.js
│   │   │   ├── reservationService.js
│   │   │   └── tableService.js
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_reservation
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tables
- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create new table (admin only)
- `PUT /api/tables/:id` - Update table status (admin only)
- `DELETE /api/tables/:id` - Delete table (admin only)

### Reservations
- `GET /api/reservations/check-availability` - Check table availability
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - Get all reservations (admin only)
- `GET /api/reservations/:id` - Get reservation by ID (protected)
- `PUT /api/reservations/:id/status` - Update reservation status (admin only)
- `DELETE /api/reservations/:id` - Delete reservation (admin only)

## Creating an Admin User

To create an admin user, register through the API with the `role` field:

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

## Adding Tables

Use the admin account to add tables via API:

```bash
POST http://localhost:5000/api/tables
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "tableNumber": 1,
  "capacity": 4
}
```

## Design Philosophy

The UI follows a **Notion-like minimalist design**:
- Monochrome color palette (black, white, gray)
- Clean typography with Inter font
- Subtle borders and shadows
- Generous whitespace
- Hover states for interactivity
- No heavy visual elements

## License

MIT
