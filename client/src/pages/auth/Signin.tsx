import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import AuthForm from "../../components/auth/AuthForm";
import { useAuthStore } from "../../store/useAuthStore";
import { doc, getDoc } from "firebase/firestore";

const Signin = () => {
  const navigate = useNavigate();
  const { setUser, setRole } = useAuthStore();

  const handleSignin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user in store
      setUser(user);

      // 🔍 Fetch user's role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userRole = userData.role as "admin" | "user";
        setRole(userRole);

        // ✅ Redirect based on role
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // 🚨 No user doc found
        setRole("user"); // default fallback
        navigate("/");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignin}
      title="Sign In"
      buttonText="Login"
      linkText="Don't have an account? Sign Up"
      linkTo="/signup"
      includeUsername={false}
    />
  );
};

export default Signin;
