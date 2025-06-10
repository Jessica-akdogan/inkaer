import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, Suspense, lazy } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuthStore } from './store/useAuthStore';
import Spinner from './components/ui/Spinner';


const Signup = lazy(() => import('./pages/auth/Signup'));
const Signin = lazy(() => import('./pages/auth/Signin'));
const OtherPages = lazy(() => import('./components/OtherPages'));
const ImageUploader = lazy(() => import('./components/imageUpload/ImageUploader'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const Nav = lazy(() => import('./components/Nav/Nav'));
const Home = lazy(() => import('./pages/Home'));
const Viewer = lazy(() => import('./pages/3DViewer'));


function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <Suspense fallback={<Spinner/>}>
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
    </Suspense>
  );  
}

export default App;
