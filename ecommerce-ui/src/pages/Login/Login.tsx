import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser }
from "../../api/authApi";

import { useAuth }
from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const data =
        await loginUser({
          email,
          password,
        });

      console.log(data);

      // Save auth globally
     login(
  data.token,
  {
    email: data.user.email,
    role: data.user.role,
  }
);

      console.log(data);

      // Redirect
      navigate("/");

    } catch (error) {

      console.log(error);

      setError("Invalid credentials");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-slate-950
        p-6
      "
    >

      <form

        onSubmit={handleLogin}

        className="
          bg-slate-900
          p-10
          rounded-2xl
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-white
            text-4xl
            font-bold
            mb-8
            text-center
          "
        >
          Login
        </h1>

        {/* Error */}
        {error && (

          <p
            className="
              text-red-500
              mb-6
            "
          >
            {error}
          </p>

        )}

        {/* Email */}
        <input

          type="email"

          placeholder="Enter email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-800
            text-white
            mb-6
            outline-none
          "
        />

        {/* Password */}
        <input

          type="password"

          placeholder="Enter password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-800
            text-white
            mb-6
            outline-none
          "
        />

        {/* Submit */}
        <button

          type="submit"

          disabled={loading}

          className="
            w-full
            bg-violet-600
            hover:bg-violet-700
            transition
            text-white
            py-4
            rounded-xl
            font-bold
          "
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </form>

    </div>

  );
};

export default Login;