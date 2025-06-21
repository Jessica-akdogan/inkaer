import {  Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {  Suspense, lazy } from 'react';
import Nav from '../components/Nav';
import Spinner from '../components/ui/Spinner';

const Signup = lazy(() => import('../pages/auth/Signup'));
const Signin = lazy(() => import('../pages/auth/Signin'));
const Home = lazy(() => import('../pages/Home'));


function App() {

  return (
  <>    
   <Nav />
      <div className="min-h-screen bg-[#f9f9f9]">
     <Suspense fallback={<Spinner />}>
         <Routes >
          <Route path="/" element={<Home />} />
        
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

        </Routes>
     </Suspense>
    
      </div>
    </>

  );  
};


export default App;