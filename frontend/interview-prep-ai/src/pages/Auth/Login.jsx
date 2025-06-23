import React, { useState, useContext } from "react";
import Input from "../../components/inputs/Input";
import SignUp from "./SignUp";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status) {
        setError(`Error: ${error.response.status} ${error.response.statusText}`);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  if (showSignUp) {
    return <SignUp goBack={() => setShowSignUp(false)} />;
  }

  return (
    <div className="w-full max-w-md p-7 flex flex-col justify-center bg-white rounded-lg shadow-lg">
      <p className="text-xs text-slate-700 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <h3 className="text-lg font-semibold text-black mb-4">Welcome Back</h3>

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <button type="submit" className="btn-primary w-full">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setShowSignUp(true)}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
