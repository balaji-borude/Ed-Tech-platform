import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar - visible on desktop, hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden transition-opacity ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)} 
      >
        <div
          className="absolute left-0 top-0 h-full w-64 bg-richblack-900 shadow-lg p-4"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
        >
          {/* <button
            className="text-white text-2xl mb-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <HiX />
          </button> */}

          <Sidebar />
        </div>
      </div>

      {/* Main Content --> all  */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto relative ">
        {/* Mobile Toggle Button */}
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden absolute top-4 left-4 text-white text-2xl z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX size={24}/> : <HiOutlineMenuAlt2 />}
        </button>

        <div className="mx-auto w-11/12 max-w-maxContent py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
