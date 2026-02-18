# DevTrack - Personal Attendance & Work Tracking System

A full-stack web application for tracking daily attendance and work activities.

## Tech Stack
- **Frontend**: React (Vite), Custom CSS, Chart.js
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)

## Prerequisites
- Node.js installed
- Supabase account

## Setup Instructions

### 1. Database Setup (Supabase)
1. Create a new project in Supabase.
2. Go to the **SQL Editor** in Supabase dashboard.
3. Copy the contents of `supabase_schema.sql` (found in the root of this project) and run it.
4. Go to **Project Settings > API** and copy your `URL` and `anon public` key.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```sh
   cp .env.example .env
   ```
4. Fill in your Supabase URL and Key in `.env`.
5. Start the server:
   ```sh
   npm start
   ```
   (Server runs on http://localhost:5000)

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```sh
   cp .env.example .env
   ```
4. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Start the React app:
   ```sh
   npm run dev
   ```

## Folder Structure
```
DevTrack/
├── backend/            # Express Server
│   ├── server.js       # Main entry point with routes
│   └── .env.example    # Environment variables template
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # Reusable components (Navbar, ProtectedRoute)
│   │   ├── context/    # AuthContext for Supabase Auth
│   │   ├── pages/      # Application Pages (Login, Dashboard, Attendance, Activity)
│   │   └── services/   # Supabase client configuration
│   └── .env.example
└── supabase_schema.sql # SQL for creating tables and policies
```
