
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import AuthForm from "../../components/auth/AuthForm";


const Signin = () => {
  const navigate = useNavigate();

  const handleSignin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };


  return <AuthForm onSubmit={handleSignin}
   title="Sign In"
    buttonText="Login"
     linkText="Don't have an account? Sign Up"
      linkTo="/signup" 
      includeUsername={false}
      />;
};

export default Signin;
