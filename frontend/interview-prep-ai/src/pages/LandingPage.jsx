import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HERO_IMG from "../assets/hero-img.jpg";
import { APP_FEATURES } from "../utils/data";
import { LuSparkles } from 'react-icons/lu';

import Modal from "../components/Modal";
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/cards/ProfileInfoCard'; // Ensure this exists

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-full bg-[#FFFCEF]">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"></div>

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">Interview Prep AI</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-start mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts — all in one place.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full min-h-full relative z-10 mb-28">
        <section className="flex items-center justify-center mt-24">
          <img src={HERO_IMG} alt="Hero" className="w-[80vw] rounded-lg" />
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Features That Make You Shine</h2>

          {/* First 3 Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#FFFBEA] border border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-amber-800 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Remaining Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#FFFBEA] border border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-amber-800 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 mb-6">
        Made with <span className="text-red-500">❤</span>... Happy Coding
      </div>

      {/* Modal Auth */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
