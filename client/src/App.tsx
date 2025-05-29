import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminDashboard} from './components/admin/AdminDashboard';
import Nav from './components/Nav';
import { Home } from './pages/Home';
import Viewer from './pages/3DViewer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <Router>
  <Nav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/3d-viewer" element={<Viewer />} />
          <Route path="/admin/subscribers" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );  
}

export default App;
