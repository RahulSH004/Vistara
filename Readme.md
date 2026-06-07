# Hotel Booking Platform - Backend

A robust backend API for a hotel booking platform built with **Express.js**, **PostgreSQL**, and **Drizzle ORM**. This API handles hotel management, room bookings, user authentication, and reviews.

## 🎯 Features

- **User Authentication** - Sign up, login with JWT tokens
- **Role-Based Access** - Admin and user roles with different permissions
- **Hotel Management** - Create and view hotels (admin only)
- **Room Management** - Browse available rooms with filters
- **Booking System** - Book rooms, view bookings, cancel bookings
- **Review System** - Leave and view reviews for hotels
- **Error Handling** - Comprehensive error handling middleware

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Database Tool**: Docker Compose

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (or Docker)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd hotel-booking-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:
```env
PORT=3000
DATABASE_URL=postgresql://hotel_booking_platform:hotel_book123@localhost:5432/hotel_booking_platform
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4. Start PostgreSQL (Using Docker)

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** on port 5432
- **Adminer** (database UI) on port 8080

### 5. Run Migrations

```bash
npm run migrate
```

Or use Drizzle Kit:
```bash
npx drizzle-kit migrate
```

### 6. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Authentication (`/api/auth`)

### Hotels (`/api/hotels`)

### Rooms (`/api/rooms`)

### Bookings (`/api/bookings`)

### Reviews (`/api/reviews`)


## 🏗️ Project Structure

```
src/
├── modules/
│   ├── auth/              # Authentication logic
│   ├── hotel/             # Hotel management
│   ├── rooms/             # Room management
│   ├── bookings/          # Booking system
│   └── review/            # Review system
├── middleware/            # Express middleware
├── db/
│   ├── connection.ts      # Database connection
│   └── schema.ts          # Database schema
├── types/                 # TypeScript types
├── utils/                 # Helper utilities
└── index.ts               # Server entry point
```

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. User registers or logs in
2. Server returns JWT token
3. Include token in request headers: `Authorization: Bearer <token>`
4. Admin endpoints require `admin` role

## 🗄️ Database

### Schema Overview
- **users** - User accounts with roles (admin/user)
- **hotels** - Hotel information
- **rooms** - Room details and availability
- **bookings** - Guest bookings
- **reviews** - User reviews and ratings

View the full schema in `src/db/schema.ts`

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

ISC

## 💡 Support

For issues or questions, please open an issue on GitHub.

---