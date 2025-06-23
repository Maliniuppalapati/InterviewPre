import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance"; // your axios setup
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";

const SignUp = ({ goBack }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      // For now, skipping profilePic upload. You can add it later if you want.
      let profileImageUrl;
if(profilePic){
  const imgUploadRes=await uploadImage(profilePic);
  profileImageUrl=imgUploadRes.imageUrl || "";

}
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
const {token}=response.data;
if(token){
  localStorage.setItem("token",token);
  updateUser(response.data);
  navigate("/dashboard");
}
      // On success, go to dashboard
       
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Something went wrong please try again");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden"
      style={{ overscrollBehavior: "none" }}
    >
      <div
        className="relative w-full max-w-md p-5 rounded-lg shadow-lg"
        style={{
          maxHeight: "100vh",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <button
          onClick={goBack}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close sign up form"
        >
          &times;
        </button>

        <h3 className="text-lg font-semibold text-black mb-3">
          Create an Account
        </h3>
        <p className="text-xs text-slate-700 mb-3">
          Join us today by entering your details below.
        </p>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-3"
          style={{ overflow: "hidden" }}
        >
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
            className="text-orange-500"
          />

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

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

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary underline cursor-pointer"
              onClick={goBack}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
