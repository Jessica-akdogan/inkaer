import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminDashboard} from './components/admin/AdminDashboard';
import Nav from './components/Nav/Nav';
import { Home } from './pages/Home';
import Viewer from './pages/3DViewer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuthStore } from './store/useAuthStore';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import OtherPages from './components/OtherPages';
import ImageUploader from './components/imageUpload/ImageUploader';

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
  <Router>
  <Nav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signin" replace />}
        /> */}
          <Route path="/3d-viewer" element={<Viewer />} />
          <Route path="/admin/subscribers" element={<AdminDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/others" element={<OtherPages />} />
          <Route path="/r2-upload" element={<ImageUploader />} />
        </Routes>
      </div>
    </Router>
  );  
}

export default App;
