import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { useAuthStore } from "../store/useAuthStore";


const useAuthListener = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setLoading, setRole } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const role = userData.role === "admin" ? "admin" : "user";

            setUser(firebaseUser);
            setRole(role);

            // ✅ Optional conditional redirect
            const isOnAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
            if (isOnAuthPage) {
              navigate(role === "admin" ? "/admin" : "/");
            }
          } else {
            console.warn("User document not found. Assigning default role.");
            setUser(firebaseUser);
            setRole("user");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname, setUser, setRole, setLoading]);
};

export default useAuthListener;

