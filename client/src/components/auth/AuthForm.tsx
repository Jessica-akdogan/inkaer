import React, { useState } from "react";
import { Link } from "react-router-dom";
import './auth.scss'

interface AuthFormProps {
   onSubmit: (email: string, password: string, username?: string) => void | Promise<void>;
  title: string;
  buttonText: string;
  linkText: string;
  linkTo: string;
  includeUsername?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  title,
  buttonText,
  linkText,
  linkTo,
  includeUsername = false,  
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, includeUsername ? username : undefined);
  };

  return (
    <div className="auth-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {includeUsername && (
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{buttonText}</button>
        <p>
          <Link to={linkTo}>{linkText}</Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
