
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import AuthForm from "../../components/auth/AuthForm";
import { toast } from "react-toastify";


const Signup = () => {
    const navigate = useNavigate();
  
    const handleSignup = async (email: string, password: string, username: any) => {
      if (!email.includes("@") || password.length < 6) {
        toast.error("Invalid email or password (min 6 characters)");
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: username,
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