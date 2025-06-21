import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config"; 
import AuthForm from "../../components/auth/AuthForm";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (
    email: string,
    password: string,
    username?: string
  ) => {
      if (!email.includes("@") || password.length < 6 || !username) {
    toast.error("Invalid email, password, or missing username");
    return;
  }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      // ✅ Add user to Firestore with default role
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: username,
        role: "user", // default role
        createdAt: new Date(),
      });

      toast.success("Registration successful!");
        navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignup}
      title="Sign Up"
      buttonText="Register"
      linkText="Already have an account? Sign In"
      linkTo="/signin"
      includeUsername={true}
    />
  );
};

export default Signup;
