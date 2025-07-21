import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses.jsx";
import Settings from "../src/components/core/Dashboard/Settings/index.jsx";
import Cart from "./components/core/Dashboard/Cart/index.js";

import { ACCOUNT_TYPE } from "../src/utils/constants.js";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact.jsx";
import AddCourse from "./components/core/Dashboard/AddCourse/index.js";
const App = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      
      <Navbar />

      <Routes>
        {/* This is the home page  */}
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        {/* openroute ==> je pn NOn logged in user ahe na te ya path la acces karu shaktat fakt  */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        {/* /contact form page  */}
        <Route path="/contact" element={<Contact />} />

        {/* after login wala route */}

        {/* route madhe Dashboard render krt ahe --> tyat ch NESTED ROUTE render ker ahe  */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* This are the Nested Route  */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {/* if user is student then only you should shown them this route  */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
            {/*jevha account type --> instructor hoil tevhach addCourse hi Route Instructor la dakhav  */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
            </>
          )}
          
        </Route>

        {/* if Page is not found */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
