
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="inline-block p-5 rounded-full bg-emerald bg-opacity-10 mb-6">
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-emerald"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-navy mb-4">404</h1>
          <p className="text-xl text-navy text-opacity-80 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)} 
              className="btn-outline mr-4"
            >
              Go Back
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="btn-primary"
            >
              Return Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
