import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import SermonManager from './pages/admin/SermonManager';
import ProtectedRoute from './components/ProtectedRoute';
import Sermons from './pages/Sermons';
import Give from './pages/Give';
import About from './pages/About';
import LiveBanner from './components/LiveBanner';

function App() {
  return (
    <div className="relative">
      <LiveBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/events" element={<div className="p-20 text-center">Events Page (Coming Soon)</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/give" element={<Give />} />

        {/* Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="sermons" element={<SermonManager />} />
                <Route path="*" element={<div className="text-center mt-20">Page Not Found</div>} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
