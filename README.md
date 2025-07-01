# 🏗️ MERN Metal Rate Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

A full-stack MERN application for managing precious metal purities and rates with real-time updates, secure authentication, and comprehensive rate history tracking.

## 🎯 Overview

This application provides a complete solution for metal trading businesses to manage their precious metal inventory, track rate fluctuations, and maintain historical data with user authentication .

---

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based user authentication with login/register system
- Protected routes and API endpoints
- Secure password hashing with bcrypt
- Session management with token validation

### 📊 Metal Management
- **Metal Data Management**: Complete CRUD operations for metal information
- **Purity Management**: Create, read, update, delete purity levels
- **Metal Rates**: Comprehensive rate management with historical tracking
- **Rate History**: Paginated view with advanced filtering options

### 🎨 User Experience
- Responsive Material UI design
- Component-based architecture for reusability
- Form validation with user-friendly error messages
- Seamless navigation between different management sections

### 🏗️ Architecture
- **MVC Pattern**: Clean separation of concerns
- **RESTful API**: Standard HTTP methods and status codes
- **Modular Structure**: Organized codebase for scalability

---

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern UI library
- **React Router DOM** - Client-side routing
- **Material UI (MUI)** - Component library
- **Axios** - HTTP client
- **Notistack** - Toast notifications
- **React Hook Form** - Form management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

---

## 🏗️ MVC Architecture

This application follows the **Model-View-Controller (MVC)** pattern for clean separation of concerns:

### 📁 Backend Structure (MVC)
```
MERN-METAL.../
├── controllers/          # Controllers - Handle business logic
│   ├── authController.js      # Authentication logic (register, login)
│   ├── metalRateController.js # Rate management logic
│   └── purityController.js    # Purity management logic
├── models/              # Models - Data layer
│   ├── MetalRate.js        # Metal rate schema
│   ├── Purty.js            # Purity schema (or Purity.js)
│   └── User.js             # User authentication schema
├── routes/              # Routes - API endpoints
│   ├── authRoutes.js             # Authentication routes
│   ├── metalRatesRoutes.js       # Metal rate routes
│   └── purityRoutes.js           # Purity management routes
├── middleware/          # Custom middleware
│   └── authMiddleware.js   # JWT protection middleware
├── gitignore            # Git ignore file
├── package.json         # Backend dependencies
└── server.js            # Main server entry point
```

### 🎨 Frontend Structure (Component-Based)
```
client/
├── node_modules/        # Installed dependencies
├── public/              # Static assets and public files
├── src/                 # Source code directory
│   ├── components/      # Reusable UI components
│   │   ├── CreatePurtyForm.js      # Purity creation form component
│   │   ├── MetalRateList.js        # Rate list display component
│   │   ├── MetalRateManager.js     # Rate management interface
│   │   ├── Notification.js         # Toast notification component
│   │   └── PurtyList.js            # Purity list display component
│   ├── pages/           # Page-level components (Views)
│   │   ├── LoginPage.js            # User authentication - login
│   │   ├── MetalRateHistoryPage.js # Rate history with pagination
│   │   ├── MetalRateManagerPage.js # Main rate management page
│   │   ├── PurtyPage.js            # Purity management page
│   │   └── RegisterPage.js         # User registration page
│   ├── api.js           # API service layer & Axios configuration
│   ├── App.css          # Global application styles
│   ├── App.js           # Main application component & routing
│   ├── App.test.js      # Application unit tests
│   ├── index.css        # Base styles and CSS reset
│   ├── index.js         # React entry point & DOM rendering
│   ├── logo.svg         # Application logo asset
│   ├── reportWebVitals.js # Performance monitoring utilities
│   └── setupTests.js    # Jest test configuration
├── .env                 # Environment variables (not tracked)
├── .gitignore           # Git ignore patterns
├── package-lock.json    # Exact dependency versions
├── package.json         # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Alameena1/mern-metal-management.git
cd mern-metal-management
```

### 2️⃣ Backend Setup

Navigate to server directory and install dependencies:
```bash
cd server
npm install
```

Create environment variables file:
```bash
# Create .env file in server directory
 .env
```

Add the following environment variables to `.env`:
```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key

# Server Configuration
PORT=5000
```

Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

### 3️⃣ Frontend Setup

Navigate to client directory and install dependencies:
```bash
cd ../client
npm install
```

Create environment variables file:
```bash
# Create .env file in client directory
 .env
```

Add the following environment variables to `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
```

### Metal Purities
```
GET    /api/purity         # Get all purities (Protected)
POST   /api/purity         # Create new purity (Protected)
PUT    /api/purity/:id     # Update purity (Protected)
DELETE /api/purity/:id     # Delete purity (Protected)
```

### Metal Rates
```
GET    /api/rates          # Get all rates (Protected)
GET    /api/rates/latest   # Get latest rate (Protected)
POST   /api/rates          # Create new rate (Protected)
```

### 🔐 Protected Routes
All routes except authentication require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🎯 Usage Guide

### For First-Time Users
1. **Register**: Visit the Register page to set up a new account with your email and password.
2. **Login**: Sign in with your credentials via the LoginPage
3. **Navigate**: Utilize the top navigation bar to switch between Purity, Rate Management, and Rate History sections
4. **Manage Metal Data**: Add and organize metal details via the Metal Rate Management section.
5. **Set Purities**: Configure purity levels using the PurtyManager
6. **Track Rates**: Monitor and update metal rates in the Rate Management and Rate History sections.

### Key Features 
- **Main Navigation Bar**: Access Purity, Rate Management, and Rate History with a single click.
- **MetalRateManager**: Input metal rates by selecting metal, purity, and date, then save the new rate.
- **PurtyManager**: Add new purity levels by selecting a metal and entering a purity name.
- **Rate History**:  Search historical rates by metal and purity to review past data.
- **Form Components**: Intuitive forms for data entry and updates

### Authentication 
- **Login**: Enter your email and password to sign in.
- **Register**: Sign up with a new email and password to start using the app.
- **Note**: You must be logged in to perform actions like saving rates or creating purities.

### Authentication 
- Ensure all fields are filled before saving or creating to avoid errors.
- Use the search functionality in Rate History to quickly find specific rates.
- Log out and log back in if you encounter access issues.

---

## 🌐 Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with automatic builds on push

### Frontend Deployment (Vercel)
1. Connect repository to Vercel
2. Set environment variables for production API URL
3. Deploy with automatic builds

### Environment Variables for Production
```env
# Backend (Render)
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production

# Frontend (Vercel)
REACT_APP_API_URL=https://your-backend-url.render.com/api
```

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Client and server-side route protection
- **Input Validation**: Comprehensive validation on all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Sensitive data protection

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---