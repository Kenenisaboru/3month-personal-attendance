import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import ActivityLog from './pages/ActivityLog';
import './App.css';

function AppLayout() {
  const { user } = useAuth();
  if (!user) return <Login />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/activity" element={<ActivityLog />} />
        </Routes>
      </main>
    </div>
  );
}


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

function SetupRequired() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
      <div className="card" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '2rem' }}>Wait! Setup Required</h1>
        <p style={{ marginBottom: '1rem', color: '#374151' }}>
          This application needs your Supabase credentials to work.
        </p>
        <div style={{ textAlign: 'left', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Step 1: Get Credentials</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Supabase Dashboard</a></li>
            <li>Select your project</li>
            <li>Go to <strong>Settings &gt; API</strong></li>
            <li>Copy the <strong>Project URL</strong> and <strong>anon public</strong> key</li>
          </ul>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Step 2: Add to .env (frontend)</p>
          <code style={{ display: 'block', backgroundColor: '#1f2937', color: '#e5e7eb', padding: '0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
            VITE_SUPABASE_URL=your_project_url<br />
            VITE_SUPABASE_ANON_KEY=your_anon_key
          </code>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Edit the file located at: <br />
          <code>DevTrack/frontend/.env</code>
        </p>
        <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          I've Updated the File (Reload)
        </button>
      </div>
    </div>
  );
}

function App() {
  if (!supabaseUrl || supabaseUrl.includes('YOUR_SUPABASE')) {
    return <SetupRequired />;
  }

  return (
    <AuthProvider>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<AppLayout />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
