import { Route, Routes } from "react-router-dom";
import Admin from "./section/Admin";
import UserRoutes from "./section/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthListener from "./hooks/useAuthListener";
import { AdminRoute } from "./components/auth/AdminRoute";



function App() {
   useAuthListener(); 

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
    
        style={{ zIndex: 9999 }}
      />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/*" element={<UserRoutes />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
