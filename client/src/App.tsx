import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, Suspense, lazy } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuthStore } from './store/useAuthStore';
import Spinner from './components/ui/Spinner';
import './styles/app.scss'

const Signup = lazy(() => import('./pages/auth/Signup'));
const Signin = lazy(() => import('./pages/auth/Signin'));
const OtherPages = lazy(() => import('./components/OtherPages'));
const ImageUploader = lazy(() => import('./components/imageUpload/ImageUploader'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const Nav = lazy(() => import('./components/Nav'));
const Home = lazy(() => import('./pages/Home'));
const Viewer = lazy(() => import('./pages/3DViewer'));
const CreatePostPage= lazy(()=>import('./pages/CreatePostPage'));

function AppContent() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);


  return (
  <>
  <Nav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-black p-4">
      <ToastContainer position="top-right" />
        <Routes location={location}>
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
          <Route path="/create-post" element={<CreatePostPage />} />

          <Route path="/r2-upload" element={<ImageUploader />} />
        </Routes>
      </div>
    </>

  );  
};


function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <AppContent />
      </Router>
    </Suspense>
  );
}

export default App;