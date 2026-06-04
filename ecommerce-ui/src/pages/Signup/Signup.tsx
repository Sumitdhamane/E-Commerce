import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { signup } from "../../api/authApi";

import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const signupMutation = useMutation({
    mutationFn: () =>
      signup({
        name,

        email,

        password,
      }),

    onSuccess: () => {
      navigate("/login");
    },

    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || "Signup failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("");

    if (!name || !email || !password) {
      setErrorMsg("All fields are required");

      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");

      return;
    }

    signupMutation.mutate();
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Create Account</h1>

        <p className="subtitle">Join ShopX today</p>

        {errorMsg && <div className="error-box">{errorMsg}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="login-link">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
