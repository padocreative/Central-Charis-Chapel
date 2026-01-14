import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import SermonManager from './pages/admin/SermonManager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sermons" element={<div className="p-20 text-center">Sermons Page (Coming Soon)</div>} />
      <Route path="/events" element={<div className="p-20 text-center">Events Page (Coming Soon)</div>} />
      <Route path="/about" element={<div className="p-20 text-center">About Page (Coming Soon)</div>} />
      <Route path="/give" element={<div className="p-20 text-center">Give Page (Coming Soon)</div>} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="sermons" element={<SermonManager />} />
            <Route path="*" element={<div className="text-center mt-20">Page Not Found</div>} />
          </Routes>
        </AdminLayout>
      } />
    </Routes>
  );
}

export default App;
